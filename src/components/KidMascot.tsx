"use client";

import React, { useState } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { soundEffects } from '@/lib/sounds';
import { useChildProfile } from '@/context/ChildProfileContext';
import { Volume2, X, Sparkles, MessageCircle } from 'lucide-react';

const MASCOT_TIPS = [
  {
    english: "Great job learning! Tap any card to hear its sound!",
    hindi: "अरे वाह! बहुत अच्छा सीख रहे हो! किसी भी कार्ड पर टैप करके आवाज़ सुनो!",
  },
  {
    english: "Repeat after the voice to make your pronunciation crystal clear!",
    hindi: "आवाज़ सुनने के बाद खुद बोलकर देखो, आवाज़ एकदम साफ़ निकलेगी!",
  },
  {
    english: "Don't worry about mistakes! Every mistake makes you smarter!",
    hindi: "गलती होने पर घबराओ मत! जितनी बार बोलोगे, उतनी जल्दी सीखोगे!",
  },
  {
    english: "Earn 5 stars on every lesson to unlock the Golden Trophy!",
    hindi: "हर पाठ में 5 सितारे जीतो और अपनी गोल्डन ट्रॉफ़ी अनलॉक करो!",
  },
  {
    english: "Vowels A, E, I, O, U are musical bells that help letters sing!",
    hindi: "A, E, I, O, U जादुई घंटियाँ हैं जो अक्षरों को गाना सिखाती हैं!",
  },
];

export function KidMascot() {
  const { speakHindi, speakEnglish } = useSpeech();
  const { activeProfile, openReportModal } = useChildProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  const handleMascotClick = () => {
    soundEffects.playPop();
    const nextIdx = (currentTipIdx + 1) % MASCOT_TIPS.length;
    setCurrentTipIdx(nextIdx);
    setIsOpen(true);

    const tip = MASCOT_TIPS[nextIdx];
    // Speak friendly Hindi encouragement
    speakHindi(`${activeProfile.name}! ${tip.hindi}`);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end select-none">
      {/* Speech Bubble */}
      {isOpen && (
        <div className="mb-2 max-w-xs sm:max-w-sm bg-white p-3.5 sm:p-4 rounded-3xl shadow-2xl border-3 border-amber-300 animate-in fade-in zoom-in-95 duration-150 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-2 pr-4">
            <span className="text-xl">🦜</span>
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                मित्रू तोता (Mitroo) says:
              </span>
              <p className="text-xs font-bold text-stone-800 font-hindi leading-relaxed">
                {activeProfile.name}! {MASCOT_TIPS[currentTipIdx].hindi}
              </p>
              <p className="text-[11px] font-medium text-stone-500 italic">
                &quot;{MASCOT_TIPS[currentTipIdx].english}&quot;
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-amber-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                const tip = MASCOT_TIPS[currentTipIdx];
                speakEnglish(tip.english);
              }}
              className="flex items-center gap-1 text-[11px] font-black text-indigo-600 hover:underline"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>English में सुनें</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openReportModal();
              }}
              className="text-[11px] font-black text-amber-700 hover:underline"
            >
              प्रगति पत्र देखें 📜
            </button>
          </div>

          {/* Pointer tail */}
          <div className="w-3 h-3 bg-white border-r-3 border-b-3 border-amber-300 transform rotate-45 absolute -bottom-2 right-6" />
        </div>
      )}

      {/* Floating Animated Mascot Button */}
      <button
        onClick={handleMascotClick}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-500 shadow-xl hover:shadow-2xl border-3 border-white hover:scale-110 active:scale-95 transition-all"
        title="मित्रू तोते से मदद लें!"
      >
        <span className="text-3xl sm:text-4xl group-hover:rotate-12 transition-transform">
          🦜
        </span>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border border-white text-[9px] items-center justify-center text-white font-bold">
            !
          </span>
        </span>
      </button>
    </div>
  );
}

