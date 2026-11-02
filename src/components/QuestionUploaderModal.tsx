"use client";

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import {
  X,
  Upload,
  FileSpreadsheet,
  FileText,
  ClipboardPaste,
  Download,
  Trash2,
  Plus,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export interface ParsedQuestion {
  id: string;
  grade: string;
  subject: string;
  questionEnglish: string;
  questionHindi?: string;
  options: string[];
  correctAnswer: string;
  explanationEnglish?: string;
  visual?: string;
}

interface QuestionUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGrade?: string;
  defaultSubject?: string;
  onQuestionsImported?: (grade: string, subject: string, count: number) => void;
}

export function QuestionUploaderModal({
  isOpen,
  onClose,
  defaultGrade = 'class-3',
  defaultSubject = 'science',
  onQuestionsImported,
}: QuestionUploaderModalProps) {
  const { isHindi, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'excel' | 'pdf' | 'paste'>('excel');
  const [targetGrade, setTargetGrade] = useState<string>(defaultGrade);
  const [targetSubject, setTargetSubject] = useState<string>(defaultSubject);

  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [pasteText, setPasteText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const GRADE_OPTIONS = [
    { id: 'nursery', labelEng: 'Nursery / LKG (3-4 yrs)', labelHin: 'नर्सरी / LKG (३-४ वर्ष)' },
    { id: 'class-1', labelEng: 'UKG / Class 1 (5-6 yrs)', labelHin: 'UKG / कक्षा १ (५-६ वर्ष)' },
    { id: 'class-2', labelEng: 'Class 2 (6-7 yrs)', labelHin: 'कक्षा २ (६-७ वर्ष)' },
    { id: 'class-3', labelEng: 'Class 3 (7-8 yrs)', labelHin: 'कक्षा ३ (७-८ वर्ष)' },
    { id: 'class-4-5', labelEng: 'Class 4 & 5 (9-11+ yrs)', labelHin: 'कक्षा ४ और ५ (९-११+ वर्ष)' },
  ];

  const SUBJECT_OPTIONS = [
    { id: 'science', labelEng: 'Science / EVS 🔬', labelHin: 'विज्ञान / पर्यावरण 🔬' },
    { id: 'gk', labelEng: 'General Knowledge (GK) 🌍', labelHin: 'सामान्य ज्ञान (GK) 🌍' },
    { id: 'maths', labelEng: 'Maths 🔢', labelHin: 'गणित 🔢' },
    { id: 'english', labelEng: 'English 🇬🇧', labelHin: 'अंग्रेजी 🇬🇧' },
    { id: 'hindi', labelEng: 'Hindi 🇮🇳', labelHin: 'हिंदी 🇮🇳' },
  ];

  // 1. Download Sample Excel Template
  const handleDownloadTemplate = () => {
    soundEffects.playPop();

    let sampleRows: any[] = [];
    if (targetSubject === 'science') {
      sampleRows = [
        {
          'Question': 'Which part of a plant grows under the soil and absorbs water?',
          'Option A': 'Roots',
          'Option B': 'Leaves',
          'Option C': 'Flowers',
          'Option D': 'Stem',
          'Correct Answer': 'Roots',
          'Explanation': 'Roots anchor the plant into soil and absorb water and minerals.',
          'Hindi Question': 'पौधे का कौन सा भाग मिट्टी के अंदर रहकर पानी सोखता है?',
        },
        {
          'Question': 'Which gas do green plants release during daytime photosynthesis?',
          'Option A': 'Oxygen',
          'Option B': 'Carbon Dioxide',
          'Option C': 'Nitrogen',
          'Option D': 'Helium',
          'Correct Answer': 'Oxygen',
          'Explanation': 'Plants take in CO2 and release life-giving Oxygen.',
          'Hindi Question': 'दिन में प्रकाश संश्लेषण के दौरान पौधे कौन सी गैस छोड़ते हैं?',
        },
        {
          'Question': 'How many bones are there in an adult human body?',
          'Option A': '206',
          'Option B': '150',
          'Option C': '300',
          'Option D': '250',
          'Correct Answer': '206',
          'Explanation': 'An adult human body has 206 bones in total.',
          'Hindi Question': 'वयस्क मानव शरीर में कुल कितनी हड्डियां होती हैं?',
        },
      ];
    } else if (targetSubject === 'gk') {
      sampleRows = [
        {
          'Question': 'What is the national animal of India?',
          'Option A': 'Bengal Tiger',
          'Option B': 'Lion',
          'Option C': 'Elephant',
          'Option D': 'Leopard',
          'Correct Answer': 'Bengal Tiger',
          'Explanation': 'The royal Bengal Tiger is the national animal of India.',
          'Hindi Question': 'भारत का राष्ट्रीय पशु कौन सा है?',
        },
        {
          'Question': 'Which is the largest ocean on Earth?',
          'Option A': 'Pacific Ocean',
          'Option B': 'Atlantic Ocean',
          'Option C': 'Indian Ocean',
          'Option D': 'Arctic Ocean',
          'Correct Answer': 'Pacific Ocean',
          'Explanation': 'The Pacific Ocean covers more than 30% of the Earth surface.',
          'Hindi Question': 'पृथ्वी पर सबसे बड़ा महासागर कौन सा है?',
        },
        {
          'Question': 'Which Indian mission successfully landed on the South Pole of the Moon?',
          'Option A': 'Chandrayaan-3',
          'Option B': 'Mangalyaan',
          'Option C': 'Aditya-L1',
          'Option D': 'Gaganyaan',
          'Correct Answer': 'Chandrayaan-3',
          'Explanation': 'Chandrayaan-3 landed on August 23, celebrated as National Space Day.',
          'Hindi Question': 'चंद्रमा के दक्षिणी ध्रुव पर किस भारतीय मिशन ने सफल लैंडिंग की?',
        },
      ];
    } else {
      sampleRows = [
        {
          'Question': 'What is 25 + 15?',
          'Option A': '40',
          'Option B': '35',
          'Option C': '50',
          'Option D': '45',
          'Correct Answer': '40',
          'Explanation': '25 + 15 = 40',
          'Hindi Question': '२५ + १५ कितना होता है?',
        },
      ];
    }

    const ws = XLSX.utils.json_to_sheet(sampleRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questions');

    XLSX.writeFile(wb, `Class_${targetGrade}_${targetSubject}_Questions_Template.xlsx`);
    setStatusMessage({
      type: 'info',
      text: t('Downloaded sample template! Fill your questions and upload it here.', 'सैंपल एक्सेल टेम्पलेट डाउनलोड हो गया! अपने प्रश्न भरकर यहाँ अपलोड करें।'),
    });
  };

  // 2. Parse Excel File
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonRows: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonRows || jsonRows.length === 0) {
          setStatusMessage({ type: 'error', text: t('Uploaded file is empty.', 'अपलोड की गई फ़ाइल खाली है।') });
          setIsProcessing(false);
          return;
        }

        const newParsed: ParsedQuestion[] = [];

        jsonRows.forEach((row, idx) => {
          // Flexible key lookup
          const prompt = row['Question'] || row['question'] || row['QuestionEnglish'] || row['प्रश्न'] || row['Prompt'];
          const optA = row['Option A'] || row['A'] || row['OptionA'] || row['विकल्प A'] || row['Option 1'];
          const optB = row['Option B'] || row['B'] || row['OptionB'] || row['विकल्प B'] || row['Option 2'];
          const optC = row['Option C'] || row['C'] || row['OptionC'] || row['विकल्प C'] || row['Option 3'];
          const optD = row['Option D'] || row['D'] || row['OptionD'] || row['विकल्प D'] || row['Option 4'];
          const rawAns = row['Correct Answer'] || row['Answer'] || row['Ans'] || row['उत्तर'] || row['Correct'];
          const explanation = row['Explanation'] || row['explanation'] || row['स्पष्टीकरण'] || '';
          const hinPrompt = row['Hindi Question'] || row['प्रश्न (हिंदी)'] || '';
          const iconVisual = row['Icon'] || row['Visual'] || row['Emoji'] || row['icon'] || row['visual'] || row['emoji'] || row['चित्र'] || '';

          if (prompt && optA && optB) {
            const options = [String(optA).trim(), String(optB).trim()];
            if (optC) options.push(String(optC).trim());
            if (optD) options.push(String(optD).trim());

            let finalAns = String(rawAns || optA).trim();
            const upper = finalAns.toUpperCase();
            if (upper === 'A' || upper === '1') finalAns = options[0];
            else if (upper === 'B' || upper === '2') finalAns = options[1];
            else if (upper === 'C' || upper === '3') finalAns = options[2] || options[0];
            else if (upper === 'D' || upper === '4') finalAns = options[3] || options[0];

            newParsed.push({
              id: `excel-q-${Date.now()}-${idx}`,
              grade: targetGrade,
              subject: targetSubject,
              questionEnglish: String(prompt).trim(),
              questionHindi: hinPrompt ? String(hinPrompt).trim() : undefined,
              options,
              correctAnswer: finalAns,
              explanationEnglish: explanation ? String(explanation).trim() : undefined,
              visual: iconVisual ? String(iconVisual).trim() : undefined,
            });
          }
        });

        if (newParsed.length === 0) {
          setStatusMessage({
            type: 'error',
            text: t('Could not find question columns. Use standard columns: Question, Option A, Option B, Option C, Option D, Correct Answer.', 'प्रश्न कॉलम नहीं मिले। कृपया मानक कॉलम का उपयोग करें: Question, Option A, Option B, Option C, Option D, Correct Answer.'),
          });
        } else {
          setParsedQuestions((prev) => [...prev, ...newParsed]);
          soundEffects.playCelebration();
          setStatusMessage({
            type: 'success',
            text: t(`Loaded ${newParsed.length} questions from Excel! Review and click Save.`, `एक्सेल से ${newParsed.length} प्रश्न लोड हो गए! समीक्षा करें और सहेजें पर क्लिक करें।`),
          });
        }
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: err?.message || 'Failed to read Excel file.' });
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 3. Parse PDF File via API
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('grade', targetGrade);
    formData.append('subject', targetSubject);

    try {
      const res = await fetch('/api/questions/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to parse PDF.');
      }

      if (data.questions && data.questions.length > 0) {
        setParsedQuestions((prev) => [...prev, ...data.questions]);
        soundEffects.playCelebration();
        setStatusMessage({
          type: 'success',
          text: t(`Extracted ${data.questions.length} questions from PDF! You can edit them below.`, `पीडीएफ से ${data.questions.length} प्रश्न निकाले गए! आप नीचे संपादित कर सकते हैं।`),
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: t('No multiple-choice questions detected in PDF. Try Quick Paste mode.', 'पीडीएफ में कोई बहुविकल्पीय प्रश्न नहीं मिले। त्वरित पेस्ट मोड का प्रयास करें।'),
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Error processing PDF file.' });
    } finally {
      setIsProcessing(false);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  };

  // 4. Quick Text Paste Parser
  const handleParsePasteText = () => {
    if (!pasteText.trim()) return;

    // Use lines parsing
    const lines = pasteText.split('\n').map((l) => l.trim()).filter(Boolean);
    const generated: ParsedQuestion[] = [];
    let currentQ: Partial<ParsedQuestion> | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for Question start: "1. ", "Q1:", "१. "
      const isQStart = /^(?:Q(?:uestion)?\.?\s*\d+|\d+[\.\)]|[१२३४५६७८९०]+[\.\)])\s*/i.test(line);

      // Check for Option: "A) ", "(B) ", "a. "
      const optMatch = line.match(/^(?:\(?([A-Da-d1-4कखगघ])[\)\.\-]\s*)(.+)/);

      // Check for Answer: "Ans: A" or "उत्तर: ..."
      const ansMatch = line.match(/^(?:Ans(?:wer)?|उत्तर|Correct)\s*[:\-]?\s*(.+)/i);

      if (isQStart || (!currentQ && !optMatch && !ansMatch)) {
        if (currentQ && currentQ.questionEnglish && currentQ.options && currentQ.options.length >= 2) {
          generated.push({
            id: `paste-q-${Date.now()}-${generated.length}`,
            grade: targetGrade,
            subject: targetSubject,
            questionEnglish: currentQ.questionEnglish,
            options: currentQ.options,
            correctAnswer: currentQ.correctAnswer || currentQ.options[0],
            explanationEnglish: currentQ.explanationEnglish,
          });
        }
        currentQ = {
          questionEnglish: line.replace(/^(?:Q(?:uestion)?\.?\s*\d+|\d+[\.\)]|[१२३४५६७८९०]+[\.\)])\s*/i, '').trim(),
          options: [],
        };
      } else if (optMatch && currentQ) {
        currentQ.options = currentQ.options || [];
        currentQ.options.push(optMatch[2].trim());
      } else if (ansMatch && currentQ) {
        const val = ansMatch[1].trim();
        const cleanLetter = val.replace(/[\(\)\.\:\s]/g, '').toUpperCase();
        if (cleanLetter === 'A' && currentQ.options?.[0]) currentQ.correctAnswer = currentQ.options[0];
        else if (cleanLetter === 'B' && currentQ.options?.[1]) currentQ.correctAnswer = currentQ.options[1];
        else if (cleanLetter === 'C' && currentQ.options?.[2]) currentQ.correctAnswer = currentQ.options[2];
        else if (cleanLetter === 'D' && currentQ.options?.[3]) currentQ.correctAnswer = currentQ.options[3];
        else currentQ.correctAnswer = val;
      }
    }

    if (currentQ && currentQ.questionEnglish && currentQ.options && currentQ.options.length >= 2) {
      generated.push({
        id: `paste-q-${Date.now()}-${generated.length}`,
        grade: targetGrade,
        subject: targetSubject,
        questionEnglish: currentQ.questionEnglish,
        options: currentQ.options,
        correctAnswer: currentQ.correctAnswer || currentQ.options[0],
        explanationEnglish: currentQ.explanationEnglish,
      });
    }

    if (generated.length > 0) {
      setParsedQuestions((prev) => [...prev, ...generated]);
      setPasteText('');
      soundEffects.playCelebration();
      setStatusMessage({
        type: 'success',
        text: t(`Parsed ${generated.length} questions from text! Review below.`, `टेक्स्ट से ${generated.length} प्रश्न तैयार हुए! नीचे समीक्षा करें।`),
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: t('Could not parse questions. Make sure format has 1. Question followed by A) B) C) D) options.', 'प्रश्न नहीं बन सके। सुनिश्चित करें कि 1. प्रश्न के बाद A) B) C) D) विकल्प दिए गए हैं।'),
      });
    }
  };

  // 5. Add Manual Blank Question
  const handleAddBlankQuestion = () => {
    soundEffects.playPop();
    const blank: ParsedQuestion = {
      id: `manual-q-${Date.now()}`,
      grade: targetGrade,
      subject: targetSubject,
      questionEnglish: '',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
    };
    setParsedQuestions((prev) => [blank, ...prev]);
  };

  // 6. Delete a question row
  const handleDeleteRow = (id: string) => {
    soundEffects.playPop();
    setParsedQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // 7. Update an individual question field
  const handleUpdateQuestion = (id: string, updates: Partial<ParsedQuestion>) => {
    setParsedQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  // 8. Final Save to API and LocalStorage
  const handleSaveToClass = async () => {
    if (parsedQuestions.length === 0) return;

    // Validate that questions have prompts
    const validOnes = parsedQuestions.filter((q) => q.questionEnglish.trim().length > 0);
    if (validOnes.length === 0) {
      setStatusMessage({ type: 'error', text: t('Please write at least one valid question.', 'कृपया कम से कम एक वैध प्रश्न लिखें।') });
      return;
    }

    setIsProcessing(true);
    try {
      // Save to server database
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: validOnes.map((q) => ({
            ...q,
            grade: targetGrade,
            subject: targetSubject,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save questions to database.');
      }

      // Also cache in localStorage for instant access
      try {
        const localKey = `custom_questions_${targetGrade}_${targetSubject}`;
        const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
        localStorage.setItem(localKey, JSON.stringify([...existing, ...validOnes]));
      } catch (e) {}

      soundEffects.playCelebration();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });

      if (onQuestionsImported) {
        onQuestionsImported(targetGrade, targetSubject, validOnes.length);
      }

      setStatusMessage({
        type: 'success',
        text: t(
          `🎉 Successfully saved ${validOnes.length} questions to ${targetGrade.toUpperCase()} ${targetSubject.toUpperCase()}!`,
          `🎉 सफलतापूर्वक ${validOnes.length} प्रश्न ${targetGrade.toUpperCase()} ${targetSubject.toUpperCase()} में जुड़ गए!`
        ),
      });

      setTimeout(() => {
        onClose();
        setParsedQuestions([]);
      }, 1500);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Error saving questions.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-2xl backdrop-blur">
              <Upload className="w-5 h-5 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                {t('Upload Questions Class-Wise 📄', 'कक्षा अनुसार प्रश्न अपलोड करें 📄')}
              </h2>
              <p className="text-xs text-amber-100 font-bold">
                {t('Add questions from Excel (.xlsx), PDF or Text Paste for any class & subject', 'किसी भी कक्षा और विषय के लिए एक्सेल, पीडीएफ या टेक्स्ट से प्रश्न जोड़ें')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Target Class and Subject Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
            <div>
              <label className="block text-xs font-black text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>{t('1. Select Target Class:', '१. कक्षा चुनें:')}</span>
              </label>
              <select
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border-2 border-amber-300 font-black text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {isHindi ? g.labelHin : g.labelEng}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>{t('2. Select Subject:', '२. विषय चुनें:')}</span>
              </label>
              <select
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border-2 border-amber-300 font-black text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isHindi ? s.labelHin : s.labelEng}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload Method Tabs */}
          <div className="flex border-b border-stone-200 gap-2">
            <button
              onClick={() => setActiveTab('excel')}
              className={`flex items-center gap-2 px-4 py-2.5 font-black text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'excel'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>{t('Excel / CSV (.xlsx)', 'एक्सेल / CSV (.xlsx)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf')}
              className={`flex items-center gap-2 px-4 py-2.5 font-black text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'pdf'
                  ? 'border-rose-600 text-rose-700 bg-rose-50/50 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <span>{t('PDF Document (.pdf)', 'पीडीएफ फाइल (.pdf)')}</span>
            </button>

            <button
              onClick={() => setActiveTab('paste')}
              className={`flex items-center gap-2 px-4 py-2.5 font-black text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'paste'
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-xl'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <ClipboardPaste className="w-4 h-4 text-blue-600" />
              <span>{t('Quick Paste Text', 'त्वरित टेक्स्ट पेस्ट')}</span>
            </button>
          </div>

          {/* Status Message Notification */}
          {statusMessage && (
            <div
              className={`p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-100 border border-rose-300 text-rose-900'
                  : 'bg-blue-100 border border-blue-300 text-blue-900'
              }`}
            >
              {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              {statusMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* TAB 1: EXCEL */}
          {activeTab === 'excel' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-6 text-center space-y-3">
                <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="font-black text-stone-900 text-sm sm:text-base">
                    {t('Select or Drop Excel / CSV Spreadsheet', 'एक्सेल या सीएसवी फाइल चुनें')}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    {t('Supports .xlsx, .xls, .csv with columns: Question, Option A, Option B, Option C, Option D, Correct Answer', 'कॉलम: Question, Option A, Option B, Option C, Option D, Correct Answer')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={handleExcelUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {isProcessing ? t('Processing...', 'प्रोसेसिंग...') : t('Choose Excel File 📁', 'एक्सेल फाइल चुनें 📁')}
                  </button>

                  <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>{t('Generate Template', 'टेम्पलेट बनाएं')}</span>
                  </button>

                  <a
                    href="/downloads/Sample_Questions_Template.xlsx"
                    download="Sample_Questions_Template.xlsx"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-black text-xs sm:text-sm rounded-xl border border-emerald-400 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>{t('Download Sample Excel (.xlsx)', 'सैंपल एक्सेल डाउनलोड')}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PDF */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-rose-300 bg-rose-50/40 rounded-2xl p-6 text-center space-y-3">
                <FileText className="w-10 h-10 text-rose-600 mx-auto" />
                <div>
                  <h4 className="font-black text-stone-900 text-sm sm:text-base">
                    {t('Select or Drop PDF Question Paper', 'पीडीएफ प्रश्न पत्र चुनें')}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    {t('Smart extractor detects question numbers (1, Q1), options (A, B, C, D), and answers automatically!', 'स्मार्ट सिस्टम प्रश्न संख्या (1., Q1), विकल्प (A, B, C, D) और उत्तर को पहचानता है!')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handlePdfUpload}
                  />
                  <button
                    onClick={() => pdfInputRef.current?.click()}
                    disabled={isProcessing}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {isProcessing ? t('Extracting from PDF...', 'पीडीएफ से निकाल रहे हैं...') : t('Choose PDF File 📄', 'पीडीएफ फाइल चुनें 📄')}
                  </button>

                  <a
                    href="/downloads/Sample_Questions_Guide.pdf"
                    download="Sample_Questions_Guide.pdf"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-rose-50 text-rose-800 border-2 border-rose-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-rose-600" />
                    <span>{t('Download Sample PDF (.pdf)', 'सैंपल पीडीएफ गाइड डाउनलोड')}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEXT PASTE */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-stone-700 uppercase">
                  {t('Paste Questions (WhatsApp / Document Text):', 'प्रश्न यहाँ पेस्ट करें (व्हाट्सएप / डॉक्यूमेंट टेक्स्ट):')}
                </label>
                <span className="text-[11px] text-stone-500">
                  {t('Example: 1. Question? A) Opt 1 B) Opt 2 Ans: A', 'उदाहरण: 1. प्रश्न? A) विक 1 B) विक 2 Ans: A')}
                </span>
              </div>
              <textarea
                rows={6}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={`1. What is the powerhouse of a cell?
A) Nucleus
B) Mitochondria
C) Ribosome
D) Vacuole
Answer: B

2. Which Indian state has the longest coastline?
A) Maharashtra
B) Kerala
C) Gujarat
D) Tamil Nadu
Answer: C`}
                className="w-full p-3 font-mono text-xs sm:text-sm bg-stone-50 border-2 border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleParsePasteText}
                  disabled={!pasteText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {t('Parse Text to Questions ➔', 'टेक्स्ट से प्रश्न बनाएं ➔')}
                </button>
              </div>
            </div>
          )}

          {/* PARSED QUESTIONS PREVIEW TABLE */}
          {parsedQuestions.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base text-stone-900">
                    {t('Review & Edit Questions', 'प्रश्नों की समीक्षा व संपादन')}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                    {parsedQuestions.length} {t('Ready', 'तैयार')}
                  </span>
                </div>
                <button
                  onClick={handleAddBlankQuestion}
                  className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('Add Question', 'प्रश्न जोड़ें')}</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {parsedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3.5 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-2.5 hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="font-black text-xs px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={q.questionEnglish}
                          onChange={(e) => handleUpdateQuestion(q.id, { questionEnglish: e.target.value })}
                          placeholder={t('Enter question...', 'प्रश्न लिखें...')}
                          className="flex-1 font-bold text-xs sm:text-sm bg-white px-3 py-1.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteRow(q.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title={t('Delete', 'हटाएं')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Options list with correct answer indicator */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctAnswer === opt;
                        const letters = ['A', 'B', 'C', 'D'];
                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400'
                                : 'bg-white border-stone-200'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleUpdateQuestion(q.id, { correctAnswer: opt })}
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 cursor-pointer ${
                                isCorrect ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                              title={t('Click to set as correct answer', 'सही उत्तर के रूप में चुनें')}
                            >
                              {letters[optIdx] || optIdx + 1}
                            </button>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...q.options];
                                newOpts[optIdx] = e.target.value;
                                const updates: Partial<ParsedQuestion> = { options: newOpts };
                                if (isCorrect) updates.correctAnswer = e.target.value;
                                handleUpdateQuestion(q.id, updates);
                              }}
                              className="flex-1 text-xs font-semibold bg-transparent focus:outline-none"
                            />
                            {isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Optional Explanation */}
                    <div className="pt-1">
                      <input
                        type="text"
                        value={q.explanationEnglish || ''}
                        onChange={(e) => handleUpdateQuestion(q.id, { explanationEnglish: e.target.value })}
                        placeholder={t('Optional explanation or reason...', 'वैकल्पिक स्पष्टीकरण या कारण...')}
                        className="w-full text-[11px] bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-stone-600 italic focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-bold text-stone-500">
            {parsedQuestions.length > 0 ? (
              <span>
                {parsedQuestions.length} {t('questions will be saved to', 'प्रश्न जुड़ेंगे:')}{' '}
                <strong className="text-stone-900 uppercase">
                  {targetGrade} • {targetSubject}
                </strong>
              </span>
            ) : (
              <span>{t('Upload an Excel or PDF file above', 'ऊपर एक्सेल या पीडीएफ फाइल अपलोड करें')}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
            >
              {t('Cancel', 'रद्द करें')}
            </button>

            <button
              onClick={handleSaveToClass}
              disabled={isProcessing || parsedQuestions.length === 0}
              className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? t('Saving...', 'सहेज रहे हैं...') : t('Save to Class Questions 💾', 'कक्षा के प्रश्नों में सहेजें 💾')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
