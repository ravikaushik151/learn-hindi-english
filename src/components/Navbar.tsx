"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { soundEffects } from '@/lib/sounds';
import { KeyRound, LogOut, ChevronDown, BookOpen, FlaskConical, Globe2, Calculator, Languages } from 'lucide-react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';

export type MainNavTab = 'home' | 'learn' | 'maths' | 'play' | 'stars';
export type SubjectId = 'all' | 'english' | 'hindi' | 'maths' | 'science' | 'gk';

export const ALL_NAV_SUBJECTS: {
  id: SubjectId;
  labelEng: string;
  labelHin: string;
  emoji: string;
  descEng: string;
  descHin: string;
}[] = [
  { id: 'all', labelEng: 'All Subjects', labelHin: 'सभी विषय (5)', emoji: '📚', descEng: 'Complete class syllabus & questions', descHin: 'सभी विषयों का सम्पूर्ण पाठ्यक्रम' },
  { id: 'science', labelEng: 'Science / EVS', labelHin: 'विज्ञान (Science)', emoji: '🔬', descEng: 'Plants, Human Body & Space', descHin: 'पौधे, मानव शरीर, हवा व पानी' },
  { id: 'gk', labelEng: 'General Knowledge (GK)', labelHin: 'सामान्य ज्ञान (GK)', emoji: '🌍', descEng: 'India, Oceans, Missions & Facts', descHin: 'भारत, महासागर, अंतरिक्ष व ज्ञान' },
  { id: 'maths', labelEng: 'Mathematics', labelHin: 'गणित (Maths)', emoji: '🔢', descEng: 'Numbers, Addition, Tables & Shapes', descHin: 'संख्याएं, जोड़, पहाड़े व आकृतियां' },
  { id: 'english', labelEng: 'English Academy', labelHin: 'अंग्रेजी (English)', emoji: '🇬🇧', descEng: 'A-Z, Phonics & 10-Stage Grammar', descHin: 'ए-ज़ेड, ध्वनि विज्ञान व व्याकरण' },
  { id: 'hindi', labelEng: 'Hindi Pathshala', labelHin: 'हिंदी (Hindi)', emoji: '🇮🇳', descEng: 'वर्णमाला, बारहखड़ी व शब्द-पठन', descHin: 'स्वर, व्यंजन, मात्राएं व खेल' },
];

interface NavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  starsCount: number;
  activeSubject?: SubjectId;
  onSelectSubject?: (subject: SubjectId) => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  starsCount,
  activeSubject = 'all',
  onSelectSubject,
}: NavbarProps) {
  const { activeProfile, openReportModal, openEditModal, openDeviceLoginModal, isLoggedIn, logout, isLoaded, totalStars, getSubjectStars } = useChildProfile();
  const { lang, setLang, isEnglish, isHindi, t } = useLanguage();
  const displayStars = typeof starsCount === 'number' ? starsCount : totalStars;

  // Dropdown states
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
        setIsSubjectDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: MainNavTab; label: string; hindi: string; emoji: string }[] = [
    { id: 'home', label: 'Home', hindi: 'होम', emoji: '🏠' },
    { id: 'learn', label: 'Learn', hindi: 'सीखें', emoji: '🎨' },
    { id: 'play', label: 'Play', hindi: 'खेलें', emoji: '🎮' },
    { id: 'stars', label: 'My Stars', hindi: 'सितारे', emoji: '⭐' },
  ];

  const currentSubjectObj = ALL_NAV_SUBJECTS.find((s) => s.id === activeSubject) || ALL_NAV_SUBJECTS[0];

  const handlePickSubject = (subjId: SubjectId) => {
    soundEffects.playPop();
    setIsSubjectDropdownOpen(false);
    if (onSelectSubject) {
      onSelectSubject(subjId);
    }
    if (subjId === 'maths') {
      onTabChange('maths');
    } else {
      onTabChange('home');
    }
    if (subjId === 'english') {
      setLang('en');
    } else if (subjId === 'hindi') {
      setLang('hi');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-xs transition-all w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Logo & Brand */}
            <div
              onClick={() => {
                soundEffects.playPop();
                onTabChange('home');
              }}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group select-none shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-xl sm:text-2xl shadow-xs transform group-hover:rotate-6 transition-transform">
                🎒
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <h1 className="text-sm sm:text-lg font-black text-stone-900 tracking-tight whitespace-nowrap">
                    {isHindi ? 'हिंदी पाठशाला 🇮🇳' : 'English Kids 🇬🇧'}
                  </h1>
                  <span className="hidden xs:inline-block px-1.5 py-0.5 text-[9px] font-black uppercase bg-amber-200 text-stone-900 rounded-md">
                    Age 6+
                  </span>
                </div>
                <p className="hidden 2xl:block text-[11px] font-semibold text-stone-500">
                  {isHindi ? 'कक्षा-वार विषय, प्रश्न व खेल' : 'Class-wise subjects, questions & quiz'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs with Subject Dropdown */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-amber-50/80 p-0.5 xl:p-1 rounded-2xl border-2 border-amber-200">
              {/* 1. Home Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange('home');
                }}
                className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                }`}
              >
                <span className="text-sm xl:text-base">🏠</span>
                <span className="font-extrabold text-[11px] xl:text-xs">{isEnglish ? 'Home' : 'होम'}</span>
              </button>

              {/* 2. SUBJECTS DROPDOWN (Requested by User) */}
              <div className="relative" ref={subjectDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
                  }}
                  className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer ${
                    isSubjectDropdownOpen || (activeTab === 'home' && activeSubject !== 'all')
                      ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-300 scale-102'
                      : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                  }`}
                  title={isHindi ? 'विषय चुनें' : 'Choose Subject'}
                >
                  <span className="text-sm xl:text-base">{currentSubjectObj.emoji}</span>
                  <span className="font-extrabold text-[11px] xl:text-xs">
                    {isHindi ? (activeSubject === 'all' ? 'विषय' : currentSubjectObj.labelHin) : (activeSubject === 'all' ? 'Subjects' : currentSubjectObj.labelEng)}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSubjectDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isSubjectDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-amber-300 p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-2.5 py-1 text-[10px] font-black uppercase text-amber-900/70 tracking-wider border-b border-amber-100 mb-1 flex items-center justify-between">
                      <span>{isHindi ? 'शैक्षणिक विषय (Subjects)' : 'Academic Subjects'}</span>
                      <span className="bg-amber-100 px-1.5 py-0.5 rounded text-[9px] font-bold text-amber-800">5 Core</span>
                    </div>

                    <div className="space-y-1">
                      {ALL_NAV_SUBJECTS.map((s) => {
                        const isSelected = activeSubject === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handlePickSubject(s.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                                : 'hover:bg-amber-50 text-stone-800'
                            }`}
                          >
                            <span className="text-xl shrink-0 p-1 bg-white/60 rounded-lg">{s.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-black truncate flex items-center justify-between">
                                <span>{isHindi ? s.labelHin : s.labelEng}</span>
                                {s.id !== 'all' && (
                                  <span className="text-[10px] font-bold text-amber-950 bg-amber-200/90 px-1.5 py-0.5 rounded-md ml-1.5 shrink-0 border border-amber-300">
                                    ⭐ {getSubjectStars(s.id as any)}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-stone-500 truncate">
                                {isHindi ? s.descHin : s.descEng}
                              </div>
                            </div>
                            {isSelected && (
                              <span className="text-xs font-black text-stone-900 shrink-0">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Learn Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange('learn');
                }}
                className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer ${
                  activeTab === 'learn'
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                }`}
              >
                <span className="text-sm xl:text-base">🎨</span>
                <span className="font-extrabold text-[11px] xl:text-xs">{isEnglish ? 'Learn' : 'सीखें'}</span>
              </button>

              {/* 4. Play Games Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange('play');
                }}
                className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer ${
                  activeTab === 'play'
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                }`}
              >
                <span className="text-sm xl:text-base">🎮</span>
                <span className="font-extrabold text-[11px] xl:text-xs">{isEnglish ? 'Play' : 'खेलें'}</span>
              </button>

              {/* 5. Stars Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange('stars');
                }}
                className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer ${
                  activeTab === 'stars'
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-300 scale-102'
                    : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                }`}
              >
                <span className="text-sm xl:text-base">⭐</span>
                <span className="font-extrabold text-[11px] xl:text-xs">{isEnglish ? 'My Stars' : 'सितारे'}</span>
              </button>
            </nav>

            {/* Right Controls: Language Dropdown + Child Profile Pill + Stars + Login/Logout */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              
              {/* Language / Academy Switcher Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setIsLangDropdownOpen(!isLangDropdownOpen);
                  }}
                  className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-xs font-black text-stone-900 shadow-2xs transition-all active:scale-95 cursor-pointer"
                  title="Switch Language Academy"
                >
                  <span className="text-xs">{isEnglish ? '🇬🇧' : '🇮🇳'}</span>
                  <span className="hidden sm:inline text-xs">{isEnglish ? 'English' : 'हिंदी'}</span>
                  <ChevronDown className={`w-3 h-3 text-stone-700 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border-2 border-amber-300 p-1.5 z-50 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setLang('en');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl font-bold text-xs text-left transition-all cursor-pointer ${
                        isEnglish ? 'bg-amber-400 text-stone-950 font-black shadow-xs' : 'hover:bg-amber-50 text-stone-700'
                      }`}
                    >
                      <span className="text-base">🇬🇧</span>
                      <div>
                        <div>English Academy</div>
                        <div className="text-[9px] text-stone-500 font-normal">A-Z, Phonics & Grammar</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setLang('hi');
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl font-bold text-xs text-left transition-all mt-1 cursor-pointer ${
                        isHindi ? 'bg-amber-400 text-stone-950 font-black shadow-xs' : 'hover:bg-amber-50 text-stone-700'
                      }`}
                    >
                      <span className="text-base">🇮🇳</span>
                      <div>
                        <div>हिंदी पाठशाला</div>
                        <div className="text-[9px] text-stone-500 font-normal font-hindi">वर्णमाला, बारहखड़ी व खेल</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Child Profile, Stars & Auth Buttons */}
              {!isLoaded ? (
                <div className="flex items-center gap-1 animate-pulse">
                  <div className="h-7 w-16 sm:w-20 bg-amber-100/70 border border-amber-200 rounded-xl" />
                  <div className="h-7 w-8 sm:w-10 bg-amber-300/60 rounded-xl" />
                  <div className="h-7 w-10 sm:w-12 bg-amber-100/70 border border-amber-200 rounded-xl" />
                </div>
              ) : isLoggedIn ? (
                <>
                  {/* Child Profile Pill (Click to Change Name & Avatar) */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      openEditModal();
                    }}
                    className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white hover:bg-amber-50 border border-amber-300 rounded-xl shadow-2xs transition-all active:scale-95 group shrink-0 cursor-pointer"
                    title={t('Click to Change Name & Avatar', 'बच्चे का नाम बदलें')}
                  >
                    <span className="text-sm sm:text-base group-hover:scale-110 transition-transform">
                      {activeProfile.avatar}
                    </span>
                    <span className="text-xs font-black text-stone-900 max-w-[65px] sm:max-w-[90px] truncate">
                      {activeProfile.name}
                    </span>
                    <span className="text-[10px] text-amber-700 opacity-60 group-hover:opacity-100 hidden sm:inline">
                      ✏️
                    </span>
                  </button>

                  {/* Total Stars Counter (Click to Open Report Card & Certificate) */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      openReportModal();
                    }}
                    className="flex items-center gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-amber-400 hover:bg-amber-500 rounded-xl text-stone-950 font-black text-xs sm:text-sm shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer"
                    title={t('View Learning Report Card & Certificate', 'प्रगति पत्र व प्रमाण पत्र देखें')}
                  >
                    <span className="text-xs sm:text-sm">⭐</span>
                    <span>{displayStars}</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      logout();
                    }}
                    className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 border bg-stone-50 hover:bg-rose-50 border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-700 shadow-2xs shrink-0 cursor-pointer"
                    title={t(`Logged in as ${activeProfile.name}. Click to logout.`, `${activeProfile.name} से बाहर निकलें (लॉगआउट)`)}
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="hidden md:inline text-[11px] font-black">{t('Logout', 'लॉगआउट')}</span>
                  </button>
                </>
              ) : (
                /* When NOT logged in: Show clean, single Login button with zero student leakage */
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    openDeviceLoginModal();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer"
                  title={t('Login to your profile with Name & PIN', 'नाम और पिन से लॉगिन करें')}
                >
                  <KeyRound className="w-3.5 h-3.5 text-stone-900 shrink-0" />
                  <span>{t('Login 🔑', 'लॉगिन 🔑')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Bottom Navigation Bar (Thumb Friendly for Kids) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-xl px-2 py-1.5">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {/* Home */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onTabChange('home');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'home'
                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl leading-none">🏠</span>
            <span className="text-[11px] font-extrabold mt-0.5">{isEnglish ? 'Home' : 'होम'}</span>
          </button>

          {/* Subjects (Opens subject picker in home curriculum) */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onTabChange('home');
              const el = document.getElementById('curriculum-subjects-selector');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'home' && activeSubject !== 'all'
                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl leading-none">📚</span>
            <span className="text-[11px] font-extrabold mt-0.5">{isEnglish ? 'Subjects' : 'विषय'}</span>
          </button>

          {/* Learn */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onTabChange('learn');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'learn'
                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl leading-none">🎨</span>
            <span className="text-[11px] font-extrabold mt-0.5">{isEnglish ? 'Learn' : 'सीखें'}</span>
          </button>

          {/* Play */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onTabChange('play');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'play'
                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl leading-none">🎮</span>
            <span className="text-[11px] font-extrabold mt-0.5">{isEnglish ? 'Play' : 'खेलें'}</span>
          </button>

          {/* Stars */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onTabChange('stars');
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'stars'
                ? 'bg-amber-400 text-stone-950 font-black shadow-xs ring-1 ring-amber-300'
                : 'text-stone-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl leading-none">⭐</span>
            <span className="text-[11px] font-extrabold mt-0.5">{isEnglish ? 'Stars' : 'सितारे'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
