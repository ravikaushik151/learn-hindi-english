import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface CustomQuestionItem {
  id: string;
  grade: string;
  subject: string;
  questionEnglish: string;
  questionHindi?: string;
  options: string[];
  correctAnswer: string;
  explanationEnglish?: string;
  explanationHindi?: string;
  visual?: string;
  source?: string;
  createdAt: number;
}

interface CustomQuestionsDb {
  questions: CustomQuestionItem[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'customQuestionsDb.json');

function readDb(): CustomQuestionsDb {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { questions: [] };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading customQuestionsDb:', err);
    return { questions: [] };
  }
}

function writeDb(data: CustomQuestionsDb): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing customQuestionsDb:', err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get('grade');
  const subject = searchParams.get('subject');

  const db = readDb();
  let filtered = db.questions;

  if (grade) {
    filtered = filtered.filter((q) => q.grade.toLowerCase() === grade.toLowerCase());
  }
  if (subject) {
    filtered = filtered.filter((q) => q.subject.toLowerCase() === subject.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    questions: filtered,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = readDb();

    // Body can be a single question or an array of questions: { questions: [...] }
    const itemsToAdd: any[] = Array.isArray(body.questions)
      ? body.questions
      : Array.isArray(body)
      ? body
      : [body];

    const validNewItems: CustomQuestionItem[] = [];

    for (const item of itemsToAdd) {
      if (!item || !item.questionEnglish || !Array.isArray(item.options) || item.options.length < 2) {
        continue;
      }

      const qItem: CustomQuestionItem = {
        id: item.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        grade: (item.grade || 'class-3').toLowerCase(),
        subject: (item.subject || 'science').toLowerCase(),
        questionEnglish: String(item.questionEnglish).trim(),
        questionHindi: item.questionHindi ? String(item.questionHindi).trim() : undefined,
        options: item.options.map((o: any) => String(o).trim()).filter(Boolean),
        correctAnswer: String(item.correctAnswer || item.options[0]).trim(),
        explanationEnglish: item.explanationEnglish ? String(item.explanationEnglish).trim() : undefined,
        explanationHindi: item.explanationHindi ? String(item.explanationHindi).trim() : undefined,
        visual: item.visual || '📝',
        source: item.source || 'Excel/PDF Upload',
        createdAt: item.createdAt || Date.now(),
      };

      // Guarantee that correctAnswer is one of the options
      if (!qItem.options.includes(qItem.correctAnswer) && qItem.options.length > 0) {
        qItem.options.push(qItem.correctAnswer);
      }

      validNewItems.push(qItem);
    }

    if (validNewItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid questions found to import.' },
        { status: 400 }
      );
    }

    db.questions = [...db.questions, ...validNewItems];
    writeDb(db);

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${validNewItems.length} questions!`,
      addedCount: validNewItems.length,
      questions: validNewItems,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to save questions.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Question ID is required.' }, { status: 400 });
    }

    const db = readDb();
    const index = db.questions.findIndex((q) => q.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Question not found.' }, { status: 404 });
    }

    db.questions[index] = {
      ...db.questions[index],
      ...updates,
      id: db.questions[index].id, // Maintain ID
    };

    writeDb(db);
    return NextResponse.json({
      success: true,
      message: 'Question updated successfully!',
      question: db.questions[index],
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Question ID is required.' },
      { status: 400 }
    );
  }

  const db = readDb();
  const initialLength = db.questions.length;
  db.questions = db.questions.filter((q) => q.id !== id);

  if (db.questions.length === initialLength) {
    return NextResponse.json(
      { success: false, message: 'Question not found.' },
      { status: 404 }
    );
  }

  writeDb(db);
  return NextResponse.json({
    success: true,
    message: 'Question deleted successfully.',
  });
}

