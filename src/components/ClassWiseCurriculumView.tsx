"use client";

import React, { useState, useEffect } from 'react';
import {
  CLASS_WISE_CURRICULUM,
  GradeLevel,
  CurriculumTopic,
  mapGradeStringToLevel,
  getTotalCurriculumQuestionsCount,
} from '@/data/classWiseCurriculumData';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSpeech } from '@/hooks/useSpeech';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Calculator,
  Languages,
  X,
  Volume2,
  Star,
  Upload,
  FlaskConical,
  Globe2,
  FileSpreadsheet,
  ChevronDown,
} from 'lucide-react';

interface ClassWiseCurriculumViewProps {
  onSelectMaths?: () => void;
  onSelectTopic?: (topic: CurriculumTopic, subject: 'english' | 'hindi' | 'maths' | 'science' | 'gk') => void;
  selectedSubject?: 'all' | 'english' | 'hindi' | 'maths' | 'science' | 'gk';
  onSubjectChange?: (subject: 'all' | 'english' | 'hindi' | 'maths' | 'science' | 'gk') => void;
}

export function ClassWiseCurriculumView({
  onSelectMaths,
  onSelectTopic,
  selectedSubject = 'all',
  onSubjectChange,
}: ClassWiseCurriculumViewProps) {
  const { activeProfile, isLoggedIn, addStars, getSubjectStars, totalStars } = useChildProfile();
  const { isHindi, t } = useLanguage();
  const { speakEnglish, speakHindi } = useSpeech();

  // Child's designated grade
  const childGrade = mapGradeStringToLevel(activeProfile?.grade, activeProfile?.age);
  const [activeGrade, setActiveGrade] = useState<GradeLevel>(childGrade);
  const [activeSubject, setActiveSubject] = useState<'all' | 'english' | 'hindi' | 'maths' | 'science' | 'gk'>(
    selectedSubject || 'all'
  );

  const [customQuestions, setCustomQuestions] = useState<any[]>([]);

  // Synchronize with external selectedSubject (e.g. from Navbar dropdown)
  useEffect(() => {
    if (selectedSubject) {
      setActiveSubject(selectedSubject);
    }
  }, [selectedSubject]);

  // Synchronize grade when child profile logs in or changes
  useEffect(() => {
    const grade = mapGradeStringToLevel(activeProfile?.grade, activeProfile?.age);
    setActiveGrade(grade);
  }, [activeProfile?.grade, activeProfile?.age, activeProfile?.id]);

  // Load custom questions for current grade
  const loadCustomQuestions = () => {
    fetch(`/api/questions?grade=${activeGrade}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.questions)) {
          setCustomQuestions(data.questions);
        }
      })
      .catch(() => {
        // Fallback to localStorage
        try {
          const keys = ['science', 'gk', 'maths', 'english', 'hindi'];
          let allLocal: any[] = [];
          for (const k of keys) {
            const raw = localStorage.getItem(`custom_questions_${activeGrade}_${k}`);
            if (raw) allLocal = [...allLocal, ...JSON.parse(raw)];
          }
          setCustomQuestions(allLocal);
        } catch (e) {}
      });
  };

  useEffect(() => {
    loadCustomQuestions();
  }, [activeGrade]);

  // Topic Quiz Modal State (For playing questions for any topic)
  const [activeQuizTopic, setActiveQuizTopic] = useState<{
    topic: CurriculumTopic;
    subject: 'maths' | 'english' | 'hindi' | 'science' | 'gk';
  } | null>(null);
  const [quizQIndex, setQuizQIndex] = useState<number>(0);
  const [quizSelectedOpt, setQuizSelectedOpt] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const gradeInfo = CLASS_WISE_CURRICULUM[activeGrade];
  const totalQuestionsAll = getTotalCurriculumQuestionsCount() + customQuestions.length;

  const gradePills: { id: GradeLevel; labelEng: string; labelHin: string; age: string }[] = [
    { id: 'nursery', labelEng: 'Nursery / LKG', labelHin: 'नर्सरी / LKG', age: '3-4 yrs' },
    { id: 'class-1', labelEng: 'UKG / Class 1', labelHin: 'UKG / कक्षा १', age: '5-6 yrs' },
    { id: 'class-2', labelEng: 'Class 2', labelHin: 'कक्षा २', age: '6-7 yrs' },
    { id: 'class-3', labelEng: 'Class 3', labelHin: 'कक्षा ३', age: '7-8 yrs' },
    { id: 'class-4-5', labelEng: 'Class 4 & 5', labelHin: 'कक्षा ४ और ५', age: '9-11+ yrs' },
  ];

  const studentDisplayName = isLoggedIn
    ? activeProfile.name
    : isHindi
    ? 'नन्हा छात्र'
    : 'Young Explorer';

  const handleOpenTopicQuiz = (topic: CurriculumTopic, subject: 'maths' | 'english' | 'hindi' | 'science' | 'gk') => {
    soundEffects.playPop();
    setActiveQuizTopic({ topic, subject });
    setQuizQIndex(0);
    setQuizSelectedOpt(null);
    setQuizFeedback(null);
  };

  const handleCloseTopicQuiz = () => {
    soundEffects.playPop();
    setActiveQuizTopic(null);
    setQuizQIndex(0);
    setQuizSelectedOpt(null);
    setQuizFeedback(null);
  };

  const handleQuizOption = (opt: string) => {
    if (!activeQuizTopic || quizFeedback === 'correct') return;
    const currentQ = activeQuizTopic.topic.quizQuestions[quizQIndex];
    if (!currentQ) return;

    setQuizSelectedOpt(opt);
    if (opt === currentQ.correctAnswer) {
      soundEffects.playCelebration();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setQuizFeedback('correct');
      // Award stars to the specific active subject (science, gk, maths, english, hindi)
      addStars(5, activeQuizTopic.subject);

      const praise = isHindi
        ? `शाबाश! सही उत्तर है: ${currentQ.correctAnswer}!`
        : `Awesome! Correct answer is ${currentQ.correctAnswer}!`;
      if (isHindi) speakHindi(praise);
      else speakEnglish(praise);

      setTimeout(() => {
        if (quizQIndex < activeQuizTopic.topic.quizQuestions.length - 1) {
          setQuizQIndex((prev) => prev + 1);
          setQuizSelectedOpt(null);
          setQuizFeedback(null);
        }
      }, 1600);
    } else {
      soundEffects.playTryAgain();
      setQuizFeedback('wrong');
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  // Helper to build a custom questions topic if custom questions exist
  const getCustomTopicForSubject = (subjectName: string): CurriculumTopic | null => {
    const matched = customQuestions.filter((q) => q.subject.toLowerCase() === subjectName.toLowerCase());
    if (matched.length === 0) return null;

    const subjectMeta: Record<string, { en: string; hi: string; icon: string }> = {
      science: { en: 'Science (EVS)', hi: 'विज्ञान', icon: '🔬' },
      gk: { en: 'General Knowledge (GK)', hi: 'सामान्य ज्ञान (GK)', icon: '🌍' },
      maths: { en: 'Mathematics', hi: 'गणित', icon: '🔢' },
      english: { en: 'English Grammar', hi: 'अंग्रेजी व्याकरण', icon: '🇬🇧' },
      hindi: { en: 'Hindi Language', hi: 'हिंदी भाषा', icon: '🇮🇳' },
    };

    const meta = subjectMeta[subjectName.toLowerCase()] || { en: subjectName, hi: subjectName, icon: '🌟' };

    return {
      id: `custom-topic-${activeGrade}-${subjectName}`,
      titleEnglish: `🌟 50 Questions Master Challenge (${meta.en})`,
      titleHindi: `🌟 ५० मुख्य प्रश्न अभ्यास (${meta.hi})`,
      descriptionEnglish: `Practice ${matched.length} official curriculum questions for ${gradeInfo.gradeLabelEnglish}. Earn +5 ⭐ per correct answer!`,
      descriptionHindi: `${gradeInfo.gradeLabelHindi} के लिए ${matched.length} महत्वपूर्ण प्रश्न हल करें और हर सही उत्तर पर +५ ⭐ पाएं!`,
      icon: meta.icon,
      difficulty: 'Intermediate',
      keyConcepts: [
        { english: `${matched.length} Questions Question Bank`, hindi: `${matched.length} प्रश्नों का अभ्यास संग्रह` },
        { english: 'Instant Feedback & Audio Pronunciation', hindi: 'तुरंत परिणाम और आवाज उच्चारण' },
      ],
      quizQuestions: matched.map((q) => ({
        questionEnglish: q.questionEnglish,
        questionHindi: q.questionHindi || q.questionEnglish,
        visual: q.visual || '📝',
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanationEnglish: q.explanationEnglish || 'Awesome job! Keep learning!',
        explanationHindi: q.explanationHindi || 'शानदार! बिल्कुल सही उत्तर!',
      })),
    };
  };

  // Reusable component to render custom 50 questions topic card
  const renderCustomTopicCard = (
    subject: 'science' | 'gk' | 'maths' | 'english' | 'hindi',
    theme: { bg: string; border: string; btn: string; badge: string; starColor: string }
  ) => {
    const customTopic = getCustomTopicForSubject(subject);
    if (!customTopic) return null;

    const subjStars = getSubjectStars(subject);

    return (
      <div className={`p-4 sm:p-5 rounded-3xl border-2 ${theme.bg} ${theme.border} shadow-sm hover:shadow-md transition-all flex flex-col justify-between group`}>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{customTopic.icon}</span>
            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-xs ${theme.badge}`}>
                🌟 50 Questions Ready
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-stone-900 border border-stone-200 text-[10px] font-black">
                ⭐ {subjStars}
              </span>
            </div>
          </div>
          <h4 className="font-black text-sm sm:text-base text-stone-900 leading-snug">
            {isHindi ? customTopic.titleHindi : customTopic.titleEnglish}
          </h4>
          <p className="text-xs text-stone-600 line-clamp-2">
            {isHindi ? customTopic.descriptionHindi : customTopic.descriptionEnglish}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-stone-200/80 flex items-center justify-between">
          <span className="text-[11px] font-black text-stone-600">
            {customTopic.quizQuestions.length} {t('Questions', 'प्रश्न')} • +5 ⭐
          </span>
          <button
            onClick={() => handleOpenTopicQuiz(customTopic, subject)}
            className={`px-4 py-1.5 ${theme.btn} text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs hover:shadow active:scale-95 flex items-center gap-1`}
          >
            <span>{isHindi ? 'अभ्यास शुरू करें 🎯' : 'Start 50 Questions 🎯'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="space-y-2 text-center lg:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-yellow-200" />
            <span>
              {isHindi
                ? `कक्षा अनुसार पाठ्यक्रम • ${totalQuestionsAll}+ प्रश्न (Science, GK, Maths & Languages)`
                : `Class Curriculum • ${totalQuestionsAll}+ Questions (Science, GK, Maths & Languages)`}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            {isHindi
              ? `${gradeInfo.gradeLabelHindi} शिक्षण क्रम (${gradeInfo.ageRange})`
              : `${gradeInfo.gradeLabelEnglish} Learning Track (${gradeInfo.ageRange})`}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-100 max-w-xl font-hindi">
            {isHindi
              ? 'कक्षा व उम्र अनुसार पाठ्यक्रम: विज्ञान (Science), सामान्य ज्ञान (GK), गणित, व्याकरण और नए विषय।'
              : 'Class-tailored syllabus: Science, General Knowledge (GK), Maths, English Grammar, and Hindi.'}
          </p>
        </div>

        {/* Right side controls: Level pill */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0">
          <div className="px-5 py-3 bg-white/20 backdrop-blur rounded-2xl border border-white/30 text-center w-full shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-wider block text-amber-100">
              {isHindi ? 'सक्रिय छात्र' : 'Active Student'}
            </span>
            <span className="text-xl font-black">{studentDisplayName}</span>
            <span className="block text-xs font-bold text-yellow-200">
              {activeProfile.grade} • {activeProfile.age} Yrs
            </span>
          </div>
        </div>
      </div>

      {/* 2. Grade / Class Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-stone-100 rounded-3xl border-2 border-stone-200 max-w-fit mx-auto">
        {gradePills.map((g) => {
          const isSelected = activeGrade === g.id;
          const isUserGrade = childGrade === g.id;

          return (
            <button
              key={g.id}
              onClick={() => {
                soundEffects.playPop();
                setActiveGrade(g.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                  : 'text-stone-700 hover:bg-white/80'
              }`}
            >
              <span>{isHindi ? g.labelHin : g.labelEng}</span>
              <span className="text-[10px] opacity-75 font-semibold">({g.age})</span>
              {isUserGrade && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-stone-900 text-amber-300 text-[9px] font-black uppercase">
                  {isHindi ? 'वर्तमान' : 'Current'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Subject Switcher: Responsive Dropdown (Requested by User) */}
      <div id="curriculum-subjects-selector" className="space-y-3 max-w-xl mx-auto w-full px-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-amber-50/90 rounded-2xl border-2 border-amber-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-xl shadow-2xs shrink-0">
              📚
            </div>
            <div>
              <span className="text-xs font-black text-amber-950 uppercase tracking-wider block">
                {isHindi ? 'विषय चुनें (Select Subject):' : 'Choose Subject:'}
              </span>
              <span className="text-[11px] text-amber-800 font-medium">
                {isHindi ? '५ मुख्य विषय: विज्ञान, GK, गणित, अंग्रेजी, हिंदी' : '5 Academic Subjects & Question Bank'}
              </span>
            </div>
          </div>

          <div className="relative w-full sm:w-60">
            <select
              value={activeSubject}
              onChange={(e) => {
                soundEffects.playPop();
                const val = e.target.value as any;
                setActiveSubject(val);
                onSubjectChange?.(val);
              }}
              className="w-full appearance-none px-4 py-2.5 bg-white border-2 border-amber-300 hover:border-amber-400 rounded-xl font-black text-xs sm:text-sm text-stone-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer pr-9"
            >
              <option value="all">{isHindi ? '📚 सभी विषय (All Subjects - 5)' : '📚 All Subjects (5)'}</option>
              <option value="science">{isHindi ? '🔬 विज्ञान (Science / EVS)' : '🔬 Science (EVS)'}</option>
              <option value="gk">{isHindi ? '🌍 सामान्य ज्ञान (General Knowledge - GK)' : '🌍 General Knowledge (GK)'}</option>
              <option value="maths">{isHindi ? '🔢 गणित (Mathematics)' : '🔢 Maths (Numbers & Tables)'}</option>
              <option value="english">{isHindi ? '🇬🇧 अंग्रेजी (English Grammar)' : '🇬🇧 English Grammar'}</option>
              <option value="hindi">{isHindi ? '🇮🇳 हिंदी (वर्णमाला व भाषा)' : '🇮🇳 Hindi (Language)'}</option>
            </select>
            <ChevronDown className="w-4 h-4 text-stone-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Quick Horizontal Subject Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {[
            { id: 'all', label: isHindi ? 'सभी विषय' : 'All', icon: '📚', stars: null },
            { id: 'science', label: isHindi ? 'विज्ञान' : 'Science', icon: '🔬', stars: getSubjectStars('science') },
            { id: 'gk', label: 'GK', icon: '🌍', stars: getSubjectStars('gk') },
            { id: 'maths', label: isHindi ? 'गणित' : 'Maths', icon: '🔢', stars: getSubjectStars('maths') },
            { id: 'english', label: isHindi ? 'अंग्रेजी' : 'English', icon: '🇬🇧', stars: getSubjectStars('english') },
            { id: 'hindi', label: isHindi ? 'हिंदी' : 'Hindi', icon: '🇮🇳', stars: getSubjectStars('hindi') },
          ].map((item) => {
            const isSelected = activeSubject === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  const val = item.id as any;
                  setActiveSubject(val);
                  onSubjectChange?.(val);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-2 ring-amber-300 scale-102'
                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.stars !== null && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    isSelected ? 'bg-amber-500/80 text-stone-950' : 'bg-amber-100 text-amber-900'
                  }`}>
                    ⭐ {item.stars}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subject Showcase Banner (When a specific subject is chosen) */}
      {activeSubject !== 'all' && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-amber-200 flex items-center justify-center text-2xl shrink-0">
              {activeSubject === 'science' && '🔬'}
              {activeSubject === 'gk' && '🌍'}
              {activeSubject === 'maths' && '🔢'}
              {activeSubject === 'english' && '🇬🇧'}
              {activeSubject === 'hindi' && '🇮🇳'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-stone-900 capitalize">
                  {activeSubject === 'science' && (isHindi ? 'विज्ञान (Science & EVS)' : 'Science & EVS Track')}
                  {activeSubject === 'gk' && (isHindi ? 'सामान्य ज्ञान (General Knowledge)' : 'General Knowledge Track')}
                  {activeSubject === 'maths' && (isHindi ? 'गणित (Mathematics)' : 'Mathematics Track')}
                  {activeSubject === 'english' && (isHindi ? 'अंग्रेजी (English Grammar)' : 'English Grammar Track')}
                  {activeSubject === 'hindi' && (isHindi ? 'हिंदी भाषा व व्याकरण' : 'Hindi Language Track')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-xs font-black">
                  {gradeInfo.gradeLabelEnglish}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-semibold mt-0.5">
                {isHindi
                  ? '५० पाठ्यक्रम प्रश्न तैयार हैं • हर सही उत्तर पर पाएँ +५ ⭐ सितारे'
                  : '50 master questions ready • Earn +5 ⭐ stars per correct answer'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-amber-200 shadow-xs self-stretch sm:self-center justify-around sm:justify-start">
            <div className="text-center px-1">
              <span className="text-[10px] uppercase font-black text-amber-800 block">
                {isHindi ? 'विषय सितारे' : `${activeSubject.toUpperCase()} Stars`}
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-600">
                ⭐ {getSubjectStars(activeSubject as any)}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-amber-200" />
            <div className="text-center px-1">
              <span className="text-[10px] uppercase font-black text-stone-500 block">
                {isHindi ? 'कुल सितारे' : 'Overall Stars'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-stone-900">
                🌟 {totalStars}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Subject Cards Grid */}
      <div className="space-y-8">
        {/* SCIENCE SECTION */}
        {(activeSubject === 'all' || activeSubject === 'science') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-purple-100 text-purple-700 text-sm">🔬</span>
                <span>{isHindi ? 'विज्ञान व पर्यावरण पाठ्यक्रम (Science & EVS)' : 'Science & EVS Curriculum'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-black border border-purple-200">
                  ⭐ {getSubjectStars('science')} {t('Stars', 'सितारे')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {(gradeInfo.scienceTopics || []).reduce((a, t) => a + t.quizQuestions.length, 0) + (customQuestions.filter(q => q.subject.toLowerCase() === 'science').length)} {t('Questions', 'प्रश्न')}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 50 Questions Master Challenge Card */}
              {renderCustomTopicCard('science', {
                bg: 'bg-purple-50/90',
                border: 'border-purple-300 hover:border-purple-400',
                btn: 'bg-purple-600 hover:bg-purple-700',
                badge: 'bg-purple-200 text-purple-900',
                starColor: 'text-purple-600',
              })}

              {(gradeInfo.scienceTopics || []).map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-3xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black uppercase">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-stone-900 leading-snug">
                      {isHindi ? topic.titleHindi : topic.titleEnglish}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {isHindi ? topic.descriptionHindi : topic.descriptionEnglish}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      {topic.quizQuestions.length} {t('Questions', 'प्रश्न')}
                    </span>
                    <button
                      onClick={() => handleOpenTopicQuiz(topic, 'science')}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {isHindi ? 'अभ्यास करें 🎯' : 'Practice 🎯'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GENERAL KNOWLEDGE (GK) SECTION */}
        {(activeSubject === 'all' || activeSubject === 'gk') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-teal-100 text-teal-700 text-sm">🌍</span>
                <span>{isHindi ? 'सामान्य ज्ञान पाठ्यक्रम (General Knowledge)' : 'General Knowledge (GK) Curriculum'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-black border border-teal-200">
                  ⭐ {getSubjectStars('gk')} {t('Stars', 'सितारे')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {(gradeInfo.gkTopics || []).reduce((a, t) => a + t.quizQuestions.length, 0) + (customQuestions.filter(q => q.subject.toLowerCase() === 'gk').length)} {t('Questions', 'प्रश्न')}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 50 Questions Master Challenge Card */}
              {renderCustomTopicCard('gk', {
                bg: 'bg-teal-50/90',
                border: 'border-teal-300 hover:border-teal-400',
                btn: 'bg-teal-600 hover:bg-teal-700',
                badge: 'bg-teal-200 text-teal-900',
                starColor: 'text-teal-600',
              })}

              {(gradeInfo.gkTopics || []).map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-3xl border-2 border-teal-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-black uppercase">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-stone-900 leading-snug">
                      {isHindi ? topic.titleHindi : topic.titleEnglish}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {isHindi ? topic.descriptionHindi : topic.descriptionEnglish}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      {topic.quizQuestions.length} {t('Questions', 'प्रश्न')}
                    </span>
                    <button
                      onClick={() => handleOpenTopicQuiz(topic, 'gk')}
                      className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {isHindi ? 'अभ्यास करें 🎯' : 'Practice 🎯'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATHS SECTION */}
        {(activeSubject === 'all' || activeSubject === 'maths') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-blue-100 text-blue-700 text-sm">🔢</span>
                <span>{isHindi ? 'गणित पाठ्यक्रम (Maths)' : 'Maths Curriculum'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-black border border-blue-200">
                  ⭐ {getSubjectStars('maths')} {t('Stars', 'सितारे')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {gradeInfo.mathsTopics.reduce((a, t) => a + t.quizQuestions.length, 0) + (customQuestions.filter(q => q.subject.toLowerCase() === 'maths').length)} {t('Questions', 'प्रश्न')}
                </span>
              </h3>
              {onSelectMaths && (
                <button
                  onClick={onSelectMaths}
                  className="flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <span>{isHindi ? 'गणित लैब खोलें ➔' : 'Open Maths Lab ➔'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 50 Questions Master Challenge Card */}
              {renderCustomTopicCard('maths', {
                bg: 'bg-blue-50/90',
                border: 'border-blue-300 hover:border-blue-400',
                btn: 'bg-blue-600 hover:bg-blue-700',
                badge: 'bg-blue-200 text-blue-900',
                starColor: 'text-blue-600',
              })}

              {gradeInfo.mathsTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-3xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-stone-900 leading-snug">
                      {isHindi ? topic.titleHindi : topic.titleEnglish}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {isHindi ? topic.descriptionHindi : topic.descriptionEnglish}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      {topic.quizQuestions.length} {t('Questions', 'प्रश्न')}
                    </span>
                    <button
                      onClick={() => handleOpenTopicQuiz(topic, 'maths')}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {isHindi ? 'अभ्यास करें 🎯' : 'Practice 🎯'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENGLISH SECTION */}
        {(activeSubject === 'all' || activeSubject === 'english') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700 text-sm">🇬🇧</span>
                <span>{isHindi ? 'अंग्रेजी पाठ्यक्रम (English)' : 'English Curriculum'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black border border-emerald-200">
                  ⭐ {getSubjectStars('english')} {t('Stars', 'सितारे')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {gradeInfo.englishTopics.reduce((a, t) => a + t.quizQuestions.length, 0) + (customQuestions.filter(q => q.subject.toLowerCase() === 'english').length)} {t('Questions', 'प्रश्न')}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 50 Questions Master Challenge Card */}
              {renderCustomTopicCard('english', {
                bg: 'bg-emerald-50/90',
                border: 'border-emerald-300 hover:border-emerald-400',
                btn: 'bg-emerald-600 hover:bg-emerald-700',
                badge: 'bg-emerald-200 text-emerald-900',
                starColor: 'text-emerald-600',
              })}

              {gradeInfo.englishTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-3xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-stone-900 leading-snug">
                      {isHindi ? topic.titleHindi : topic.titleEnglish}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {isHindi ? topic.descriptionHindi : topic.descriptionEnglish}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      {topic.quizQuestions.length} {t('Questions', 'प्रश्न')}
                    </span>
                    <button
                      onClick={() => handleOpenTopicQuiz(topic, 'english')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {isHindi ? 'सीखें 🎯' : 'Practice 🎯'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HINDI SECTION */}
        {(activeSubject === 'all' || activeSubject === 'hindi') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-orange-100 text-orange-700 text-sm">🇮🇳</span>
                <span>{isHindi ? 'हिंदी व्याकरण व भाषा पाठ्यक्रम' : 'Hindi Curriculum'}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 font-black border border-orange-200">
                  ⭐ {getSubjectStars('hindi')} {t('Stars', 'सितारे')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {gradeInfo.hindiTopics.reduce((a, t) => a + t.quizQuestions.length, 0) + (customQuestions.filter(q => q.subject.toLowerCase() === 'hindi').length)} {t('Questions', 'प्रश्न')}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 50 Questions Master Challenge Card */}
              {renderCustomTopicCard('hindi', {
                bg: 'bg-orange-50/90',
                border: 'border-orange-300 hover:border-orange-400',
                btn: 'bg-orange-600 hover:bg-orange-700',
                badge: 'bg-orange-200 text-orange-900',
                starColor: 'text-orange-600',
              })}

              {gradeInfo.hindiTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-3xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-black uppercase">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-stone-900 leading-snug">
                      {isHindi ? topic.titleHindi : topic.titleEnglish}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {isHindi ? topic.descriptionHindi : topic.descriptionEnglish}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400">
                      {topic.quizQuestions.length} {t('Questions', 'प्रश्न')}
                    </span>
                    <button
                      onClick={() => handleOpenTopicQuiz(topic, 'hindi')}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {isHindi ? 'सीखें 🎯' : 'Practice 🎯'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Interactive Topic Quiz Modal for Any Subject */}
      {activeQuizTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{activeQuizTopic.topic.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase">
                      {activeQuizTopic.subject.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-200 text-stone-900 text-[10px] font-black uppercase">
                      {gradeInfo.gradeLabelEnglish}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-900/40 text-amber-200 text-[10px] font-black">
                      ⭐ {getSubjectStars(activeQuizTopic.subject)} Stars
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black leading-tight mt-1">
                    {isHindi ? activeQuizTopic.topic.titleHindi : activeQuizTopic.topic.titleEnglish}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCloseTopicQuiz}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Question */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-center flex-1">
              {(() => {
                const questions = activeQuizTopic.topic.quizQuestions;
                const currentQ = questions[quizQIndex];
                if (!currentQ) return null;

                return (
                  <>
                    {/* Top sub-bar */}
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400">
                      <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full font-black">
                        {t(`Question ${quizQIndex + 1} of ${questions.length}`, `प्रश्न ${quizQIndex + 1} / ${questions.length}`)}
                      </span>

                      <button
                        onClick={() => {
                          const txt = isHindi ? currentQ.questionHindi : currentQ.questionEnglish;
                          if (isHindi) speakHindi(txt);
                          else speakEnglish(txt);
                        }}
                        className="flex items-center gap-1 text-amber-700 hover:text-amber-900 font-bold cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{t('Listen', 'सुनें')}</span>
                      </button>
                    </div>

                    {/* Question Statement */}
                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-2xl font-black text-stone-900 font-hindi">
                        {isHindi ? currentQ.questionHindi : currentQ.questionEnglish}
                      </h4>
                      {currentQ.visual && (
                        <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-200 text-2xl sm:text-4xl font-mono select-none inline-block px-6">
                          {currentQ.visual}
                        </div>
                      )}
                    </div>

                    {/* 4 Multiple Choice Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto pt-2">
                      {currentQ.options.map((opt, oIdx) => {
                        const isSelected = quizSelectedOpt === opt;
                        let btnClass = 'bg-stone-50 border-stone-200 hover:border-amber-400 text-stone-900 hover:bg-amber-50';
                        if (isSelected) {
                          if (quizFeedback === 'correct') {
                            btnClass = 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-102';
                          } else if (quizFeedback === 'wrong') {
                            btnClass = 'bg-rose-500 border-rose-600 text-white animate-shake';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizOption(opt)}
                            className={`p-3.5 rounded-2xl border-2 text-sm sm:text-base font-black transition-all active:scale-95 cursor-pointer ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation */}
                    {quizFeedback === 'correct' && (
                      <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm font-bold text-emerald-950 animate-in fade-in flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{isHindi ? currentQ.explanationHindi : currentQ.explanationEnglish} (+5 ⭐ {activeQuizTopic.subject.toUpperCase()})</span>
                      </div>
                    )}

                    {/* Navigation bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <button
                        onClick={() => {
                          soundEffects.playPop();
                          setQuizQIndex((p) => Math.max(0, p - 1));
                          setQuizSelectedOpt(null);
                          setQuizFeedback(null);
                        }}
                        disabled={quizQIndex === 0}
                        className="px-3.5 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        ⬅️ {t('Previous', 'पिछला')}
                      </button>

                      <div className="flex items-center gap-1">
                        {questions.slice(0, 15).map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            onClick={() => {
                              soundEffects.playPop();
                              setQuizQIndex(dotIdx);
                              setQuizSelectedOpt(null);
                              setQuizFeedback(null);
                            }}
                            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                              quizQIndex === dotIdx ? 'bg-amber-500 scale-125' : 'bg-stone-200'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          soundEffects.playPop();
                          setQuizQIndex((p) => Math.min(questions.length - 1, p + 1));
                          setQuizSelectedOpt(null);
                          setQuizFeedback(null);
                        }}
                        disabled={quizQIndex === questions.length - 1}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black disabled:opacity-40 transition-all cursor-pointer"
                      >
                        {t('Next', 'अगला')} ➔
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
