"use client";

import React, { useState } from 'react';
import { useChildProfile, AVATAR_LIST } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  ArrowRight,
  UserPlus,
  ShieldCheck,
  User,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';

interface StudentLoginGateProps {
  onContinueAsGuest?: () => void;
}

export function StudentLoginGate({ onContinueAsGuest }: StudentLoginGateProps) {
  const { loginWithKidCodeOrPin, createProfile } = useChildProfile();
  const { t, isHindi } = useLanguage();

  const [nameOrCode, setNameOrCode] = useState('');
  const [pinInput, setPinInput] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New Student Registration form toggle & state
  const [isRegistering, setIsRegistering] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🦁');
  const [newGrade, setNewGrade] = useState('Class 1');
  const [newAge, setNewAge] = useState(6);
  const [newPin, setNewPin] = useState('1234');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ident = nameOrCode.trim();
    if (!ident) {
      setErrorMessage(t('Please enter child name or code.', 'कृपया बच्चे का नाम या किड कोड दर्ज करें।'));
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    const pin = pinInput.trim() || '1234';

    const res = await loginWithKidCodeOrPin(ident, pin);
    setLoading(false);

    if (res.success && res.profile) {
      soundEffects.playCelebration();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setSuccessMessage(
        t(
          `🎉 Welcome, ${res.profile.name}! Loading ${res.profile.grade} questions...`,
          `🎉 स्वागत है, ${res.profile.name}! आपकी ${res.profile.grade} के प्रश्न खुल रहे हैं...`
        )
      );
    } else {
      soundEffects.playTryAgain();
      setErrorMessage(
        t(
          res.message || 'No profile found with this Name/PIN. Check spelling or register below.',
          'इस नाम या पिन से कोई प्रोफ़ाइल नहीं मिली। कृपया नाम की वर्तनी जांचें या नीचे नया प्रोफ़ाइल बनाएं।'
        )
      );
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = newName.trim();
    if (!finalName) {
      setErrorMessage(t('Please enter child name.', 'कृपया बच्चे का नाम लिखें।'));
      return;
    }

    soundEffects.playCelebration();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    createProfile(finalName, newAge, newAvatar, newGrade, newPin);
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-pink-50 rounded-3xl p-5 sm:p-8 border-3 border-amber-300 shadow-xl max-w-xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/90 rounded-full text-xs font-black text-amber-950 uppercase tracking-wider border border-amber-300">
          <GraduationCap className="w-4 h-4 text-amber-800" />
          <span>{t('Student Classroom Login', 'छात्र कक्षा लॉगिन')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t('Enter Student Name & PIN 🔑', 'बच्चे का नाम और पिन दर्ज करें 🔑')}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-stone-600">
          {t(
            'Questions & curriculum will load automatically based on your child’s class & age!',
            'बच्चे की कक्षा और उम्र के अनुसार प्रश्न और विषय अपने-आप लोड होंगे!'
          )}
        </p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-5 p-3.5 rounded-2xl bg-emerald-500 text-white font-black text-center text-sm shadow-md animate-bounce">
          {successMessage}
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 font-bold text-xs text-center">
          ⚠️ {errorMessage}
        </div>
      )}

      {!isRegistering ? (
        /* Private Login Form */
        <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-amber-300 shadow-sm">
          {/* Child Name */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("1. Child's Name or Kid Code:", '१. बच्चे का नाम या किड कोड:')}</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={nameOrCode}
              onChange={(e) => setNameOrCode(e.target.value)}
              placeholder={t('e.g. Jeevika, Rai, Aarav...', 'उदा. जीविका, राय, आरव...')}
              className="w-full px-4 py-3 bg-amber-50/50 rounded-xl border-2 border-amber-300 font-black text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-3 focus:ring-amber-300 transition-all"
            />
          </div>

          {/* 4-Digit Secret PIN */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('2. Secret 4-Digit PIN:', '२. ४-अंकों का गुप्त पिन:')}</span>
              </label>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                {t('Default PIN: 1234', 'डिफ़ॉल्ट पिन: 1234')}
              </span>
            </div>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={4}
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="1234"
                className="w-full px-4 py-3 bg-amber-50/50 rounded-xl border-2 border-amber-300 font-mono text-center text-xl font-black tracking-widest text-stone-900 focus:outline-none focus:ring-3 focus:ring-amber-300 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1.5 cursor-pointer"
                title={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 font-medium mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-amber-600 shrink-0" />
              <span>
                {t(
                  'Same name students are matched by their secret PIN.',
                  'समान नाम वाले छात्रों की पहचान उनके गुप्त पिन से होती है।'
                )}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !nameOrCode.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? t('Opening Classroom...', 'कक्षा खोल रहे हैं...') : t('Open My Class Questions 🚀', 'मेरी कक्षा के प्रश्न खोलें 🚀')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Alternate Options */}
          <div className="pt-2 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsRegistering(true);
                setErrorMessage(null);
              }}
              className="text-xs font-black text-amber-900 hover:text-amber-950 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('+ New Student? Create Profile', '+ नया छात्र? यहाँ प्रोफ़ाइल बनाएं')}</span>
            </button>

            {onContinueAsGuest && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  onContinueAsGuest();
                }}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
              >
                {t('Preview as Guest ➔', 'अतिथि के रूप में देखें ➔')}
              </button>
            )}
          </div>
        </form>
      ) : (
        /* New Student Registration Form with Class & Age Selection */
        <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-amber-300 shadow-sm animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <h3 className="font-black text-base text-stone-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-600" />
              <span>{t('Register New Student', 'नया छात्र पंजीकरण')}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsRegistering(false);
              }}
              className="text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              ✕ {t('Back to Login', 'लॉगिन पर वापस')}
            </button>
          </div>

          {/* Child Name */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
              {t("1. Child's Name:", '१. बच्चे का नाम:')}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('e.g. Jeevika, Aarav, Kabir...', 'उदा. जीविका, आरव, कबीर...')}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 font-bold text-stone-900"
            />
          </div>

          {/* School Class */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
              {t('2. Select School Class (Determines Questions):', '२. स्कूल की कक्षा चुनें (इसी अनुसार प्रश्न दिखेंगे):')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'Nursery', label: 'Nursery / LKG', ageText: '3-4 yrs', defAge: 4, emoji: '🌱' },
                { id: 'Class 1', label: 'UKG / Class 1', ageText: '5-6 yrs', defAge: 6, emoji: '🎈' },
                { id: 'Class 2', label: 'Class 2', ageText: '6-7 yrs', defAge: 7, emoji: '📚' },
                { id: 'Class 3', label: 'Class 3', ageText: '7-8 yrs', defAge: 8, emoji: '🎯' },
                { id: 'Class 4', label: 'Class 4 & 5', ageText: '9-11+ yrs', defAge: 10, emoji: '🚀' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setNewGrade(c.id);
                    setNewAge(c.defAge);
                  }}
                  className={`p-2.5 rounded-xl text-left font-black transition-all border cursor-pointer ${
                    newGrade === c.id
                      ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-xs ring-2 ring-amber-300 scale-102'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <span className="text-base">{c.emoji}</span>
                  <p className="text-xs leading-tight font-black mt-1">{c.label}</p>
                  <p className="text-[10px] font-bold text-stone-500">{c.ageText}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
              {t('3. Choose Fun Avatar:', '३. मनपसंद अवतार चुनें:')}
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_LIST.slice(0, 10).map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setNewAvatar(av);
                  }}
                  className={`text-2xl p-2 rounded-xl transition-all cursor-pointer ${
                    newAvatar === av
                      ? 'bg-amber-300 ring-3 ring-amber-500 scale-110 shadow-xs'
                      : 'bg-stone-100 hover:bg-amber-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* 4-digit PIN */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
              {t('4. Set 4-Digit Security PIN (Default: 1234):', '४. ४-अंकों का सुरक्षा पिन (डिफ़ॉल्ट: 1234):')}
            </label>
            <input
              type="text"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 font-mono text-center text-lg font-black text-stone-900"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('Save Profile & Open My Class 🚀', 'प्रोफ़ाइल सहेजें और कक्षा खोलें 🚀')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsRegistering(false);
              }}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              {t('Cancel', 'रद्द करें')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
