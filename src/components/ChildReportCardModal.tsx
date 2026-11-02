"use client";

import React, { useState, useMemo } from 'react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import {
  X,
  Trophy,
  Star,
  Award,
  Calendar,
  Flame,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Printer,
  Sparkles,
  Users,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Mic,
  RotateCcw,
} from 'lucide-react';

export function ChildReportCardModal() {
  const {
    activeProfile,
    isReportModalOpen,
    closeReportModal,
    openProfileModal,
    openEditModal,
    markWordMastered,
    isLoggedIn,
  } = useChildProfile();

  const { isEnglish, isHindi, t, shouldShowHindi } = useLanguage();
  const { speakEnglish, speakHindi } = useSpeech();
  const [activeTab, setActiveTab] = useState<'history' | 'focus' | 'badges' | 'certificate'>('history');

  const studentName = isLoggedIn
    ? activeProfile.name
    : isHindi
    ? 'नन्हा छात्र'
    : 'Young Explorer';

  // Calculate statistics
  const stats = useMemo(() => {
    const history = activeProfile.practiceHistory || [];
    const totalAttempts = history.length;
    const correctCount = history.filter((h) => h.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;
    const totalStars =
      (activeProfile.englishStars || 0) +
      (activeProfile.hindiStars || 0) +
      (activeProfile.mathsStars || 0) +
      (activeProfile.scienceStars || 0) +
      (activeProfile.gkStars || 0);

    return {
      totalAttempts,
      correctCount,
      accuracy,
      totalStars,
      masteredCount: activeProfile.masteredWords?.length || 0,
      focusCount: activeProfile.focusWords?.length || 0,
    };
  }, [activeProfile]);

  if (!isReportModalOpen) return null;

  const handlePrintCertificate = () => {
    soundEffects.playCelebration();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden">
        
        {/* ========================================================
            HEADER: Child Passport & Identity
            ======================================================== */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-6 text-white relative">
          <button
            onClick={() => {
              soundEffects.playPop();
              closeReportModal();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            title={t('Close', 'बंद करें')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10 sm:pr-0">
            {/* Child Info */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center text-4xl sm:text-5xl ring-4 ring-white/40">
                  {activeProfile.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 border-2 border-white rounded-full p-1 text-xs">
                  ⭐
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm">
                    {studentName}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-white/25 text-xs font-black text-white">
                    {activeProfile.grade || 'Junior'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-100 flex items-center gap-1.5 mt-0.5">
                  <span>{t(`Age: ${activeProfile.age} yrs`, `उम्र: ${activeProfile.age} वर्ष`)}</span>
                  <span>•</span>
                  <span>{t('Student Learning Passport', 'सीखने का रिकॉर्ड')}</span>
                </p>

                {/* Profile actions: Edit Name & Switch Kid */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      openEditModal();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-black text-white transition-colors border border-white/30"
                  >
                    <span>✏️</span>
                    <span>{t('Edit Name / Avatar', 'नाम / अवतार बदलें')}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      openProfileModal();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-semibold text-white/90 transition-colors border border-white/20"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{t('Switch Child', 'दूसरा बच्चा')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stars & Streak Pill */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/30 self-start sm:self-center">
              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-black text-yellow-200">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300 animate-spin-slow" />
                  <span>{stats.totalStars}</span>
                </div>
                <div className="text-[10px] uppercase font-black tracking-wider text-amber-100">
                  {t('Total Stars', 'कुल सितारे')}
                </div>
              </div>

              <div className="w-[1px] h-8 bg-white/30" />

              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-1 text-lg sm:text-xl font-black text-orange-200">
                  <Flame className="w-5 h-5 text-orange-300 fill-orange-400" />
                  <span>{activeProfile.streakDays || 1} {t('Days', 'दिन')}</span>
                </div>
                <div className="text-[10px] uppercase font-black tracking-wider text-amber-100">
                  {t('Daily Streak', 'लगातार अभ्यास')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            QUICK STATS SUMMARY TILES (All 5 Core Subjects)
            ======================================================== */}
        <div className="p-3 sm:p-4 bg-amber-50/60 border-b-2 border-amber-200 space-y-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <div className="bg-white p-2.5 rounded-2xl border border-purple-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-stone-500 block">Science 🔬</span>
              <div className="text-lg font-black text-purple-700 mt-0.5">
                ⭐ {activeProfile.scienceStars || 0}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-2xl border border-teal-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-stone-500 block">GK 🌍</span>
              <div className="text-lg font-black text-teal-700 mt-0.5">
                ⭐ {activeProfile.gkStars || 0}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-2xl border border-blue-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-stone-500 block">Maths 🔢</span>
              <div className="text-lg font-black text-blue-700 mt-0.5">
                ⭐ {activeProfile.mathsStars || 0}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-2xl border border-indigo-200 text-center shadow-2xs">
              <span className="text-[11px] font-bold text-stone-500 block">English 🇬🇧</span>
              <div className="text-lg font-black text-indigo-700 mt-0.5">
                ⭐ {activeProfile.englishStars || 0}
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-2xl border border-orange-200 text-center shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-stone-500 block">Hindi 🇮🇳</span>
              <div className="text-lg font-black text-orange-700 mt-0.5">
                ⭐ {activeProfile.hindiStars || 0}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2.5 rounded-2xl border border-amber-200 text-center shadow-2xs flex items-center justify-around">
              <span className="text-xs font-bold text-stone-500">{t('Overall Accuracy 🎯', 'सटीकता 🎯')}</span>
              <span className="text-base font-black text-emerald-600">{stats.accuracy}%</span>
            </div>
            <div className="bg-white p-2.5 rounded-2xl border border-amber-200 text-center shadow-2xs flex items-center justify-around">
              <span className="text-xs font-bold text-stone-500">{t('Mastered Words 🗣️', 'कंठस्थ शब्द 🗣️')}</span>
              <span className="text-base font-black text-amber-800">{stats.masteredCount} {t('words', 'शब्द')}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            NAVIGATION TABS
            ======================================================== */}
        <div className="flex items-center gap-1.5 px-4 pt-3 border-b-2 border-amber-100 overflow-x-auto scrollbar-none bg-white">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('history');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-amber-400 text-stone-950 shadow-sm border-t-2 border-x-2 border-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span>📜</span>
            <span>{t(`Practice History (${stats.totalAttempts})`, `अभ्यास का पूरा रिकॉर्ड (${stats.totalAttempts})`)}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('focus');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'focus'
                ? 'bg-amber-400 text-stone-950 shadow-sm border-t-2 border-x-2 border-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span>🎯</span>
            <span>{t(`Focus Words (${stats.focusCount})`, `कठिन शब्द (${stats.focusCount})`)}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('badges');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-amber-400 text-stone-950 shadow-sm border-t-2 border-x-2 border-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span>🏆</span>
            <span>{t('Badges & Awards', 'पदक व ट्रॉफ़ी')}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('certificate');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-2xl font-black text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-amber-400 text-stone-950 shadow-sm border-t-2 border-x-2 border-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span>🎓</span>
            <span>{t('Certificate', 'प्रशंसा पत्र')}</span>
          </button>
        </div>

        {/* ========================================================
            TAB CONTENT CONTAINER
            ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: PRACTICE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-stone-800">
                  {t(`Recent Words Practiced by ${studentName}:`, `${studentName} द्वारा हाल ही में बोले व पढ़े गए शब्द:`)}
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {t('Newest first', 'नवीनतम पहले')}
                </span>
              </div>

              {activeProfile.practiceHistory && activeProfile.practiceHistory.length > 0 ? (
                <div className="divide-y divide-amber-100 border-2 border-amber-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                  {activeProfile.practiceHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 sm:p-4 flex items-center justify-between gap-3 hover:bg-amber-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            item.isCorrect
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {item.isCorrect ? '✓' : '✗'}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-stone-900">
                              {item.word}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                                item.language === 'english'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {item.language === 'english' ? 'English' : 'हिंदी'}
                            </span>
                            <span className="text-xs text-stone-400 capitalize">
                              • {item.activityType}
                            </span>
                          </div>

                          {item.meaningHindi && (
                            <p className="text-xs text-stone-500 font-hindi mt-0.5">
                              अर्थ: {item.meaningHindi}
                            </p>
                          )}

                          {item.userSpoken && (
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              बच्चे ने बोला: &quot;{item.userSpoken}&quot;
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Audio replay button & score */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (item.language === 'english') {
                              speakEnglish(item.word);
                            } else {
                              speakHindi(item.word);
                            }
                          }}
                          className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                          title="उच्चारण सुनें"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <div className="text-right">
                          <span
                            className={`text-xs font-black ${
                              item.isCorrect ? 'text-emerald-600' : 'text-rose-500'
                            }`}
                          >
                            {item.score}%
                          </span>
                          <div className="text-[10px] text-stone-400">
                            {new Date(item.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-amber-50/50 rounded-2xl border-2 border-dashed border-amber-200 text-stone-500 space-y-2">
                  <div className="text-3xl">🎙️</div>
                  <p className="text-sm font-bold">अभी तक कोई अभ्यास रिकॉर्ड नहीं हुआ है।</p>
                  <p className="text-xs text-stone-400">
                    खेल खेलें या शब्द बोलकर सितारे कमाना शुरू करें!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FOCUS WORDS (TRICKY WORDS) */}
          {activeTab === 'focus' && (
            <div className="space-y-3">
              <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-300">
                <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>{t('Parent & Teacher Advice (Focus Words)', 'माता-पिता व शिक्षकों के लिए सुझाव (Focus Words)')}</span>
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {t(
                    `Below are words where ${studentName} needs a bit more practice. Listen to the audio and practice saying them together.`,
                    `नीचे वे शब्द हैं जिनमें ${studentName} को थोड़ा और अभ्यास चाहिए। आप साथ बैठकर इन शब्दों की ध्वनि सुनाएं और बुलवाएं।`
                  )}
                </p>
              </div>

              {activeProfile.focusWords && activeProfile.focusWords.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProfile.focusWords.map((fw) => (
                    <div
                      key={fw.word}
                      className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-stone-900">{fw.word}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              fw.language === 'english'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {fw.language === 'english' ? 'English' : 'हिंदी'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{fw.meaningHindi}</p>
                        <span className="text-[11px] text-rose-500 font-bold">
                          गलतियाँ/प्रयास: {fw.mistakeCount} बार
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            if (fw.language === 'english') {
                              speakEnglish(fw.word);
                            } else {
                              speakHindi(fw.word);
                            }
                          }}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>सुनें</span>
                        </button>

                        <button
                          onClick={() => {
                            markWordMastered(fw.word, fw.language);
                            soundEffects.playSuccess();
                          }}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-lg border border-emerald-300"
                        >
                          {t('Mastered ✓', 'कंठस्थ हो गया ✓')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-300 text-emerald-800 space-y-2">
                  <div className="text-3xl">🎉</div>
                  <p className="text-sm font-black">{t('Awesome! No tricky words remaining!', 'कमाल है! कोई भी कठिन शब्द बाकी नहीं है!')}</p>
                  <p className="text-xs text-emerald-600">
                    {t(
                      `${studentName} has mastered all the words with flying colors!`,
                      `${studentName} ने सभी शब्दों को बहुत अच्छे से सीखा है।`
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BADGES & TROPHY */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-stone-800">
                {t(`${studentName}'s Trophies & Badges:`, `${studentName} की ट्रॉफ़ी व पदक संग्रह:`)}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl border-2 border-amber-300 text-center space-y-1">
                  <div className="text-3xl">🌱</div>
                  <h4 className="text-sm font-black text-amber-950">पहला कदम</h4>
                  <p className="text-[11px] text-amber-800 font-hindi">सीखने की शुरुआत की</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded-full">
                    प्राप्त हुआ ✓
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl border-2 border-orange-300 text-center space-y-1">
                  <div className="text-3xl">🔤</div>
                  <h4 className="text-sm font-black text-orange-950">ध्वनि मास्टर</h4>
                  <p className="text-[11px] text-orange-800 font-hindi">Vowels & Phonics पारंगत</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded-full">
                    प्राप्त हुआ ✓
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-2 border-purple-300 text-center space-y-1">
                  <div className="text-3xl">✨</div>
                  <h4 className="text-sm font-black text-purple-950">शब्द उस्ताद</h4>
                  <p className="text-[11px] text-purple-800 font-hindi">20+ शब्द सही बोले</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded-full">
                    प्राप्त हुआ ✓
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl border-2 border-teal-300 text-center space-y-1">
                  <div className="text-3xl">🔥</div>
                  <h4 className="text-sm font-black text-teal-950">3 दिन की स्ट्रीक</h4>
                  <p className="text-[11px] text-teal-800 font-hindi">रोज़ाना नियमित पढ़ाई</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded-full">
                    प्राप्त हुआ ✓
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl border-2 border-stone-200 text-center space-y-1 opacity-70">
                  <div className="text-3xl">🌟</div>
                  <h4 className="text-sm font-black text-stone-800">100 सितारे क्लब</h4>
                  <p className="text-[11px] text-stone-500 font-hindi">100 कुल सितारे कमाएं</p>
                  <span className="inline-block px-2 py-0.5 bg-stone-200 text-stone-700 text-[10px] font-black rounded-full">
                    {stats.totalStars}/100 सितारे
                  </span>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl border-2 border-stone-200 text-center space-y-1 opacity-70">
                  <div className="text-3xl">👑</div>
                  <h4 className="text-sm font-black text-stone-800">व्याकरण सम्राट</h4>
                  <p className="text-[11px] text-stone-500 font-hindi">सभी 10 स्टेज पूरे करें</p>
                  <span className="inline-block px-2 py-0.5 bg-stone-200 text-stone-700 text-[10px] font-black rounded-full">
                    प्रगति पर
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATE OF ACHIEVEMENT */}
          {activeTab === 'certificate' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-100/60 p-3.5 rounded-2xl border border-amber-300">
                <span className="text-xs font-black text-amber-950">
                  🎓 बच्चे का प्रशंसा पत्र (Printable Certificate)
                </span>
                <button
                  onClick={handlePrintCertificate}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>प्रमाण पत्र प्रिंट करें (Print PDF)</span>
                </button>
              </div>

              {/* Printable Certificate Body */}
              <div
                id="printable-certificate"
                className="bg-[#FFFDF6] p-8 sm:p-12 rounded-3xl border-8 border-double border-amber-400 text-center shadow-lg relative overflow-hidden"
              >
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 text-2xl">⭐</div>
                <div className="absolute top-2 right-2 text-2xl">⭐</div>
                <div className="absolute bottom-2 left-2 text-2xl">⭐</div>
                <div className="absolute bottom-2 right-2 text-2xl">⭐</div>

                <div className="space-y-4 max-w-xl mx-auto">
                  <span className="px-4 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black tracking-widest uppercase border border-amber-300">
                    {t('Certificate of Achievement', 'प्रशंसा पत्र')}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
                    Kids English & Hindi Academy
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-hindi">
                    {t('This is proudly presented to the young explorer', 'यह प्रमाणित किया जाता है कि होनहार छात्र/छात्रा')}
                  </p>

                  <div className="py-2">
                    <div className="inline-block border-b-4 border-amber-400 pb-1 px-8 text-2xl sm:text-4xl font-black text-stone-900 font-serif">
                      {studentName}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-hindi leading-relaxed">
                    {t(
                      `for outstanding progress in English & Hindi learning tracks, earning ${stats.totalStars} Stars with ${stats.accuracy}% accuracy in vocabulary and speech!`,
                      `ने हिंदी एवं अंग्रेजी भाषा सीखने के पाठ्यक्रम में उत्कृष्ट प्रदर्शन करते हुए कुल ${stats.totalStars} सितारे अर्जित किए हैं और ${stats.accuracy}% सटीकता के साथ शब्दों व वाक्यों में निपुणता हासिल की है।`
                    )}
                  </p>

                  {/* Stamp & Signatures */}
                  <div className="pt-8 flex items-center justify-between border-t-2 border-stone-200 mt-6 text-xs text-stone-600">
                    <div>
                      <div className="font-bold">{new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-US')}</div>
                      <div className="text-[10px] text-stone-400">{t('Issue Date', 'जारी करने की तिथि')}</div>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex flex-col items-center justify-center text-[9px] font-black text-amber-900 shadow-inner">
                      <span>🏆</span>
                      <span>VERIFIED</span>
                    </div>

                    <div>
                      <div className="font-bold font-serif italic">Language Academy</div>
                      <div className="text-[10px] text-stone-400">{t('Academy Signature', 'अकादमी हस्ताक्षर')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t-2 border-amber-200 flex items-center justify-between text-xs text-stone-500">
          <span>{t('Student Name:', 'बच्चे का नाम:')} <strong className="text-stone-800">{studentName}</strong></span>
          <button
            onClick={() => {
              soundEffects.playPop();
              closeReportModal();
            }}
            className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-black rounded-xl cursor-pointer"
          >
            {t('Close', 'बंद करें')}
          </button>
        </div>

      </div>
    </div>
  );
}

