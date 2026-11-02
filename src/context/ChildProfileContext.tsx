"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChildProfile, PracticeHistoryRecord, FocusWordItem } from '@/types';
import { soundEffects } from '@/lib/sounds';

interface ChildProfileContextType {
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  switchProfile: (profileId: string) => void;
  createProfile: (name: string, age: number, avatar: string, grade: string) => ChildProfile;
  updateActiveProfile: (updates: Partial<ChildProfile>) => void;
  updateProfile: (profileId: string, updates: Partial<ChildProfile>) => void;
  deleteProfile: (profileId: string) => void;
  recordActivity: (record: {
    word: string;
    meaningHindi?: string;
    language: 'english' | 'hindi';
    activityType: 'speech' | 'quiz' | 'builder' | 'reading' | 'rhyme';
    score: number;
    isCorrect: boolean;
    userSpoken?: string;
    attempts: number;
  }) => void;
  addStars: (count: number, language: 'english' | 'hindi') => void;
  markLessonCompleted: (lessonId: string, starsEarned?: number) => void;
  markWordMastered: (word: string, language: 'english' | 'hindi') => void;
  recordMistake: (word: string, meaningHindi: string, language: 'english' | 'hindi') => void;
  
  // Modals
  isReportModalOpen: boolean;
  openReportModal: () => void;
  closeReportModal: () => void;
  
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;

  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  isWelcomeModalOpen: boolean;
  closeWelcomeModal: () => void;

  isDeviceLoginModalOpen: boolean;
  openDeviceLoginModal: () => void;
  closeDeviceLoginModal: () => void;
  loginWithKidCodeOrPin: (identifier: string, pin?: string) => Promise<{ success: boolean; error?: string; message?: string; profile?: ChildProfile }>;
}

const STORAGE_KEY_PROFILES = 'kids_learning_profiles_v2';
const STORAGE_KEY_ACTIVE_ID = 'kids_learning_active_id_v2';
const STORAGE_KEY_SETUP_DONE = 'kids_learning_setup_completed_v2';

export const AVATAR_LIST = ['🦁', '🐰', '🐯', '🚀', '🐼', '⭐', '🦄', '🐬', '🦊', '🦉', '🐻', '🦖', '🦋', '🐶'];

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function generateKidCode(name: string): string {
  const clean = (name || 'KID').replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4) || 'KID';
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${clean}-${rand}`;
}

async function syncProfileToServer(profile: ChildProfile) {
  try {
    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile }),
    });
  } catch (err) {
    // Non-blocking sync error
  }
}

// Clean initial default profile (zero fake history)
const DEFAULT_CLEAN_PROFILE: ChildProfile = {
  id: 'child-default-1',
  name: 'नन्हा छात्र (My Child)',
  age: 6,
  avatar: '🦁',
  grade: 'Class 1',
  createdAt: Date.now(),
  englishStars: 0,
  hindiStars: 0,
  streakDays: 1,
  lastActiveDate: getTodayString(),
  completedLessons: [],
  masteredWords: [],
  practiceHistory: [],
  focusWords: [],
  badges: ['badge-starter'],
  kidCode: 'KID-1001',
  pin: '1234',
};

const ChildProfileContext = createContext<ChildProfileContextType | undefined>(undefined);

export function ChildProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([DEFAULT_CLEAN_PROFILE]);
  const [activeProfileId, setActiveProfileId] = useState<string>(DEFAULT_CLEAN_PROFILE.id);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isDeviceLoginModalOpen, setIsDeviceLoginModalOpen] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedProfiles = localStorage.getItem(STORAGE_KEY_PROFILES);
      const savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      const isSetupDone = localStorage.getItem(STORAGE_KEY_SETUP_DONE);

      if (savedProfiles) {
        const parsed = JSON.parse(savedProfiles) as ChildProfile[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((p) => ({
            ...p,
            kidCode: p.kidCode || generateKidCode(p.name),
            pin: p.pin || '1234',
          }));
          setProfiles(normalized);
          if (savedActiveId && normalized.some((p) => p.id === savedActiveId)) {
            setActiveProfileId(savedActiveId);
          } else {
            setActiveProfileId(normalized[0].id);
          }
          syncProfileToServer(normalized[0]);
        }
      } else if (!isSetupDone) {
        // First-time visitor: prompt with Welcome Setup Modal!
        setIsWelcomeModalOpen(true);
      }
    } catch (e) {
      console.warn('Failed to load child profiles from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever profiles or active id change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeProfileId);
    } catch (e) {
      console.warn('Failed to save child profiles:', e);
    }
  }, [profiles, activeProfileId, isLoaded]);

  // Current active profile
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEFAULT_CLEAN_PROFILE;

  // Streak update on daily visit
  useEffect(() => {
    if (!isLoaded || !activeProfile) return;
    const today = getTodayString();
    if (activeProfile.lastActiveDate !== today) {
      const lastDate = new Date(activeProfile.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      let newStreak = activeProfile.streakDays || 1;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      setProfiles((prev) =>
        prev.map((p) =>
          p.id === activeProfile.id
            ? { ...p, streakDays: newStreak, lastActiveDate: today }
            : p
        )
      );
    }
  }, [activeProfile, isLoaded]);

  const switchProfile = useCallback((profileId: string) => {
    if (profiles.some((p) => p.id === profileId)) {
      setActiveProfileId(profileId);
      soundEffects.playPop();
    }
  }, [profiles]);

  const updateProfile = useCallback((profileId: string, updates: Partial<ChildProfile>) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, ...updates } : p))
    );
  }, []);

  const updateActiveProfile = useCallback((updates: Partial<ChildProfile>) => {
    setProfiles((prev) => {
      const next = prev.map((p) => (p.id === activeProfileId ? { ...p, ...updates } : p));
      const updatedActive = next.find((p) => p.id === activeProfileId);
      if (updatedActive) {
        syncProfileToServer(updatedActive);
      }
      return next;
    });
    try {
      localStorage.setItem(STORAGE_KEY_SETUP_DONE, 'true');
    } catch (e) {}
    soundEffects.playSuccess();
  }, [activeProfileId]);

  const createProfile = useCallback((name: string, age: number, avatar: string, grade: string): ChildProfile => {
    const finalName = name.trim() || 'नया छात्र';
    const newProfile: ChildProfile = {
      id: `child-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: finalName,
      age: age || 6,
      avatar: avatar || AVATAR_LIST[0],
      grade: grade || 'Class 1',
      createdAt: Date.now(),
      englishStars: 0,
      hindiStars: 0,
      streakDays: 1,
      lastActiveDate: getTodayString(),
      completedLessons: [],
      masteredWords: [],
      practiceHistory: [],
      focusWords: [],
      badges: ['badge-starter'],
      kidCode: generateKidCode(finalName),
      pin: '1234',
    };

    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    syncProfileToServer(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY_SETUP_DONE, 'true');
    } catch (e) {}
    soundEffects.playCelebration();
    return newProfile;
  }, []);

  const loginWithKidCodeOrPin = useCallback(
    async (identifier: string, pin?: string) => {
      try {
        const isCode = identifier.includes('-') || (identifier.length >= 6 && /\d/.test(identifier));
        const url = isCode
          ? `/api/profiles?kidCode=${encodeURIComponent(identifier)}&pin=${encodeURIComponent(pin || '')}`
          : `/api/profiles?name=${encodeURIComponent(identifier)}&pin=${encodeURIComponent(pin || '')}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok || !data.success || !data.profile) {
          return {
            success: false,
            error: data.error || 'NOT_FOUND',
            message: data.message,
          };
        }

        const fetchedProfile: ChildProfile = data.profile;
        setProfiles((prev) => {
          const existingIdx = prev.findIndex(
            (p) => p.id === fetchedProfile.id || (p.kidCode && p.kidCode === fetchedProfile.kidCode)
          );
          if (existingIdx >= 0) {
            return prev.map((p, idx) => (idx === existingIdx ? fetchedProfile : p));
          }
          return [...prev, fetchedProfile];
        });

        setActiveProfileId(fetchedProfile.id);
        try {
          localStorage.setItem(STORAGE_KEY_SETUP_DONE, 'true');
        } catch (e) {}
        return {
          success: true,
          profile: fetchedProfile,
        };
      } catch (err: any) {
        return {
          success: false,
          error: 'NETWORK_ERROR',
          message: err?.message || 'Network error',
        };
      }
    },
    []
  );

  const deleteProfile = useCallback((profileId: string) => {
    setProfiles((prev) => {
      const filtered = prev.filter((p) => p.id !== profileId);
      if (filtered.length === 0) {
        return [DEFAULT_CLEAN_PROFILE];
      }
      return filtered;
    });
    setActiveProfileId((prevId) => {
      if (prevId === profileId) {
        const remaining = profiles.filter((p) => p.id !== profileId);
        return remaining[0]?.id || DEFAULT_CLEAN_PROFILE.id;
      }
      return prevId;
    });
  }, [profiles]);

  const addStars = useCallback((count: number, language: 'english' | 'hindi') => {
    if (count <= 0) return;
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;
        if (language === 'english') {
          return { ...p, englishStars: (p.englishStars || 0) + count };
        } else {
          return { ...p, hindiStars: (p.hindiStars || 0) + count };
        }
      })
    );
  }, [activeProfileId]);

  const markLessonCompleted = useCallback((lessonId: string, starsEarned: number = 5) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;
        const alreadyCompleted = p.completedLessons.includes(lessonId);
        const updatedCompleted = alreadyCompleted
          ? p.completedLessons
          : [...p.completedLessons, lessonId];
        const starsToAdd = alreadyCompleted ? 1 : starsEarned;
        return {
          ...p,
          completedLessons: updatedCompleted,
          englishStars: (p.englishStars || 0) + starsToAdd,
        };
      })
    );
  }, [activeProfileId]);

  const markWordMastered = useCallback((word: string, language: 'english' | 'hindi') => {
    const cleanWord = word.trim();
    if (!cleanWord) return;

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;
        const alreadyMastered = p.masteredWords.includes(cleanWord);
        const updatedFocusWords = p.focusWords.filter(
          (fw) => fw.word.toLowerCase() !== cleanWord.toLowerCase()
        );
        return {
          ...p,
          masteredWords: alreadyMastered ? p.masteredWords : [...p.masteredWords, cleanWord],
          focusWords: updatedFocusWords,
        };
      })
    );
  }, [activeProfileId]);

  const recordMistake = useCallback((word: string, meaningHindi: string, language: 'english' | 'hindi') => {
    const cleanWord = word.trim();
    if (!cleanWord) return;

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;
        const existingIdx = p.focusWords.findIndex(
          (fw) => fw.word.toLowerCase() === cleanWord.toLowerCase()
        );

        let updatedFocusWords: FocusWordItem[];
        if (existingIdx >= 0) {
          updatedFocusWords = p.focusWords.map((fw, idx) =>
            idx === existingIdx
              ? { ...fw, mistakeCount: fw.mistakeCount + 1, lastAttemptAt: Date.now() }
              : fw
          );
        } else {
          updatedFocusWords = [
            {
              word: cleanWord,
              meaningHindi: meaningHindi || '',
              language,
              mistakeCount: 1,
              lastAttemptAt: Date.now(),
            },
            ...p.focusWords,
          ].slice(0, 25);
        }

        return {
          ...p,
          focusWords: updatedFocusWords,
        };
      })
    );
  }, [activeProfileId]);

  const recordActivity = useCallback((record: {
    word: string;
    meaningHindi?: string;
    language: 'english' | 'hindi';
    activityType: 'speech' | 'quiz' | 'builder' | 'reading' | 'rhyme';
    score: number;
    isCorrect: boolean;
    userSpoken?: string;
    attempts: number;
  }) => {
    const historyItem: PracticeHistoryRecord = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      word: record.word,
      meaningHindi: record.meaningHindi,
      language: record.language,
      activityType: record.activityType,
      score: record.score,
      isCorrect: record.isCorrect,
      timestamp: Date.now(),
      userSpoken: record.userSpoken,
      attempts: record.attempts,
    };

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;

        const updatedHistory = [historyItem, ...p.practiceHistory].slice(0, 60);

        let updatedEnglishStars = p.englishStars || 0;
        let updatedHindiStars = p.hindiStars || 0;
        let updatedMastered = p.masteredWords || [];
        let updatedFocusWords = p.focusWords || [];

        if (record.isCorrect) {
          const starsEarned = Math.max(1, Math.round(record.score / 25));
          if (record.language === 'english') {
            updatedEnglishStars += starsEarned;
          } else {
            updatedHindiStars += starsEarned;
          }

          if (!updatedMastered.includes(record.word)) {
            updatedMastered = [...updatedMastered, record.word];
          }

          updatedFocusWords = updatedFocusWords.filter(
            (fw) => fw.word.toLowerCase() !== record.word.toLowerCase()
          );
        } else {
          const existingIdx = updatedFocusWords.findIndex(
            (fw) => fw.word.toLowerCase() === record.word.toLowerCase()
          );
          if (existingIdx >= 0) {
            updatedFocusWords = updatedFocusWords.map((fw, idx) =>
              idx === existingIdx
                ? { ...fw, mistakeCount: fw.mistakeCount + 1, lastAttemptAt: Date.now() }
                : fw
            );
          } else {
            updatedFocusWords = [
              {
                word: record.word,
                meaningHindi: record.meaningHindi || '',
                language: record.language,
                mistakeCount: 1,
                lastAttemptAt: Date.now(),
              },
              ...updatedFocusWords,
            ].slice(0, 25);
          }
        }

        return {
          ...p,
          practiceHistory: updatedHistory,
          englishStars: updatedEnglishStars,
          hindiStars: updatedHindiStars,
          masteredWords: updatedMastered,
          focusWords: updatedFocusWords,
        };
      })
    );
  }, [activeProfileId]);

  return (
    <ChildProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        switchProfile,
        createProfile,
        updateActiveProfile,
        updateProfile,
        deleteProfile,
        recordActivity,
        addStars,
        markLessonCompleted,
        markWordMastered,
        recordMistake,
        isReportModalOpen,
        openReportModal: () => setIsReportModalOpen(true),
        closeReportModal: () => setIsReportModalOpen(false),
        isEditModalOpen,
        openEditModal: () => setIsEditModalOpen(true),
        closeEditModal: () => setIsEditModalOpen(false),
        isProfileModalOpen,
        openProfileModal: () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
        isWelcomeModalOpen,
        closeWelcomeModal: () => setIsWelcomeModalOpen(false),
        isDeviceLoginModalOpen,
        openDeviceLoginModal: () => setIsDeviceLoginModalOpen(true),
        closeDeviceLoginModal: () => setIsDeviceLoginModalOpen(false),
        loginWithKidCodeOrPin,
      }}
    >
      {children}
    </ChildProfileContext.Provider>
  );
}

export function useChildProfile() {
  const context = useContext(ChildProfileContext);
  if (!context) {
    throw new Error('useChildProfile must be used within a ChildProfileProvider');
  }
  return context;
}
