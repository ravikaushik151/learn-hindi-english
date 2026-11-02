"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageMode, LanguageSettings } from '@/types';

export type ActiveLanguage = 'en' | 'hi';

interface LanguageContextType {
  lang: ActiveLanguage;
  setLang: (lang: ActiveLanguage) => void;
  toggleLanguage: () => void;
  isEnglish: boolean;
  isHindi: boolean;
  t: (en: string, hi: string) => string;
  mode: LanguageMode;
  boldEnglish: boolean;
  setMode: (mode: LanguageMode) => void;
  setBoldEnglish: (bold: boolean) => void;
  toggleBoldEnglish: () => void;
  shouldShowHindi: (isDifficult?: boolean) => boolean;
  getEnglishClass: (baseWeight?: 'normal' | 'medium' | 'semibold' | 'bold') => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'kids_learning_active_language_v1';
const STORAGE_KEY_MODE = 'english_kid_language_mode';
const STORAGE_KEY_BOLD = 'english_kid_bold_english';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<ActiveLanguage>('en');
  const [mode, setModeState] = useState<LanguageMode>('english-only');
  const [boldEnglish, setBoldEnglishState] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as ActiveLanguage;
      if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
        setLangState(savedLang);
        setModeState(savedLang === 'en' ? 'english-only' : 'english-hindi');
      } else {
        const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as LanguageMode;
        if (savedMode) {
          setModeState(savedMode);
          setLangState(savedMode === 'english-only' ? 'en' : 'hi');
        }
      }

      const savedBold = localStorage.getItem(STORAGE_KEY_BOLD);
      if (savedBold !== null) {
        setBoldEnglishState(savedBold === 'true');
      }
    } catch (e) {
      // localStorage not accessible
    }
  }, []);

  const setLang = useCallback((newLang: ActiveLanguage) => {
    setLangState(newLang);
    const newMode: LanguageMode = newLang === 'en' ? 'english-only' : 'english-hindi';
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLang);
      localStorage.setItem(STORAGE_KEY_MODE, newMode);
    } catch (e) {}
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
  }, [lang, setLang]);

  const setMode = useCallback((newMode: LanguageMode) => {
    setModeState(newMode);
    const associatedLang: ActiveLanguage = newMode === 'english-only' ? 'en' : 'hi';
    setLangState(associatedLang);
    try {
      localStorage.setItem(STORAGE_KEY_MODE, newMode);
      localStorage.setItem(STORAGE_KEY_LANG, associatedLang);
    } catch (e) {}
  }, []);

  const setBoldEnglish = useCallback((bold: boolean) => {
    setBoldEnglishState(bold);
    try {
      localStorage.setItem(STORAGE_KEY_BOLD, String(bold));
    } catch (e) {}
  }, []);

  const toggleBoldEnglish = useCallback(() => {
    setBoldEnglish(!boldEnglish);
  }, [boldEnglish, setBoldEnglish]);

  // If language is English ('en'): STRICTLY HIDE HINDI
  // If language is Hindi ('hi'): SHOW HINDI
  const shouldShowHindi = useCallback((isDifficult?: boolean): boolean => {
    if (lang === 'en' || mode === 'english-only') return false;
    if (lang === 'hi') return true;
    if (mode === 'english-hindi') return true;
    if (mode === 'hindi-needed') return Boolean(isDifficult);
    return true;
  }, [lang, mode]);

  // Translation helper: returns English or Hindi text based on active language
  const t = useCallback((en: string, hi: string): string => {
    return lang === 'en' ? en : hi;
  }, [lang]);

  const getEnglishClass = useCallback((baseWeight: 'normal' | 'medium' | 'semibold' | 'bold' = 'medium'): string => {
    if (boldEnglish) {
      return 'font-bold tracking-tight';
    }
    switch (baseWeight) {
      case 'bold': return 'font-bold';
      case 'semibold': return 'font-semibold';
      case 'normal': return 'font-normal';
      default: return 'font-medium';
    }
  }, [boldEnglish]);

  const isEnglish = lang === 'en';
  const isHindi = lang === 'hi';

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        isEnglish,
        isHindi,
        t,
        mode,
        boldEnglish,
        setMode,
        setBoldEnglish,
        toggleBoldEnglish,
        shouldShowHindi,
        getEnglishClass,
      }}
    >
      <div
        data-language-mode={lang === 'en' ? 'english-only' : 'english-hindi'}
        data-active-lang={lang}
        data-bold-english={boldEnglish ? 'true' : 'false'}
        className={`contents ${boldEnglish ? 'english-bold-active' : ''}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
