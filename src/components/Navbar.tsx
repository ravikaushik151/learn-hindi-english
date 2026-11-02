"use client";

import React from 'react';
import Link from 'next/link';
import { soundEffects } from '@/lib/sounds';
import { Sparkles, Star, KeyRound } from 'lucide-react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';

export type MainNavTab = 'home' | 'learn' | 'play' | 'stars';

interface NavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  starsCount: number;
}

export function Navbar({
  activeTab,
  onTabChange,
  starsCount,
}: NavbarProps) {
  const { activeProfile, openReportModal, openEditModal, openDeviceLoginModal } = useChildProfile();
  const { lang, setLang, isEnglish, isHindi, t } = useLanguage();
  const totalChildStars = (activeProfile.englishStars || 0) + (activeProfile.hindiStars || 0);

  const navItems: { id: MainNavTab; label: string; hindi: string; emoji: string }[] = [
    { id: 'home', label: 'Home', hindi: 'होम', emoji: '🏠' },
    { id: 'learn', label: 'Learn', hindi: 'सीखें', emoji: '🎨' },
    { id: 'play', label: 'Play', hindi: 'खेलें', emoji: '🎮' },
    { id: 'stars', label: 'My Stars', hindi: 'सितारे', emoji: '⭐' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-3 border-amber-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Brand */}
            <div
              onClick={() => {
                soundEffects.playPop();
                onTabChange('home');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-2xl sm:text-3xl shadow-md transform group-hover:rotate-6 transition-transform">
                🎒
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
                    {isHindi ? 'हिंदी पाठशाला 🇮🇳' : 'English Kids 🇬🇧'}
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-amber-200 text-stone-900 rounded-md">
                    Age 6+
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-stone-500">
                  {isHindi ? 'वर्णमाला, बारहखड़ी, शब्द-पठन व खेल' : 'Learn playfully with pictures & voice'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 bg-amber-50/80 p-1.5 rounded-2xl border-2 border-amber-200">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEffects.playPop();
                      onTabChange(item.id);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-black text-sm transition-all active:scale-95 ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'text-stone-700 hover:bg-white/80 hover:text-stone-900'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-extrabold">{isEnglish ? item.label : item.hindi}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Language Switcher Toggle + Child Profile Pill + Stars */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              
              {/* Learning Subject Switcher (English vs Hindi Learning Academy) */}
              <div className="flex items-center bg-amber-100/80 p-1 rounded-2xl border-2 border-amber-300 shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setLang('en');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    isEnglish
                      ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-500 scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Learn English (A-Z, Phonics & Grammar)"
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setLang('hi');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    isHindi
                      ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-500 scale-105'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="हिंदी सीखें (वर्णमाला, बारहखड़ी व शब्द-पठन)"
                >
                  <span>🇮🇳</span>
                  <span>हिंदी</span>
                </button>
              </div>

              {/* Child Profile Pill (Click to Change Name & Avatar) */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  openEditModal();
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white hover:bg-amber-50 border-2 border-amber-300 rounded-2xl shadow-xs transition-all active:scale-95 group"
                title={t('Click to Change Name & Avatar', 'बच्चे का नाम बदलें')}
              >
                <span className="text-base sm:text-lg group-hover:scale-110 transition-transform">
                  {activeProfile.avatar}
                </span>
                <span className="text-xs font-black text-stone-900 max-w-[70px] sm:max-w-[100px] truncate">
                  {activeProfile.name}
                </span>
                <span className="text-[10px] text-amber-700 opacity-60 group-hover:opacity-100">
                  ✏️
                </span>
              </button>

              {/* Total Stars Counter (Click to Open Report Card & Certificate) */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  openReportModal();
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-400 hover:bg-amber-500 rounded-2xl text-stone-950 font-black text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                title={t('View Learning Report Card & Certificate', 'प्रगति पत्र व प्रमाण पत्र देखें')}
              >
                <span className="text-base">⭐</span>
                <span>{totalChildStars}</span>
              </button>

              {/* Device Sync Button (Open profile on another browser/device) */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  openDeviceLoginModal();
                }}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 rounded-2xl text-amber-900 font-black text-xs shadow-2xs transition-all active:scale-95"
                title={t('Open my account on another browser / device', 'दूसरे ब्राउज़र या डिवाइस में खाता खोलें')}
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('Device Sync', 'डिवाइस सिंक')}</span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly for Kids) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-lg px-2 py-1.5">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEffects.playPop();
                  onTabChange(item.id);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-black shadow-sm ring-1 ring-amber-300'
                    : 'text-stone-600 hover:bg-amber-50'
                }`}
              >
                <span className="text-xl leading-none">{item.emoji}</span>
                <span className="text-[11px] font-extrabold mt-0.5">
                  {isEnglish ? item.label : item.hindi}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
