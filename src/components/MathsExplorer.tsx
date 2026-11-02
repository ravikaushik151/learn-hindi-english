"use client";

import React, { useState } from 'react';
import {
  CLASS_WISE_CURRICULUM,
  GradeLevel,
  CurriculumTopic,
  mapGradeStringToLevel,
} from '@/data/classWiseCurriculumData';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSpeech } from '@/hooks/useSpeech';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Calculator,
  Trophy,
  Star,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface MathsExplorerProps {
  onBackToDashboard?: () => void;
}

export function MathsExplorer({ onBackToDashboard }: MathsExplorerProps) {
  const { activeProfile, addStars, getSubjectStars, totalStars, isLoggedIn } = useChildProfile();
  const { t, isHindi } = useLanguage();
  const { speakEnglish, speakHindi } = useSpeech();

  const kidName = isLoggedIn
    ? activeProfile.name
    : isHindi
    ? 'नन्हा छात्र'
    : 'Young Explorer';

  // Initialize grade based on active student's grade & age (e.g. Jeevika = class-3)
  const defaultGrade = mapGradeStringToLevel(activeProfile?.grade, activeProfile?.age);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(defaultGrade);

  // Synchronize grade whenever active child profile changes
  React.useEffect(() => {
    const grade = mapGradeStringToLevel(activeProfile?.grade, activeProfile?.age);
    setSelectedGrade(grade);
    setActiveTopicIndex(0);
    setQuestionIndex(0);
    setSelectedOption(null);
    setFeedback(null);
  }, [activeProfile?.grade, activeProfile?.age, activeProfile?.id]);

  const gradeData = CLASS_WISE_CURRICULUM[selectedGrade];
  const topics = gradeData.mathsTopics;

  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const currentTopic = topics[activeTopicIndex] || topics[0];

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [mathScore, setMathScore] = useState<number>(0);

  const questions = currentTopic.quizQuestions;
  const currentQ = questions[questionIndex % questions.length];

  const goToNextQuestion = () => {
    soundEffects.playPop();
    setQuestionIndex((prev) => (prev + 1) % questions.length);
    setSelectedOption(null);
    setFeedback(null);
  };

  const goToPrevQuestion = () => {
    soundEffects.playPop();
    setQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    setSelectedOption(null);
    setFeedback(null);
  };

  const jumpToQuestion = (idx: number) => {
    soundEffects.playPop();
    setQuestionIndex(idx);
    setSelectedOption(null);
    setFeedback(null);
  };

  const speakText = (eng: string, hin: string) => {
    if (isHindi) {
      speakHindi(hin);
    } else {
      speakEnglish(eng);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (feedback === 'correct') return;
    setSelectedOption(option);

    if (option === currentQ.correctAnswer) {
      soundEffects.playCelebration();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setFeedback('correct');
      setMathScore((prev) => prev + 10);
      addStars(5, 'maths');

      const praise = isHindi
        ? `शाबाश! सही उत्तर है: ${currentQ.correctAnswer}!`
        : `Awesome! Correct answer is ${currentQ.correctAnswer}!`;
      speakText(praise, praise);

      setTimeout(() => {
        setQuestionIndex((prev) => (prev + 1) % questions.length);
        setSelectedOption(null);
        setFeedback(null);
      }, 1800);
    } else {
      soundEffects.playTryAgain();
      setFeedback('wrong');
      const retry = isHindi ? 'फिर से सोचो!' : 'Try again!';
      speakText(retry, retry);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <Calculator className="w-3.5 h-3.5 text-yellow-300" />
            <span>{t('Kids Maths Lab 🔢 • 50+ Class Questions', 'गणित की रंग-बिरंगी प्रयोगशाला 🔢 • ५०+ कक्षा प्रश्न')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            {t('Fun Mathematics by Class & Age 📐', 'कक्षा व उम्र के अनुसार गणित 📐')}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-blue-100 max-w-xl">
            {t(
              `Tailored for ${kidName} (${activeProfile.grade} • Age ${activeProfile.age}). Solve visual puzzles and earn stars!`,
              `${kidName} (${activeProfile.grade} • उम्र ${activeProfile.age}) के स्तर के अनुसार मजेदार सवाल!`
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20">
            <Star className="w-7 h-7 text-yellow-300 fill-yellow-300" />
            <div className="text-left">
              <span className="text-[10px] text-blue-200 uppercase font-black block">Maths Stars</span>
              <span className="text-xl sm:text-2xl font-black">⭐ {getSubjectStars('maths')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20">
            <Trophy className="w-7 h-7 text-yellow-300" />
            <div className="text-left">
              <span className="text-[10px] text-blue-200 uppercase font-black block">Maths Score</span>
              <span className="text-xl sm:text-2xl font-black">{mathScore} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Class / Grade Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-stone-100 rounded-3xl border-2 border-stone-200 max-w-fit mx-auto">
        {(
          [
            { id: 'nursery', label: 'Nursery / LKG', hindi: 'नर्सरी / LKG', age: '3-4 yrs' },
            { id: 'class-1', label: 'UKG / Class 1', hindi: 'UKG / कक्षा १', age: '5-6 yrs' },
            { id: 'class-2', label: 'Class 2', hindi: 'कक्षा २', age: '6-7 yrs' },
            { id: 'class-3', label: 'Class 3', hindi: 'कक्षा ३', age: '7-8 yrs' },
            { id: 'class-4-5', label: 'Class 4 & 5', hindi: 'कक्षा ४ और ५', age: '9-11+ yrs' },
          ] as const
        ).map((g) => {
          const isSelected = selectedGrade === g.id;
          const isChildGrade = defaultGrade === g.id;

          return (
            <button
              key={g.id}
              onClick={() => {
                soundEffects.playPop();
                setSelectedGrade(g.id);
                setActiveTopicIndex(0);
                setQuestionIndex(0);
                setSelectedOption(null);
                setFeedback(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md scale-102 ring-2 ring-blue-300'
                  : 'text-stone-700 hover:bg-white/80'
              }`}
            >
              <span>{isHindi ? g.hindi : g.label}</span>
              {isChildGrade && (
                <span className="px-1.5 py-0.5 rounded-full bg-yellow-400 text-stone-950 text-[10px] font-black uppercase">
                  ⭐ Your Class
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Topics for this Class */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {topics.map((tItem, idx) => {
          const isActive = idx === activeTopicIndex;
          return (
            <button
              key={tItem.id}
              onClick={() => {
                soundEffects.playPop();
                setActiveTopicIndex(idx);
                setQuestionIndex(0);
                setSelectedOption(null);
                setFeedback(null);
              }}
              className={`p-4 rounded-3xl border-3 text-left transition-all flex items-start gap-3 ${
                isActive
                  ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200'
                  : 'bg-white border-stone-200 hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <span className="text-3xl p-2 rounded-2xl bg-white border border-stone-100 shadow-xs shrink-0">
                {tItem.icon}
              </span>
              <div>
                <h4 className="font-black text-sm text-stone-900 leading-snug">
                  {isHindi ? tItem.titleHindi : tItem.titleEnglish}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                  {isHindi ? tItem.descriptionHindi : tItem.descriptionEnglish}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Interactive Math Quiz Card */}
      {currentQ && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-blue-400 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          {/* Header of quiz card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-stone-500 pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-blue-50 text-blue-900 px-3 py-1 rounded-full border border-blue-200">
                {isHindi ? currentTopic.titleHindi : currentTopic.titleEnglish} • {questionIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Quick jump to questions */}
            <div className="flex flex-wrap items-center gap-1.5">
              {questions.map((_, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => jumpToQuestion(qIdx)}
                  className={`w-7 h-7 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    questionIndex === qIdx
                      ? 'bg-blue-600 text-white shadow-xs scale-105'
                      : 'bg-stone-100 text-stone-600 hover:bg-blue-100'
                  }`}
                  title={`Question ${qIdx + 1}`}
                >
                  {qIdx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                speakText(
                  currentQ.questionEnglish,
                  currentQ.questionHindi
                )
              }
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t('Listen', 'सुनें')}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-3xl font-black text-stone-900 font-hindi">
              {isHindi ? currentQ.questionHindi : currentQ.questionEnglish}
            </h3>

            {/* Visual Counter representation if available */}
            {currentQ.visual && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl text-3xl sm:text-5xl font-mono tracking-wider shadow-inner select-none flex items-center justify-center">
                {currentQ.visual}
              </div>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === opt;
              const isCorrectAnswer = opt === currentQ.correctAnswer;

              let btnStyle = 'bg-stone-50 border-stone-200 hover:border-blue-400 text-stone-900 hover:bg-blue-50';
              if (isSelected) {
                if (feedback === 'correct') {
                  btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-102';
                } else if (feedback === 'wrong') {
                  btnStyle = 'bg-rose-500 border-rose-600 text-white animate-shake';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleOptionSelect(opt)}
                  className={`p-4 rounded-2xl border-3 text-lg sm:text-2xl font-black transition-all shadow-sm active:scale-95 cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation when answered */}
          {feedback === 'correct' && (
            <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm font-bold text-emerald-950 animate-in fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{isHindi ? currentQ.explanationHindi : currentQ.explanationEnglish} (+5 ⭐)</span>
            </div>
          )}

          {/* Previous / Next Question Navigation Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <button
              onClick={goToPrevQuestion}
              className="px-4 py-2 rounded-xl border-2 border-stone-200 hover:bg-stone-50 text-xs font-black text-stone-700 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>⬅️</span>
              <span>{t('Previous', 'पिछला')}</span>
            </button>

            <span className="text-xs font-bold text-stone-400">
              {questionIndex + 1} / {questions.length}
            </span>

            <button
              onClick={goToNextQuestion}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{t('Next Question', 'अगला सवाल')}</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Key Concepts Summary */}
      {currentTopic.keyConcepts && currentTopic.keyConcepts.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-3xl border-2 border-indigo-200 max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-indigo-900 tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-700" />
            <span>{t('Key Formulas & Concepts for this Lesson:', 'इस पाठ के मुख्य सूत्र व नियम:')}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-indigo-950">
            {currentTopic.keyConcepts.map((kc, i) => (
              <div key={i} className="p-2 bg-white/80 rounded-xl border border-indigo-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>{isHindi ? kc.hindi : kc.english}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

