"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { ChildProfile, PracticeHistoryRecord, FocusWordItem } from '@/types';
import { soundEffects } from '@/lib/sounds';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ChildProfileContextType {
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  switchProfile: (profileId: string) => void;
  createProfile: (name: string, age: number, avatar: string, grade: string, pin?: string) => ChildProfile;
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
  addStars: (count: number, subject?: 'english' | 'hindi' | 'maths' | 'science' | 'gk') => void;
  getSubjectStars: (subject: 'english' | 'hindi' | 'maths' | 'science' | 'gk') => number;
  totalStars: number;
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
  isLoggedIn: boolean;
  logout: () => void;
  isLoaded: boolean;
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

export function isGuestProfileName(name?: string): boolean {
  if (!name) return true;
  const clean = name.trim().toLowerCase();
  return (
    clean === 'young explorer' ||
    clean === 'little explorer' ||
    clean === 'नन्हा छात्र' ||
    clean.includes('my child') ||
    clean.includes('नन्हा छात्र')
  );
}

// Generate clean initial profile with unique id
function createInitialProfile(): ChildProfile {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return {
    id: 'guest-profile-default',
    name: 'Young Explorer',
    age: 6,
    avatar: '🦁',
    grade: 'Class 1',
    createdAt: Date.now(),
    englishStars: 0,
    hindiStars: 0,
    mathsStars: 0,
    scienceStars: 0,
    gkStars: 0,
    streakDays: 1,
    lastActiveDate: getTodayString(),
    completedLessons: [],
    masteredWords: [],
    practiceHistory: [],
    focusWords: [],
    badges: ['badge-starter'],
    kidCode: `KID-${rand}`,
    pin: '1234',
  };
}

const DEFAULT_CLEAN_PROFILE: ChildProfile = {
  id: 'guest-profile-default',
  name: 'Young Explorer',
  age: 6,
  avatar: '🦁',
  grade: 'Class 1',
  createdAt: 1793600000000,
  englishStars: 0,
  hindiStars: 0,
  mathsStars: 0,
  scienceStars: 0,
  gkStars: 0,
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

function getSavedProfiles(): ChildProfile[] {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
  }
  return [DEFAULT_CLEAN_PROFILE];
}

function getSavedActiveId(): string {
  if (typeof window !== 'undefined') {
    try {
      const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (savedId) return savedId;
    } catch (e) {}
  }
  return DEFAULT_CLEAN_PROFILE.id;
}

const ChildProfileContext = createContext<ChildProfileContextType | undefined>(undefined);

export function ChildProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ChildProfile[]>(getSavedProfiles);
  const [activeProfileId, setActiveProfileId] = useState<string>(getSavedActiveId);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [isDeviceLoginModalOpen, setIsDeviceLoginModalOpen] = useState(false);

  // Load from LocalStorage synchronously before paint
  useIsomorphicLayoutEffect(() => {
    try {
      const savedProfiles = localStorage.getItem(STORAGE_KEY_PROFILES);
      const savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      const isSetupDone = localStorage.getItem(STORAGE_KEY_SETUP_DONE);
      const legacyStars = localStorage.getItem('english_kids_stars');
      const legacyLessons = localStorage.getItem('english_kids_completed_lessons');

      if (savedProfiles) {
        const parsed = JSON.parse(savedProfiles) as ChildProfile[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((p) => {
            const isGuest = isGuestProfileName(p.name) || (p.id && p.id.startsWith('guest-'));
            let cleanId = p.id;
            if (isGuest) {
              cleanId = 'guest-profile-default';
            } else if (p.id === 'child-default-1') {
              cleanId = p.kidCode ? `child-${p.kidCode.toLowerCase()}` : `child-${Date.now()}`;
            }

            return {
              ...p,
              id: cleanId,
              name: isGuest ? 'Young Explorer' : p.name,
              kidCode: p.kidCode || generateKidCode(p.name),
              pin: p.pin || '1234',
            };
          });

          // Restore legacy earned stars if profile stars are 0
          if (legacyStars) {
            const parsedStars = parseInt(legacyStars, 10);
            if (!isNaN(parsedStars) && parsedStars > 0) {
              normalized.forEach((p) => {
                if ((p.englishStars || 0) === 0) {
                  p.englishStars = parsedStars;
                }
              });
            }
          }
          if (legacyLessons) {
            try {
              const parsedLessons = JSON.parse(legacyLessons);
              if (Array.isArray(parsedLessons) && parsedLessons.length > 0) {
                normalized.forEach((p) => {
                  if ((p.completedLessons || []).length === 0) {
                    p.completedLessons = parsedLessons;
                  }
                });
              }
            } catch (e) {}
          }

          setProfiles(normalized);
          const targetId = savedActiveId && normalized.some((p) => p.id === savedActiveId)
            ? savedActiveId
            : normalized[0].id;
          setActiveProfileId(targetId);

          // Fetch latest stats from server DB ONLY for logged-in kids (never for guests)
          const current = normalized.find((p) => p.id === targetId) || normalized[0];
          if (current && current.name && !isGuestProfileName(current.name) && !current.id.startsWith('guest-')) {
            const query = current.kidCode
              ? `kidCode=${encodeURIComponent(current.kidCode)}&pin=${encodeURIComponent(current.pin || '1234')}`
              : `name=${encodeURIComponent(current.name)}&pin=${encodeURIComponent(current.pin || '1234')}`;
            fetch(`/api/profiles?${query}`)
              .then((r) => r.json())
              .then((data) => {
                if (data.success && data.profile) {
                  setProfiles((prev) =>
                    prev.map((p) =>
                      p.id === data.profile.id || (p.kidCode && p.kidCode === data.profile.kidCode)
                        ? {
                            ...p,
                            ...data.profile,
                            englishStars: Math.max(p.englishStars || 0, data.profile.englishStars || 0),
                            hindiStars: Math.max(p.hindiStars || 0, data.profile.hindiStars || 0),
                            mathsStars: Math.max(p.mathsStars || 0, data.profile.mathsStars || 0),
                            scienceStars: Math.max(p.scienceStars || 0, data.profile.scienceStars || 0),
                            gkStars: Math.max(p.gkStars || 0, data.profile.gkStars || 0),
                          }
                        : p
                    )
                  );
                }
              })
              .catch(() => {});
          }
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

  // Current active profile
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEFAULT_CLEAN_PROFILE;

  // Save to LocalStorage whenever profiles or active id change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeProfileId);
    } catch (e) {
      console.warn('Failed to save child profiles:', e);
    }

    // Auto-sync active profile to server DB in background
    if (activeProfile && activeProfile.name && !isGuestProfileName(activeProfile.name)) {
      const timer = setTimeout(() => {
        syncProfileToServer(activeProfile);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [profiles, activeProfileId, isLoaded, activeProfile]);

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

  // Real-time cross-browser / multi-window sync when tab or window is focused
  useEffect(() => {
    if (!isLoaded || !activeProfile || isGuestProfileName(activeProfile.name) || activeProfile.id.startsWith('guest-')) {
      return;
    }

    const syncOnFocus = () => {
      const query = activeProfile.kidCode
        ? `kidCode=${encodeURIComponent(activeProfile.kidCode)}&pin=${encodeURIComponent(activeProfile.pin || '1234')}`
        : `name=${encodeURIComponent(activeProfile.name)}&pin=${encodeURIComponent(activeProfile.pin || '1234')}`;

      fetch(`/api/profiles?${query}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.profile) {
            setProfiles((prev) =>
              prev.map((p) => {
                if (p.id === data.profile.id || (p.kidCode && p.kidCode === data.profile.kidCode)) {
                  return {
                    ...p,
                    ...data.profile,
                    englishStars: Math.max(p.englishStars || 0, data.profile.englishStars || 0),
                    hindiStars: Math.max(p.hindiStars || 0, data.profile.hindiStars || 0),
                    mathsStars: Math.max(p.mathsStars || 0, data.profile.mathsStars || 0),
                    scienceStars: Math.max(p.scienceStars || 0, data.profile.scienceStars || 0),
                    gkStars: Math.max(p.gkStars || 0, data.profile.gkStars || 0),
                  };
                }
                return p;
              })
            );
          }
        })
        .catch(() => {});
    };

    window.addEventListener('focus', syncOnFocus);
    return () => window.removeEventListener('focus', syncOnFocus);
  }, [activeProfile?.id, activeProfile?.kidCode, activeProfile?.pin, isLoaded]);

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

  const createProfile = useCallback((name: string, age: number, avatar: string, grade: string, pin?: string): ChildProfile => {
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
      pin: pin ? pin.trim() || '1234' : '1234',
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
          let nextProfiles: ChildProfile[];
          if (existingIdx >= 0) {
            nextProfiles = prev.map((p, idx) => (idx === existingIdx ? fetchedProfile : p));
          } else {
            const nonGuests = prev.filter((p) => !isGuestProfileName(p.name) && !p.id.startsWith('guest-'));
            nextProfiles = [...nonGuests, fetchedProfile];
          }
          try {
            localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(nextProfiles));
            localStorage.setItem(STORAGE_KEY_ACTIVE_ID, fetchedProfile.id);
            localStorage.setItem(STORAGE_KEY_SETUP_DONE, 'true');
          } catch (e) {}
          return nextProfiles;
        });

        setActiveProfileId(fetchedProfile.id);
        try {
          localStorage.setItem(STORAGE_KEY_ACTIVE_ID, fetchedProfile.id);
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

  const logout = useCallback(() => {
    soundEffects.playPop();
    const guestProfile = createInitialProfile();
    setProfiles([guestProfile]);
    setActiveProfileId(guestProfile.id);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify([guestProfile]));
      localStorage.setItem(STORAGE_KEY_ACTIVE_ID, guestProfile.id);
      localStorage.removeItem(STORAGE_KEY_SETUP_DONE);
    } catch (e) {}
  }, []);

  const isLoggedIn = Boolean(
    activeProfile &&
    activeProfile.name &&
    !isGuestProfileName(activeProfile.name) &&
    !activeProfile.id.startsWith('guest-')
  );

  const addStars = useCallback(
    (count: number, subject: 'english' | 'hindi' | 'maths' | 'science' | 'gk' = 'english') => {
      if (count <= 0) return;
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id !== activeProfileId) return p;
          const updated = { ...p };
          if (subject === 'science') {
            updated.scienceStars = (p.scienceStars || 0) + count;
          } else if (subject === 'gk') {
            updated.gkStars = (p.gkStars || 0) + count;
          } else if (subject === 'maths') {
            updated.mathsStars = (p.mathsStars || 0) + count;
          } else if (subject === 'hindi') {
            updated.hindiStars = (p.hindiStars || 0) + count;
          } else {
            updated.englishStars = (p.englishStars || 0) + count;
          }
          if (!isGuestProfileName(updated.name) && !updated.id.startsWith('guest-')) {
            syncProfileToServer(updated);
          }
          return updated;
        })
      );
    },
    [activeProfileId]
  );

  const getSubjectStars = useCallback(
    (subject: 'english' | 'hindi' | 'maths' | 'science' | 'gk'): number => {
      if (!activeProfile) return 0;
      switch (subject) {
        case 'science':
          return activeProfile.scienceStars || 0;
        case 'gk':
          return activeProfile.gkStars || 0;
        case 'maths':
          return activeProfile.mathsStars || 0;
        case 'hindi':
          return activeProfile.hindiStars || 0;
        case 'english':
        default:
          return activeProfile.englishStars || 0;
      }
    },
    [activeProfile]
  );

  const totalStars =
    (activeProfile.englishStars || 0) +
    (activeProfile.hindiStars || 0) +
    (activeProfile.mathsStars || 0) +
    (activeProfile.scienceStars || 0) +
    (activeProfile.gkStars || 0);

  const markLessonCompleted = useCallback((lessonId: string, starsEarned: number = 5) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeProfileId) return p;
        const alreadyCompleted = p.completedLessons.includes(lessonId);
        const updatedCompleted = alreadyCompleted
          ? p.completedLessons
          : [...p.completedLessons, lessonId];
        const starsToAdd = alreadyCompleted ? 1 : starsEarned;
        const updated = {
          ...p,
          completedLessons: updatedCompleted,
          englishStars: (p.englishStars || 0) + starsToAdd,
        };
        if (!isGuestProfileName(updated.name) && !updated.id.startsWith('guest-')) {
          syncProfileToServer(updated);
        }
        return updated;
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
        getSubjectStars,
        totalStars,
        markLessonCompleted,
        markWordMastered,
        recordMistake,
        isReportModalOpen,
        openReportModal: () => setIsReportModalOpen(true),
        closeReportModal: () => setIsReportModalOpen(false),
        isEditModalOpen,
        openEditModal: () => setIsEditModalOpen(true),
        closeEditModal: () => setIsEditModalOpen(false),
        isProfileModalOpen: false,
        openProfileModal: () => setIsDeviceLoginModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
        isWelcomeModalOpen,
        closeWelcomeModal: () => setIsWelcomeModalOpen(false),
        isDeviceLoginModalOpen,
        openDeviceLoginModal: () => setIsDeviceLoginModalOpen(true),
        closeDeviceLoginModal: () => setIsDeviceLoginModalOpen(false),
        loginWithKidCodeOrPin,
        isLoggedIn,
        logout,
        isLoaded,
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
