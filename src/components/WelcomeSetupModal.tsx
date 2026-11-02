"use client";

import React, { useState } from 'react';
import { useChildProfile, AVATAR_LIST, generateKidCode } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { Sparkles, ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';

export function WelcomeSetupModal() {
  const { isWelcomeModalOpen, closeWelcomeModal, updateActiveProfile, openDeviceLoginModal } = useChildProfile();
  const { isEnglish, isHindi, t } = useLanguage();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🦁');
  const [age, setAge] = useState<number>(6);
  const [grade, setGrade] = useState<string>('Class 1');
  const [pin, setPin] = useState('1234');

  if (!isWelcomeModalOpen) return null;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || t('Little Explorer', 'लिटिल स्टार');
    updateActiveProfile({
      name: finalName,
      avatar,
      age,
      grade,
      pin: pin.trim() || '1234',
      kidCode: generateKidCode(finalName),
    });
    closeWelcomeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col text-center">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 p-6 text-white space-y-2">
          <div className="text-5xl animate-bounce-gentle select-none">🎒</div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t('Hello Friend! Welcome! 👋', 'नमस्ते दोस्त! आपका स्वागत है! 👋')}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-amber-100">
            {t(
              'Create your profile to start learning English & Hindi through fun games!',
              'खेल-खेल में इंग्लिश और हिंदी सीखने के लिए अपनी प्रोफाइल बनाएं'
            )}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleStart} className="p-6 space-y-5 text-left">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              {t("1. Enter Child's Name:", "1. बच्चे का नाम लिखें:")}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("e.g. Aarav, Leo, Kabir, Riya...", "जैसे: आरव, अनन्य, कबीर, रिया...")}
              className="w-full px-4 py-3 rounded-2xl border-3 border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200 text-lg font-black text-stone-900 shadow-inner"
            />
          </div>

          {/* Avatar Field */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-2">
              {t('2. Choose Favorite Avatar:', '2. पसंदीदा अवतार चुनें:')}
            </label>
            <div className="grid grid-cols-7 gap-2">
              {AVATAR_LIST.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setAvatar(av);
                  }}
                  className={`text-2xl sm:text-3xl p-2 rounded-2xl transition-all ${
                    avatar === av
                      ? 'bg-amber-300 ring-4 ring-amber-500 scale-110 shadow-md'
                      : 'bg-stone-100 hover:bg-amber-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Age Selection */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              {t('3. Select Age:', '3. उम्र चुनें:')}
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setAge(a);
                  }}
                  className={`px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
                    age === a
                      ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {a} {t('yrs', 'वर्ष')}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Grade / School Class Selection */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              {t('4. Select School Class:', '4. स्कूल की कक्षा चुनें:')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'Nursery', label: 'Nursery / LKG', ageText: '3-4 yrs', defAge: 4 },
                { id: 'Class 1', label: 'UKG / Class 1', ageText: '5-6 yrs', defAge: 6 },
                { id: 'Class 2', label: 'Class 2', ageText: '6-7 yrs', defAge: 7 },
                { id: 'Class 3', label: 'Class 3', ageText: '7-8 yrs', defAge: 8 },
                { id: 'Class 4', label: 'Class 4 & 5', ageText: '9-11+ yrs', defAge: 10 },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setGrade(g.id);
                    setAge(g.defAge);
                  }}
                  className={`p-2 rounded-xl text-left font-black transition-all border ${
                    grade === g.id
                      ? 'bg-amber-400 border-amber-500 text-stone-950 shadow-sm scale-102 ring-2 ring-amber-300'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <p className="text-xs leading-tight">{g.label}</p>
                  <p className="text-[10px] font-bold text-stone-500 mt-0.5">{g.ageText}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 5. PIN Security */}
          <div className="bg-amber-50/80 p-3 rounded-2xl border-2 border-amber-200">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('5. Secret 4-Digit PIN (Default: 1234):', '5. गुप्त 4-अंकों का पिन (डिफ़ॉल्ट: 1234):')}</span>
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {t('PIN Protected', 'पिन सुरक्षित')}
              </span>
            </div>
            <input
              type="text"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              className="w-full px-3 py-2 bg-white rounded-xl border-2 border-amber-300 font-mono text-center text-base font-black text-stone-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-[10px] text-stone-500 font-semibold mt-1">
              {t(
                '💡 Ensures no other child with your name can access your profile on other devices!',
                '💡 ताकि दूसरे ब्राउज़र या फोन में कोई और आपके नाम से आपकी प्रोफाइल न खोल सके!'
              )}
            </p>
          </div>

          {/* Start button */}
          <div className="pt-1 space-y-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{t('Start Learning Adventure 🚀', 'सीखना शुरू करें 🚀')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Already registered on another browser / phone? */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                closeWelcomeModal();
                openDeviceLoginModal();
              }}
              className="w-full py-2.5 text-xs font-black text-amber-900 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200/80 rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('Already created a profile? Open with Kid Code / PIN 🔑', 'पहले से खाता है? किड कोड / पिन से खोलें 🔑')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

