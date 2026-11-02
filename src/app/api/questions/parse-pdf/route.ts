import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const grade = (formData.get('grade') as string) || 'class-3';
    const subject = (formData.get('subject') as string) || 'science';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No PDF file uploaded.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let fullText = '';
    const os = require('os');
    const path = require('path');
    const fs = require('fs');
    const { execFileSync } = require('child_process');

    const tempPdfPath = path.join(os.tmpdir(), `upload-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.pdf`);
    const workerScript = path.join(process.cwd(), 'scripts', 'parse_pdf_worker.js');

    try {
      fs.writeFileSync(tempPdfPath, buffer);
      const output = execFileSync(process.execPath, [workerScript, tempPdfPath], {
        encoding: 'utf-8',
        timeout: 15000,
      });

      const parsedJson = JSON.parse(output);
      if (parsedJson && parsedJson.success && parsedJson.text) {
        fullText = parsedJson.text;
      } else {
        console.warn('Worker error parsing PDF:', parsedJson?.error);
      }
    } catch (procErr: any) {
      console.warn('Subprocess PDF parser notice:', procErr?.message);
    } finally {
      try {
        if (fs.existsSync(tempPdfPath)) {
          fs.unlinkSync(tempPdfPath);
        }
      } catch (e) {}
    }

    if (!fullText || fullText.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Could not extract text from this PDF. Please check if it contains readable text.' },
        { status: 400 }
      );
    }

    // Parse extracted text into questions
    const parsedQuestions = parseQuestionsFromText(fullText, grade, subject);

    return NextResponse.json({
      success: true,
      message: `Extracted ${parsedQuestions.length} questions from PDF.`,
      count: parsedQuestions.length,
      questions: parsedQuestions,
      rawPreview: fullText.slice(0, 500),
    });
  } catch (err: any) {
    console.error('PDF Parse API error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to parse PDF.' },
      { status: 500 }
    );
  }
}

function parseQuestionsFromText(rawText: string, grade: string, subject: string) {
  const clean = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Regex to split on question boundaries like "1. ", "Q1.", "Question 1:", "१. "
  const questionSplitter = /(?:\n|^)\s*(?:(?:Q(?:uestion)?\.?\s*\d+)|(?:\d+[\.\)])|(?:[१२३४५६७८९०]+[\.\)]))\s*[:\.]?\s*/i;
  const blocks = clean.split(questionSplitter).map((b) => b.trim()).filter((b) => b.length > 5);

  const questions: any[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Find Answer line if present: e.g. "Answer: B" or "Ans: (C)" or "Correct Answer: A" or "उत्तर: A"
    const ansMatch = block.match(/(?:\n|^)\s*(?:Ans(?:wer)?|उत्तर|Correct\s*(?:Answer|Option)?|सही उत्तर)\s*[:\-]\s*(\([A-D]\)|[A-D]|[1-4]|\([1-4]\)|[^\n]+)/i);
    let explicitAns = ansMatch ? ansMatch[1].trim() : '';

    // Find Explanation if present: e.g. "Explanation: ..." or "स्पष्टीकरण: ..."
    const expMatch = block.match(/(?:\n|^)\s*(?:Explanation|स्पष्टीकरण|Reason|हल)\s*[:\-]\s*([^\n]+(?:\n[^\n]+)*)/i);
    const explanation = expMatch ? expMatch[1].trim() : '';

    // Strip out answer and explanation from block before option parsing
    let contentWithoutAns = block;
    if (ansMatch) {
      contentWithoutAns = contentWithoutAns.slice(0, ansMatch.index);
    }

    // Look for options A, B, C, D (or a, b, c, d or 1, 2, 3, 4 or क, ख, ग, घ)
    // Common pattern: A) text B) text C) text D) text
    const optRegex = /(?:(?:\n|^)\s*(?:\(?([A-Da-d1-4कखगघ])[\)\.\-]\s*))([^\n]+)/g;
    const optionMatches: { tag: string; text: string }[] = [];
    let match;

    while ((match = optRegex.exec(contentWithoutAns)) !== null) {
      optionMatches.push({ tag: match[1].toUpperCase(), text: match[2].trim() });
    }

    let questionPrompt = '';
    let options: string[] = [];
    let correctAnswer = '';

    if (optionMatches.length >= 2) {
      // Prompt is everything before the first option match
      const firstOptIdx = contentWithoutAns.search(/(?:(?:\n|^)\s*(?:\(?([A-Da-d1-4कखगघ])[\)\.\-]\s*))/);
      questionPrompt = firstOptIdx > 0 ? contentWithoutAns.slice(0, firstOptIdx).trim() : contentWithoutAns.split('\n')[0].trim();
      options = optionMatches.map((o) => o.text);

      // Determine correct answer
      if (explicitAns) {
        // Clean explicitAns (e.g. "(B)" -> "B")
        const cleanLetter = explicitAns.replace(/[\(\)\.\:\s]/g, '').toUpperCase();
        if (cleanLetter === 'A' || cleanLetter === '1' || cleanLetter === 'क') {
          correctAnswer = options[0] || '';
        } else if (cleanLetter === 'B' || cleanLetter === '2' || cleanLetter === 'ख') {
          correctAnswer = options[1] || '';
        } else if (cleanLetter === 'C' || cleanLetter === '3' || cleanLetter === 'ग') {
          correctAnswer = options[2] || '';
        } else if (cleanLetter === 'D' || cleanLetter === '4' || cleanLetter === 'घ') {
          correctAnswer = options[3] || '';
        } else {
          // If explicitAns is the full text of an option
          const found = options.find((o) => o.toLowerCase().includes(explicitAns.toLowerCase()));
          correctAnswer = found || options[0];
        }
      } else {
        correctAnswer = options[0]; // Default to first option
      }
    } else {
      // If block does not have at least 2 structured options (e.g. A, B, C, D), skip introductory instructions
      continue;
    }

    // Clean up prompt
    questionPrompt = questionPrompt.replace(/^\d+[\.\:\)]\s*/, '').trim();
    if (!questionPrompt || options.length < 2) continue;

    questions.push({
      id: `pdf-q-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      grade,
      subject,
      questionEnglish: questionPrompt,
      options,
      correctAnswer: correctAnswer || options[0],
      explanationEnglish: explanation || undefined,
      visual: getSubjectEmoji(subject),
      source: 'PDF Upload',
    });
  }

  return questions;
}

function getSubjectEmoji(subject: string): string {
  const s = (subject || '').toLowerCase();
  if (s.includes('sci')) return '🔬';
  if (s.includes('gk')) return '🌍';
  if (s.includes('math')) return '🔢';
  if (s.includes('hin')) return '🇮🇳';
  return '🇬🇧';
}
