"use client";

import React, { useState, useEffect } from 'react';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { soundEffects } from '@/lib/sounds';
import { KeyRound, ShieldCheck, ArrowRight, UserCheck, AlertCircle, Sparkles, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DeviceLoginModal() {
  const {
    isDeviceLoginModalOpen,
    closeDeviceLoginModal,
    loginWithKidCodeOrPin,
  } = useChildProfile();
  const { t } = useLanguage();

  const [loginMethod, setLoginMethod] = useState<'namePin' | 'kidCode'>('namePin');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [kidCode, setKidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isDeviceLoginModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isDeviceLoginModalOpen]);

  if (!isDeviceLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const identifier = loginMethod === 'namePin' ? name.trim() : kidCode.trim();
      const pinValue = pin.trim() || '1234'; // Default to 1234 if left blank

      if (!identifier) {
        setErrorMessage(t('Please enter your name or Kid Code.', 'कृपया अपना नाम या किड कोड दर्ज करें।'));
        setIsLoading(false);
        return;
      }

      const result = await loginWithKidCodeOrPin(identifier, pinValue);

      if (result.success) {
        soundEffects.playCelebration();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        const totalRestoredStars =
          (result.profile?.englishStars || 0) +
          (result.profile?.hindiStars || 0) +
          (result.profile?.mathsStars || 0) +
          (result.profile?.scienceStars || 0) +
          (result.profile?.gkStars || 0);

        setSuccessMessage(
          t(
            `🎉 Welcome, ${result.profile?.name || identifier}! Profile restored with ${totalRestoredStars} ⭐ stars!`,
            `🎉 स्वागत है, ${result.profile?.name || identifier}! प्रोफ़ाइल लोड हो गई है और सभी सितारे (${totalRestoredStars} ⭐) सुरक्षित हैं!`
          )
        );
        setTimeout(() => {
          closeDeviceLoginModal();
          setSuccessMessage(null);
          setName('');
          setPin('');
          setKidCode('');
        }, 1500);
      } else {
        soundEffects.playTryAgain();
        if (result.error === 'INCORRECT_PIN') {
          setErrorMessage(
            t(
              `⚠️ Incorrect PIN! Profile for "${identifier}" is protected. (If you didn't set a custom PIN, the default is 1234).`,
              `⚠️ गलत पिन! "${identifier}" का प्रोफ़ाइल पिन से सुरक्षित है। (यदि आपने पिन नहीं बदला था, तो डिफ़ॉल्ट 1234 है)।`
            )
          );
        } else {
          setErrorMessage(
            t(
              `No profile found for "${identifier}". Please check spelling or enter your Unique Kid Code (e.g. RAI-5678).`,
              `"${identifier}" नाम का कोई प्रोफ़ाइल नहीं मिला। कृपया स्पेलिंग जांचें या अपना किड कोड दर्ज करें।`
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
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col relative text-left max-h-[92vh] overflow-y-auto">
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
                  placeholder={t('e.g. Rai, Ravi, Jeevika...', 'जैसे: Rai, Ravi, Jeevika...')}
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
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="1234"
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-stone-300 focus:border-amber-400 text-xl font-mono tracking-widest text-stone-900 outline-none transition-all shadow-inner text-center"
                />
                <p className="text-[10px] text-stone-500 mt-1">
                  {t(
                    '💡 If you did not change your PIN, leave blank or type 1234.',
                    '💡 यदि आपने पिन नहीं बदला था, तो खाली छोड़ें या 1234 लिखें।'
                  )}
                </p>
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
                placeholder="e.g. RAI-5678 or JEEV-5533"
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
              'Users are saved in your browser and synced to server (data/kidProfilesDb.json).',
              'प्रोफ़ाइल आपके ब्राउज़र और सर्वर (data/kidProfilesDb.json) में सुरक्षित रूप से सेव होती है।'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
