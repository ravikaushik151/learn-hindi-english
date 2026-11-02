"use client";

import React, { useState } from 'react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { X, UserPlus, Check, Trash2, Star, Sparkles, Flame } from 'lucide-react';

const AVATAR_OPTIONS = ['🦁', '🐰', '🐯', '🚀', '🐼', '⭐', '🦄', '🐬', '🦊', '🦉', '🐻', '🦖'];
const GRADE_OPTIONS = ['LKG / Nursery', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4'];

export function ProfileManagerModal() {
  const {
    profiles,
    activeProfile,
    switchProfile,
    createProfile,
    deleteProfile,
    isProfileModalOpen,
    closeProfileModal,
    openReportModal,
  } = useChildProfile();
  const { isEnglish, isHindi, t } = useLanguage();

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(6);
  const [avatar, setAvatar] = useState('🐰');
  const [grade, setGrade] = useState('Class 1');

  if (!isProfileModalOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createProfile(name, age, avatar, grade);
    setName('');
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {t('Child Profiles', 'बच्चे की प्रोफ़ाइल')}
              </h2>
              <p className="text-xs text-amber-100 font-medium font-hindi">
                {t('Keep separate progress for each child', 'अलग-अलग बच्चों का रिकॉर्ड अलग रखें')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              closeProfileModal();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {!isCreating ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-stone-500 tracking-wider">
                  {t(`Existing Profiles (${profiles.length})`, `मौजूदा प्रोफाइल (${profiles.length})`)}
                </span>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setIsCreating(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t('+ Add New Child', '+ नया बच्चा जोड़ें')}</span>
                </button>
              </div>

              {/* Profiles list */}
              <div className="space-y-2.5">
                {profiles.map((p) => {
                  const isActive = p.id === activeProfile.id;
                  const totalStars = (p.englishStars || 0) + (p.hindiStars || 0);

                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        switchProfile(p.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-300'
                          : 'bg-white border-stone-200 hover:bg-amber-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs">
                          {p.avatar}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-stone-900">{p.name}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-black rounded-full">
                                {t('Active', 'सक्रिय')}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {t(`Age: ${p.age} yrs • ${p.grade}`, `उम्र: ${p.age} वर्ष • ${p.grade}`)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm font-black text-amber-600">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                            <span>{totalStars}</span>
                          </div>
                          <div className="text-[10px] text-stone-400">{t('Stars', 'सितारे')}</div>
                        </div>

                        {profiles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(t(`Are you sure you want to delete ${p.name}'s profile?`, `क्या आप ${p.name} की प्रोफाइल हटाना चाहते हैं?`))) {
                                deleteProfile(p.id);
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50"
                            title={t('Delete Profile', 'प्रोफ़ाइल हटाएं')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View Report Card shortcut button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    closeProfileModal();
                    openReportModal();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-black text-sm rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>📜</span>
                  <span>{t(`View ${activeProfile.name}'s Report Card & Certificate`, `${activeProfile.name} का पूरा रिपोर्ट कार्ड व प्रमाण पत्र देखें`)}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Create new child profile form */
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm font-black text-stone-800">{t('Add New Child:', 'नया बच्चा जोड़ें:')}</h3>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 font-bold"
                >
                  {t('Cancel', 'रद्द करें')}
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1">
                  {t("Child's Name:", "बच्चे का नाम:")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("e.g. Aarav, Leo, Kabir, Riya...", "उदा. आरव, कबीर, रिया...")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-bold text-stone-900"
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-black text-stone-700 mb-1.5">
                  {t('Choose Cartoon Avatar:', 'मनपसंद कार्टून अवतार चुनें:')}
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setAvatar(av);
                      }}
                      className={`text-2xl p-2 rounded-xl transition-all ${
                        avatar === av
                          ? 'bg-amber-300 ring-2 ring-amber-500 scale-110 shadow-xs'
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
                  <label className="block text-xs font-black text-stone-700 mb-1">
                    {t('Age (Years):', 'उम्र (वर्ष):')}
                  </label>
                  <select
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-amber-300 text-sm font-bold text-stone-900 bg-white"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                      <option key={a} value={a}>
                        {a} {t('Years', 'वर्ष')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-stone-700 mb-1">
                    {t('Class / Grade:', 'कक्षा (Grade):')}
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-amber-300 text-sm font-bold text-stone-900 bg-white"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{t('Create Child Profile 🚀', 'प्रोफ़ाइल सुरक्षित करें 🚀')}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          {t('All children profiles and records are saved safely in your browser', 'सभी बच्चों का डेटा आपके ब्राउज़र में सुरक्षित रूप से सेव रहता है')}
        </div>

      </div>
    </div>
  );
}

