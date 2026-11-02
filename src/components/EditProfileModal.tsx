"use client";

import React, { useState, useEffect } from 'react';
import { useChildProfile, AVATAR_LIST, isGuestProfileName } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { X, Check, Sparkles, User, Smile, KeyRound, Copy, CheckCheck, ShieldCheck } from 'lucide-react';

const GRADE_OPTIONS = ['LKG / Nursery', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4'];

export function EditProfileModal() {
  const {
    activeProfile,
    isEditModalOpen,
    closeEditModal,
    updateActiveProfile,
    openDeviceLoginModal,
  } = useChildProfile();
  const { isEnglish, isHindi, t } = useLanguage();

  const [name, setName] = useState(activeProfile?.name || '');
  const [avatar, setAvatar] = useState(activeProfile?.avatar || '🦁');
  const [age, setAge] = useState<number>(activeProfile?.age || 6);
  const [grade, setGrade] = useState(activeProfile?.grade || 'Class 1');
  const [pin, setPin] = useState(activeProfile?.pin || '1234');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (activeProfile) {
      setName(isGuestProfileName(activeProfile.name) ? '' : activeProfile.name);
      setAvatar(activeProfile.avatar);
      setAge(activeProfile.age);
      setGrade(activeProfile.grade);
      setPin(activeProfile.pin || '1234');
    }
  }, [activeProfile, isEditModalOpen]);

  if (!isEditModalOpen) return null;

  const handleCopyCode = () => {
    if (activeProfile?.kidCode) {
      navigator.clipboard.writeText(activeProfile.kidCode);
      setCopiedCode(true);
      soundEffects.playPop();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateActiveProfile({
      name: name.trim(),
      avatar,
      age,
      grade,
      pin: pin.trim() || '1234',
    });

    closeEditModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 p-4 sm:p-5 text-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{avatar}</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-stone-950">
                {t("Edit Child's Profile ✏️", 'बच्चे का नाम बदलें ✏️')}
              </h2>
              <p className="text-xs text-amber-950 font-semibold font-hindi">
                {t('Pick your favorite name and avatar', 'अपनी पसंद का नाम और अवतार चुनें')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              closeEditModal();
            }}
            className="p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
              {t("Child's Name:", "बच्चे का नाम:")}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("e.g. Aarav, Leo, Kabir, Riya...", "उदा. आरव, कबीर, रिया...")}
              className="w-full px-4 py-3 rounded-2xl border-3 border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200 text-base font-black text-stone-900 shadow-inner"
            />
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1.5">
              {t('Choose Cartoon Avatar:', 'पसंदीदा कार्टून अवतार चुनें:')}
            </label>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
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
                      ? 'bg-amber-300 ring-3 ring-amber-500 scale-110 shadow-md'
                      : 'bg-stone-100 hover:bg-amber-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Age & Grade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
                {t('Age (Years):', 'उम्र (वर्ष):')}
              </label>
              <select
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-amber-300 text-sm font-bold text-stone-900 bg-white"
              >
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                  <option key={a} value={a}>
                    {a} {t('Years', 'वर्ष')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
                {t('Class / Grade:', 'कक्षा (Grade):')}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-amber-300 text-sm font-bold text-stone-900 bg-white"
              >
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Unique Kid Passport Code & 4-Digit PIN Security Card */}
          <div className="bg-amber-50/90 p-3.5 rounded-2xl border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                  {t('Multi-Browser Security & Passport', 'मल्टी-ब्राउज़र सुरक्षा व किड कोड')}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {t('Protected', 'सुरक्षित')}
              </span>
            </div>

            {/* Kid Code Display */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                {t('Unique Kid Passport Code:', 'आपका विशिष्ट किड पासपोर्ट कोड:')}
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white px-3 py-2 rounded-xl border-2 border-amber-300 font-mono text-sm font-black text-amber-900 select-all tracking-wider text-center">
                  {activeProfile?.kidCode || 'RAI-7429'}
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-2 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs font-black rounded-xl transition-all flex items-center gap-1 shrink-0 active:scale-95"
                  title="Copy code"
                >
                  {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? t('Copied!', 'कॉपी हुआ!') : t('Copy', 'कॉपी')}</span>
                </button>
              </div>
            </div>

            {/* 4-Digit Secret PIN */}
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                {t('Secret 4-Digit PIN (Default: 1234):', '4-अंकों का गुप्त पिन (डिफ़ॉल्ट: 1234):')}
              </label>
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="1234"
                className="w-full px-3 py-2 bg-white rounded-xl border-2 border-amber-300 font-mono text-sm font-black text-stone-900 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <p className="text-[10px] text-stone-500 font-semibold mt-1">
                {t(
                  '💡 Even if someone else has your name (like Rai), they cannot open your profile without your 4-digit PIN!',
                  '💡 अगर किसी और का नाम भी "राय" है, तो भी वह आपके 4-अंकों के गुप्त पिन के बिना आपकी प्रोफाइल नहीं खोल सकता!'
                )}
              </p>
            </div>
          </div>

          {/* Open on Other Device Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                closeEditModal();
                openDeviceLoginModal();
              }}
              className="w-full py-2.5 px-3 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-800" />
              <span>{t('Open Existing Profile on This Device 🔑', 'इस डिवाइस पर पुराना खाता खोलें 🔑')}</span>
            </button>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base rounded-2xl shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>{t('Save Changes ✨', 'नाम सुरक्षित करें ✨')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

