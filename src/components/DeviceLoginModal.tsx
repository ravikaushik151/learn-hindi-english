"use client";

import React, { useState } from 'react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { KeyRound, ShieldCheck, ArrowRight, UserCheck, AlertCircle, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DeviceLoginModal() {
  const {
    isDeviceLoginModalOpen,
    closeDeviceLoginModal,
    loginWithKidCodeOrPin,
    openEditModal,
    activeProfile,
  } = useChildProfile();
  const { t, isEnglish } = useLanguage();

  const [loginMethod, setLoginMethod] = useState<'namePin' | 'kidCode'>('namePin');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [kidCode, setKidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isDeviceLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const identifier = loginMethod === 'namePin' ? name.trim() : kidCode.trim();
      const pinValue = loginMethod === 'namePin' ? pin.trim() : pin.trim();

      if (!identifier) {
        setErrorMessage(t('Please enter your name or Kid Code.', 'कृपया अपना नाम या किड कोड दर्ज करें।'));
        setIsLoading(false);
        return;
      }

      if (loginMethod === 'namePin' && (!pinValue || pinValue.length < 4)) {
        setErrorMessage(t('Please enter your 4-digit PIN.', 'कृपया अपना 4-अंकों का गुप्त पिन दर्ज करें।'));
        setIsLoading(false);
        return;
      }

      const result = await loginWithKidCodeOrPin(identifier, pinValue);

      if (result.success) {
        soundEffects.playCelebration();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        setSuccessMessage(
          t('🎉 Profile restored successfully! All your stars and badges are loaded.', '🎉 आपका प्रोफ़ाइल सफलतापूर्वक लोड हो गया है! आपके सभी सितारे सुरक्षित हैं।')
        );
        setTimeout(() => {
          closeDeviceLoginModal();
          setSuccessMessage(null);
          setName('');
          setPin('');
          setKidCode('');
        }, 1600);
      } else {
        soundEffects.playTryAgain();
        if (result.error === 'INCORRECT_PIN') {
          setErrorMessage(
            t(
              `⚠️ Incorrect PIN! Profile for "${identifier}" is protected. Only the real ${identifier} with the correct 4-digit PIN can open it.`,
              `⚠️ गलत पिन! "${identifier}" का प्रोफ़ाइल पिन से सुरक्षित है। केवल सही 4-अंकों वाले पिन से ही इसे खोला जा सकता है।`
            )
          );
        } else {
          setErrorMessage(
            t(
              `No profile found for "${identifier}". Please check the spelling or enter your Unique Kid Code.`,
              `"${identifier}" का कोई प्रोफ़ाइल नहीं मिला। कृपया नाम या किड कोड की स्पेलिंग जांचें।`
            )
          );
        }
      }
    } catch (err: any) {
      setErrorMessage(t('Connection error. Please try again.', 'कनेक्शन समस्या। कृपया पुनः प्रयास करें।'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col relative text-left">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playPop();
            closeDeviceLoginModal();
          }}
          className="absolute right-4 top-4 z-10 w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center font-bold text-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5 text-amber-200" />
            <span>{t('Multi-Browser & Device Access', 'किसी भी ब्राउज़र पर लॉगिन')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t('Open Profile on Any Device 🔑', 'दूसरे डिवाइस पर खाता खोलें 🔑')}
          </h2>

          <p className="text-xs sm:text-sm font-medium text-amber-100">
            {t(
              'There can be many students named Rai or Ravi, but your 4-digit PIN ensures only YOU can open your account!',
              'आपके नाम के कई बच्चे हो सकते हैं, लेकिन आपका 4-अंकों का गुप्त पिन सुनिश्चित करता है कि केवल आप ही अपना खाता खोल सकें!'
            )}
          </p>
        </div>

        {/* Active Child Reference Card */}
        {activeProfile?.kidCode && (
          <div className="mx-6 mt-4 p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeProfile.avatar}</span>
              <div>
                <span className="font-bold text-stone-900 block">{activeProfile.name}</span>
                <span className="text-stone-500 font-mono text-[11px]">
                  Passport Code: <strong className="text-amber-900 font-black">{activeProfile.kidCode}</strong>
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-amber-200 text-amber-950 font-black rounded-lg text-[10px]">
              Active On This Device
            </span>
          </div>
        )}

        {/* Tabs to choose login style */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs font-black">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setLoginMethod('namePin');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-xl transition-all ${
                loginMethod === 'namePin'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              👤 {t('Name + 4-Digit PIN', 'नाम + गुप्त पिन')}
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setLoginMethod('kidCode');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-xl transition-all ${
                loginMethod === 'kidCode'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🏷️ {t('Unique Kid Code', 'यूनिक किड कोड')}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {loginMethod === 'namePin' ? (
            <>
              <div>
                <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
                  {t('1. Student Name:', '1. छात्र का नाम:')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('e.g. Rai, Ravi, Aarav...', 'जैसे: Rai, Ravi, आरव...')}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-stone-300 focus:border-amber-400 text-base font-bold text-stone-900 outline-none transition-all shadow-inner"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black text-stone-700 uppercase tracking-wider">
                    {t('2. Secret 4-Digit PIN:', '2. 4-अंकों का गुप्त पिन:')}
                  </label>
                  <span className="text-[10px] text-amber-800 font-bold">
                    {t('(Default: 1234)', '(डिफ़ॉल्ट: 1234)')}
                  </span>
                </div>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-stone-300 focus:border-amber-400 text-xl font-mono tracking-widest text-stone-900 outline-none transition-all shadow-inner text-center"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-black text-stone-700 uppercase tracking-wider mb-1">
                {t('Enter Unique Kid Code:', 'यूनिक किड कोड दर्ज करें:')}
              </label>
              <input
                type="text"
                required
                value={kidCode}
                onChange={(e) => setKidCode(e.target.value.toUpperCase())}
                placeholder="e.g. RAI-7429 or RAVI-3184"
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-stone-300 focus:border-amber-400 text-lg font-mono font-black text-stone-900 outline-none transition-all uppercase tracking-wider shadow-inner text-center"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                {t(
                  'Your Kid Code is shown in your profile card or report card.',
                  'आपका किड कोड आपके प्रोफ़ाइल या रिपोर्ट कार्ड में दिखाई देता है।'
                )}
              </p>
            </div>
          )}

          {/* Feedback messages */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl text-xs font-bold text-rose-900 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-start gap-2 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-stone-950 font-black text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <KeyRound className="w-5 h-5" />
            <span>{isLoading ? t('Checking...', 'जांच हो रही है...') : t('Open My Profile 🚀', 'मेरा प्रोफ़ाइल खोलें 🚀')}</span>
          </button>
        </form>

        {/* Footer explanation */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-600 space-y-1">
          <p className="font-bold text-stone-800">
            {t('🛡️ Privacy & Identity Guarantee', '🛡️ गोपनीयता और पहचान की सुरक्षा')}
          </p>
          <p className="text-[11px]">
            {t(
              'No one else can open or edit your learning record without your 4-digit PIN.',
              'आपके 4-अंकों के पिन के बिना कोई दूसरा आपके नाम से आपका रिकॉर्ड नहीं देख सकता।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

