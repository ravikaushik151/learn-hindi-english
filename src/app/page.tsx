"use client";

import React, { useState } from 'react';
import { GRAMMAR_LESSONS, GRAMMAR_NOTES, VOCABULARY_LIST } from '@/data/lessons';
import { GRAMMAR_CHEAT_CODES } from '@/data/cheatCodes';
import { ALL_STAGES } from '@/data/stages';
import { GrammarLesson, StageId } from '@/types';
import { Navbar, MainNavTab } from '@/components/Navbar';
import { LessonProgressTracker } from '@/components/LessonProgressTracker';
import { CurriculumDashboard } from '@/components/CurriculumDashboard';
import { StageOverview } from '@/components/StageOverview';
import { PictureGrammarLesson } from '@/components/PictureGrammarLesson';
import { AlphabetView } from '@/components/AlphabetView';
import { PhonicsView } from '@/components/PhonicsView';
import { GrammarCheatCodeCard } from '@/components/GrammarCheatCodeCard';
import { CommonWordsExplorer } from '@/components/CommonWordsExplorer';
import { EnglishSoundSecretsExplorer } from '@/components/EnglishSoundSecretsExplorer';
import { KidsEssentialsExplorer } from '@/components/KidsEssentialsExplorer';
import { PlayGamesView } from '@/components/PlayGamesView';
import { MyStarsView } from '@/components/MyStarsView';
import { EnglishSpeechPractice } from '@/components/EnglishSpeechPractice';
import { useEnglishProgress } from '@/hooks/useEnglishProgress';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Layers, MessageSquare, Mic, Trophy, Award, Flame, UserCheck, KeyRound, Puzzle, Headphones, Volume2, ArrowRight } from 'lucide-react';
import { HindiVarnamalaExplorer } from '@/components/HindiVarnamalaExplorer';
import { BarakhadiTable } from '@/components/BarakhadiTable';
import { HindiShabdPathanExplorer } from '@/components/HindiShabdPathanExplorer';
import { HindiGintiExplorer } from '@/components/HindiGintiExplorer';

export default function HomePage() {
  const { starsCount, completedLessons, completeLesson } = useEnglishProgress();
  const { activeProfile, openReportModal, openProfileModal, openEditModal, openDeviceLoginModal, markLessonCompleted } = useChildProfile();
  const { lang, isEnglish, isHindi, t, shouldShowHindi } = useLanguage();

  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [activeStage, setActiveStage] = useState<StageId>('stage-1');
  const [activeLesson, setActiveLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);

  // Inside 'learn' tab: sub-modes to explore for English
  const [learnSubTab, setLearnSubTab] = useState<
    'lesson' | 'speech-practice' | 'kids-essentials' | 'common-words' | 'sound-secrets' | 'cheat-codes' | 'phonics' | 'alphabet'
  >('lesson');

  // Inside 'learn' tab: sub-modes to explore for Hindi
  const [hindiSubTab, setHindiSubTab] = useState<'varnamala' | 'barakhadi' | 'words' | 'ginti'>('varnamala');

  const handleSelectStage = (stage: StageId) => {
    setActiveStage(stage);
    const stageLessons = GRAMMAR_LESSONS.filter((l) => l.stage === stage);
    if (stageLessons.length > 0) {
      setActiveLesson(stageLessons[0]);
    }
  };

  const handleSelectLesson = (lesson: GrammarLesson) => {
    setActiveLesson(lesson);
    setActiveStage(lesson.stage);
    setLearnSubTab('lesson');
    setActiveTab('learn');
  };

  const handleNextLesson = () => {
    const currentIdx = GRAMMAR_LESSONS.findIndex((l) => l.id === activeLesson.id);
    
    // 1. Award stars for current lesson
    completeLesson(activeLesson.id, 5, 5);
    markLessonCompleted(activeLesson.id, 5);

    // 2. Determine next lesson (advances to next, or loops back to first stage so game never gets stuck)
    if (currentIdx >= 0 && currentIdx < GRAMMAR_LESSONS.length - 1) {
      const next = GRAMMAR_LESSONS[currentIdx + 1];
      setActiveLesson(next);
      setActiveStage(next.stage);
      soundEffects.playPop();
    } else {
      // Reached the end of all 10 stages! Cycle back to stage 1 with celebration
      const next = GRAMMAR_LESSONS[0];
      setActiveLesson(next);
      setActiveStage(next.stage);
      soundEffects.playCelebration();
    }
  };

  const handleLessonCompleted = (score: number) => {
    completeLesson(activeLesson.id, score, 5);
    markLessonCompleted(activeLesson.id, Math.max(1, Math.round(score)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] pb-20 md:pb-8">
      {/* 1. Simplified Kid-Friendly Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        starsCount={starsCount}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Progress Tracker Bar */}
        <LessonProgressTracker
          completedLessons={completedLessons}
          totalLessons={GRAMMAR_LESSONS.length}
          starsCount={starsCount}
        />

        {/* ========================================================
            TAB 1: HOME (DASHBOARD)
            ======================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Sleek Kid Profile & Greeting Bar with Kid Code & Multi-Browser Sync */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-3xl shadow-sm shrink-0">
                  {activeProfile.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-xl font-black text-stone-900">
                      {t(`Welcome, ${activeProfile.name}! 👋`, `नमस्ते, ${activeProfile.name}! 👋`)}
                    </h2>
                    
                    {/* Unique Kid Code Passport Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-300 rounded-lg text-xs font-black text-amber-900">
                      <span className="text-[10px] text-amber-700">🔑 {t('Code:', 'कोड:')}</span>
                      <span className="font-mono tracking-wider text-amber-950 font-black">{activeProfile.kidCode || 'RAI-7429'}</span>
                    </div>

                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        openEditModal();
                      }}
                      className="text-xs font-bold text-amber-800 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg transition-colors flex items-center gap-1"
                      title={t('Change name, avatar, or PIN', 'नाम, अवतार या पिन बदलें')}
                    >
                      <span>{t('✏️ Edit', '✏️ बदलें')}</span>
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 font-semibold mt-1">
                    {t(
                      `Age: ${activeProfile.age} yrs • ${activeProfile.grade} • 🔥 ${activeProfile.streakDays || 1} Day Streak • 🔒 PIN Protected`,
                      `उम्र: ${activeProfile.age} वर्ष • ${activeProfile.grade} • 🔥 ${activeProfile.streakDays || 1} दिन स्ट्रीक • 🔒 पिन सुरक्षित`
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                {/* Multi-Browser / Multi-Device Sync Button */}
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    openDeviceLoginModal();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-black text-xs rounded-xl shadow-xs transition-all active:scale-95"
                  title={t('Open profile on another browser or phone', 'दूसरे ब्राउज़र या फोन में प्रोफाइल खोलें')}
                >
                  <KeyRound className="w-3.5 h-3.5 text-stone-950" />
                  <span>{t('Open on Other Browser 🔑', 'दूसरे ब्राउज़र में खोलें 🔑')}</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    openReportModal();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-stone-900 font-black text-xs rounded-xl border border-amber-300 transition-all active:scale-95"
                >
                  <span>📜</span>
                  <span>{t('Report Card', 'रिपोर्ट कार्ड')}</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    openProfileModal();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-all active:scale-95"
                >
                  <span>👤</span>
                  <span>{t('Switch Kid', 'दूसरा बच्चा')}</span>
                </button>
              </div>
            </div>

            {/* 4 Clean, Spacious, Kid-Friendly Play & Learn Cards */}
            {isHindi ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Hindi Card 1: वर्णमाला (स्वर व व्यंजन) */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setHindiSubTab('varnamala');
                      setActiveTab('learn');
                    }}
                    className="bg-gradient-to-br from-amber-400 to-orange-400 p-5 rounded-3xl text-stone-900 shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/30 backdrop-blur rounded-full text-xs font-black uppercase text-amber-950 font-hindi">
                        अ से ज्ञ तक
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">🔤</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black font-hindi">
                        हिंदी वर्णमाला 🎨
                      </h3>
                      <p className="text-xs font-bold text-amber-950/90 mt-1 font-hindi">
                        13 स्वर (अ-अः), 36 व्यंजन (क-ज्ञ) व 14 मात्राएँ
                      </p>
                    </div>
                  </div>

                  {/* Hindi Card 2: बारहखड़ी */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setHindiSubTab('barakhadi');
                      setActiveTab('learn');
                    }}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white font-hindi">
                        क से ज्ञ तक
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">✨</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black font-hindi">
                        सम्पूर्ण बारहखड़ी 🔤
                      </h3>
                      <p className="text-xs font-bold text-emerald-100 mt-1 font-hindi">
                        सभी 34 व्यंजनों की 12-खड़ी व शुद्ध उच्चारण
                      </p>
                    </div>
                  </div>

                  {/* Hindi Card 3: शब्द-पठन */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setHindiSubTab('words');
                      setActiveTab('learn');
                    }}
                    className="bg-gradient-to-br from-teal-500 to-cyan-600 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white font-hindi">
                        शब्द-पठन
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">📖</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black font-hindi">
                        शब्द-पठन (२, ३, ४ अक्षर) 💧
                      </h3>
                      <p className="text-xs font-bold text-teal-100 mt-1 font-hindi">
                        जल, कमल, अजगर व मात्रा वाले 200+ शब्द
                      </p>
                    </div>
                  </div>

                  {/* Hindi Card 4: हिंदी गिनती */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setHindiSubTab('ginti');
                      setActiveTab('learn');
                    }}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white font-hindi">
                        १ से १०० तक
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">🔢</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black font-hindi">
                        हिंदी गिनती 💯
                      </h3>
                      <p className="text-xs font-bold text-indigo-100 mt-1 font-hindi">
                        १ (एक) से १०० (सौ) तक हिंदी अंक व शब्द
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hindi Interactive Learning & Games Quick Section */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-stone-900 font-hindi">
                        मजेदार खेल और अभ्यास 🎯
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-500 font-hindi font-medium">
                        खेल-खेल में हिंदी अक्षर पहचानें, शब्द बनाएं और बोलकर अभ्यास करें
                      </p>
                    </div>
                    <span className="text-2xl">🎪</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <Link
                      href="/word-builder"
                      className="p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">🧩</span>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 font-hindi">शब्द बनाओ खेल</h4>
                        <p className="text-[11px] text-stone-500 font-hindi">अक्षर जोड़कर शब्द बनाएं</p>
                      </div>
                    </Link>

                    <Link
                      href="/practice"
                      className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">🎙️</span>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 font-hindi">सुनो और बोलो</h4>
                        <p className="text-[11px] text-stone-500 font-hindi">माइक से बोलकर सितारे जीतें</p>
                      </div>
                    </Link>

                    <Link
                      href="/sound-reading"
                      className="p-4 rounded-2xl bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">📖</span>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 font-hindi">ध्वनि पठन</h4>
                        <p className="text-[11px] text-stone-500 font-hindi">२, ३, ४ अक्षर पठन</p>
                      </div>
                    </Link>

                    <Link
                      href="/my-voice"
                      className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">🎧</span>
                      <div>
                        <h4 className="font-black text-sm text-stone-900 font-hindi">मेरी आवाज़ सुनो</h4>
                        <p className="text-[11px] text-stone-500 font-hindi">ध्वनि तरंगें व रिकॉर्डिंग</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Start Learning */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTab('learn');
                      setLearnSubTab('lesson');
                    }}
                    className="bg-gradient-to-br from-amber-400 to-orange-400 p-5 rounded-3xl text-stone-900 shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/30 backdrop-blur rounded-full text-xs font-black uppercase text-amber-950">
                        Step-by-Step
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black">
                        Start Learning 🎨
                      </h3>
                      <p className="text-xs font-bold text-amber-950/90 mt-1">
                        Alphabet, Phonics & 16 Interactive Lessons
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Say It Right */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTab('learn');
                      setLearnSubTab('speech-practice');
                    }}
                    className="bg-gradient-to-br from-teal-500 to-emerald-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white">
                        Voice & Speech
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">🗣️</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black">
                        Say It Right 🎙️
                      </h3>
                      <p className="text-xs font-bold text-teal-100 mt-1">
                        Speech recognition & instant stars
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Play Fun Games */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTab('play');
                    }}
                    className="bg-gradient-to-br from-pink-400 to-purple-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-pink-100">
                        Fun & Games
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">🎮</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black">
                        Play Games 🕹️
                      </h3>
                      <p className="text-xs font-bold text-pink-100 mt-1">
                        Word Builder, Rhyme Match & Quizzes
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Kids Words & Essentials */}
                  <div
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTab('learn');
                      setLearnSubTab('kids-essentials');
                    }}
                    className="bg-gradient-to-br from-indigo-400 to-blue-500 p-5 rounded-3xl text-white shadow-md cursor-pointer hover:scale-102 transition-transform flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1 bg-white/25 rounded-full text-xs font-black uppercase text-white">
                        Words & Bank
                      </span>
                      <span className="text-3xl group-hover:scale-110 transition-transform">🍎</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black">
                        Kids Essentials 💬
                      </h3>
                      <p className="text-xs font-bold text-indigo-100 mt-1">
                        Days, Months, Numbers & 5,000 Words
                      </p>
                    </div>
                  </div>
                </div>

                {/* Curriculum Roadmap */}
                <div className="mt-6">
                  <CurriculumDashboard
                    lessons={GRAMMAR_LESSONS}
                    completedLessons={completedLessons}
                    starsCount={starsCount}
                    currentLesson={activeLesson}
                    onSelectLesson={handleSelectLesson}
                    onSelectStage={handleSelectStage}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: LEARN (ALPHABET, SOUNDS, WORDS & GRAMMAR)
            ======================================================== */}
        {activeTab === 'learn' && (
          isHindi ? (
            /* ========================================================
               HINDI ACADEMY LEARN VIEW (वर्णमाला, बारहखड़ी, शब्द, गिनती)
               ======================================================== */
            <div className="space-y-6 animate-in fade-in">
              {/* Hindi 4 Clean Sub-modes Switcher */}
              <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setHindiSubTab('varnamala');
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    hindiSubTab === 'varnamala'
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <span>🔤</span>
                  <span>वर्णमाला (स्वर, व्यंजन, मात्रा)</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setHindiSubTab('barakhadi');
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    hindiSubTab === 'barakhadi'
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <span>✨</span>
                  <span>सम्पूर्ण बारहखड़ी</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setHindiSubTab('words');
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    hindiSubTab === 'words'
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <span>📖</span>
                  <span>शब्द-पठन (२, ३, ४ अक्षर)</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setHindiSubTab('ginti');
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    hindiSubTab === 'ginti'
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <span>🔢</span>
                  <span>गिनती (१ से १००)</span>
                </button>
              </div>

              {/* Hindi Sub-view Components */}
              {hindiSubTab === 'varnamala' && <HindiVarnamalaExplorer />}
              {hindiSubTab === 'barakhadi' && <BarakhadiTable />}
              {hindiSubTab === 'words' && <HindiShabdPathanExplorer />}
              {hindiSubTab === 'ginti' && <HindiGintiExplorer />}
            </div>
          ) : (
            /* ========================================================
               ENGLISH ACADEMY LEARN VIEW (LESSONS, PHONICS, WORDS)
               ======================================================== */
            <div className="space-y-6 animate-in fade-in">
              {/* Sub-modes Switcher (Simplified into 4 Primary Tabs for Kids) */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-3xl border-2 border-amber-200 shadow-sm max-w-fit mx-auto">
                  {/* 1. Active Lesson */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setLearnSubTab('lesson');
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      learnSubTab === 'lesson'
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/60'
                    }`}
                  >
                    <span>🎨 Active Lesson</span>
                  </button>

                  {/* 2. Alphabet & Phonics */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      if (learnSubTab !== 'alphabet' && learnSubTab !== 'phonics') {
                        setLearnSubTab('alphabet');
                      }
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      learnSubTab === 'alphabet' || learnSubTab === 'phonics'
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/60'
                    }`}
                  >
                    <span>🔤 Alphabet & Phonics</span>
                  </button>

                  {/* 3. Say It Right */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setLearnSubTab('speech-practice');
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      learnSubTab === 'speech-practice'
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/60'
                    }`}
                  >
                    <span>🎙️ Say It Right</span>
                  </button>

                  {/* 4. Words & Essentials */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      if (!['kids-essentials', 'common-words', 'sound-secrets', 'cheat-codes'].includes(learnSubTab)) {
                        setLearnSubTab('kids-essentials');
                      }
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      ['kids-essentials', 'common-words', 'sound-secrets', 'cheat-codes'].includes(learnSubTab)
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/60'
                    }`}
                  >
                    <span>📚 Words & Essentials</span>
                  </button>
                </div>

                {/* Sub-filter for Alphabet & Phonics */}
                {(learnSubTab === 'alphabet' || learnSubTab === 'phonics') && (
                  <div className="flex items-center justify-center gap-2 p-1 bg-amber-50 rounded-2xl border border-amber-300 max-w-fit mx-auto animate-in fade-in">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('alphabet');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'alphabet'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      🔤 Alphabet A–Z
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('phonics');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'phonics'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      ⭐ Phonics & Vowels
                    </button>
                  </div>
                )}

                {/* Sub-filter for Words & Essentials */}
                {['kids-essentials', 'common-words', 'sound-secrets', 'cheat-codes'].includes(learnSubTab) && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-amber-50 rounded-2xl border border-amber-300 max-w-fit mx-auto animate-in fade-in">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('kids-essentials');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'kids-essentials'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      🍎 Days & Numbers
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('common-words');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'common-words'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      💬 5,000 Words
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('sound-secrets');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'sound-secrets'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      👄 Sound Secrets
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setLearnSubTab('cheat-codes');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        learnSubTab === 'cheat-codes'
                          ? 'bg-amber-400 text-stone-900 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      ⚡ Cheat Codes
                    </button>
                  </div>
                )}
              </div>

              {/* Sub-view: Active Lesson */}
              {learnSubTab === 'lesson' && (
                <div className="space-y-6">
                  {/* Stage Selector & Learning Path */}
                  <StageOverview
                    currentStage={activeStage}
                    onSelectStage={handleSelectStage}
                    lessons={GRAMMAR_LESSONS}
                    activeLessonId={activeLesson.id}
                    onSelectLesson={handleSelectLesson}
                    completedLessons={completedLessons}
                  />

                  {/* Main Picture Grammar Lesson */}
                  <div className="pt-2">
                    <PictureGrammarLesson
                      key={activeLesson.id}
                      lesson={activeLesson}
                      onNextLesson={handleNextLesson}
                      onBackToDashboard={() => setActiveTab('home')}
                      onComplete={handleLessonCompleted}
                    />
                  </div>
                </div>
              )}

              {/* Sub-view: English Speech Practice (Listen & Speak) */}
              {learnSubTab === 'speech-practice' && (
                <EnglishSpeechPractice
                  onBack={() => {
                    soundEffects.playPop();
                    setLearnSubTab('lesson');
                  }}
                />
              )}

              {/* Sub-view: Kids Essentials */}
              {learnSubTab === 'kids-essentials' && (
                <KidsEssentialsExplorer
                  onBackToDashboard={() => {
                    setActiveTab('learn');
                    setLearnSubTab('lesson');
                  }}
                />
              )}

              {/* Sub-view: Common Daily Words Explorer */}
              {learnSubTab === 'common-words' && (
                <CommonWordsExplorer
                  onBackToDashboard={() => {
                    setActiveTab('learn');
                    setLearnSubTab('lesson');
                  }}
                />
              )}

              {/* Sub-view: English Sound Secrets */}
              {learnSubTab === 'sound-secrets' && (
                <EnglishSoundSecretsExplorer
                  onBackToDashboard={() => {
                    setActiveTab('learn');
                    setLearnSubTab('lesson');
                  }}
                />
              )}

              {/* Sub-view: Alphabet View */}
              {learnSubTab === 'alphabet' && <AlphabetView />}

              {/* Sub-view: Phonics View */}
              {learnSubTab === 'phonics' && <PhonicsView />}

              {/* Sub-view: Cheat Codes */}
              {learnSubTab === 'cheat-codes' && (
                <GrammarCheatCodeCard cheatCodes={GRAMMAR_CHEAT_CODES} />
              )}
            </div>
          )
        )}

        {/* ========================================================
            TAB 3: PLAY (INTERACTIVE LEARNING GAMES)
            ======================================================== */}
        {activeTab === 'play' && (
          <PlayGamesView
            onEarnStar={(count) => {
              completeLesson('game-play-' + Date.now(), count, count);
            }}
          />
        )}

        {/* ========================================================
            TAB 4: MY STARS (ACHIEVEMENTS & BADGES)
            ======================================================== */}
        {activeTab === 'stars' && (
          <MyStarsView
            starsCount={starsCount}
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={GRAMMAR_LESSONS.length}
            onContinueLearning={() => {
              setActiveTab('learn');
              setLearnSubTab('lesson');
            }}
            onPlayGames={() => setActiveTab('play')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-100/60 border-t-2 border-amber-200 py-6 mt-12 text-center text-xs text-stone-600 space-y-1">
        <p className="font-bold text-stone-800">
          {t(
            'English Kids Learning Academy • Designed for Children with Visuals, Audio & Games',
            'इंग्लिश किड्स लर्निंग अकादमी • चित्रों, आवाज़ों और खेलों के साथ सरल अंग्रेजी'
          )}
        </p>
        {shouldShowHindi() && (
          <p className="font-hindi text-stone-500">
            हिंदी भाषी बच्चों के लिए चित्रों, आवाज़ों और खेलों के साथ सरल अंग्रेजी
          </p>
        )}
      </footer>
    </div>
  );
}
