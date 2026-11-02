"use client";

import React, { useState } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useChildProfile } from '@/context/ChildProfileContext';
import { useLanguage } from '@/context/LanguageContext';
import { compareEnglishSpeech } from '@/lib/comparison';
import { soundEffects } from '@/lib/sounds';
import {
  Mic,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface SpeechPracticeItem {
  id: string;
  category: string;
  english: string;
  hindi: string;
  phonicsTip: string;
  emoji: string;
  bgGradient: string;
}

const PRACTICE_ITEMS: SpeechPracticeItem[] = [
  {
    id: 'sp-1',
    category: 'Greetings & Manners',
    english: 'Good Morning!',
    hindi: 'शुभ प्रभात! (सुबह का अभिवादन)',
    phonicsTip: 'G को गले के पिछले हिस्से से /ग/ बोलें: Good!',
    emoji: '🌅',
    bgGradient: 'from-amber-300 via-orange-300 to-yellow-200',
  },
  {
    id: 'sp-2',
    category: 'Greetings & Manners',
    english: 'Thank You!',
    hindi: 'धन्यवाद! (शुक्रिया)',
    phonicsTip: 'Th के लिए जीभ को दोनों दांतों के बीच हल्का सा छुएं!',
    emoji: '🙏',
    bgGradient: 'from-pink-300 via-rose-300 to-orange-200',
  },
  {
    id: 'sp-3',
    category: 'Everyday Words',
    english: 'Apple',
    hindi: 'सेब (मीठा लाल फल)',
    phonicsTip: 'A के लिए मुंह चौड़ा खोलें: /ऐ/ - Apple!',
    emoji: '🍎',
    bgGradient: 'from-red-300 via-rose-300 to-amber-200',
  },
  {
    id: 'sp-4',
    category: 'Everyday Words',
    english: 'Water',
    hindi: 'पानी (जल)',
    phonicsTip: 'W के लिए होंठों को गोल (सीटी की तरह) बनाएं: Waa-ter!',
    emoji: '💧',
    bgGradient: 'from-sky-300 via-blue-300 to-cyan-200',
  },
  {
    id: 'sp-5',
    category: 'Simple Sentences',
    english: 'I like to play.',
    hindi: 'मुझे खेलना पसंद है।',
    phonicsTip: 'Play में P को होंठ मिलाकर हवा के साथ बोलें!',
    emoji: '⚽',
    bgGradient: 'from-emerald-300 via-teal-300 to-lime-200',
  },
  {
    id: 'sp-6',
    category: 'Animals',
    english: 'The cat is running.',
    hindi: 'बिल्ली दौड़ रही है।',
    phonicsTip: 'Cat में C का उच्चारण /क/ होता है!',
    emoji: '🐱',
    bgGradient: 'from-purple-300 via-indigo-300 to-pink-200',
  },
  {
    id: 'sp-7',
    category: 'Phonics Blending',
    english: 'Sun shines bright.',
    hindi: 'सूरज चमकता है।',
    phonicsTip: 'Sh के लिए होंठ आगे लाकर /श/ की सीटी निकालें!',
    emoji: '☀️',
    bgGradient: 'from-yellow-300 via-amber-300 to-orange-200',
  },
  {
    id: 'sp-8',
    category: 'Manners',
    english: 'May I drink water, please?',
    hindi: 'क्या मैं पानी पी सकता हूँ, कृपया?',
    phonicsTip: 'कक्षा में विनम्रता से पानी मांगने का प्यारा वाक्य!',
    emoji: '🏫',
    bgGradient: 'from-cyan-300 via-teal-300 to-emerald-200',
  },
];

export function EnglishSpeechPractice({ onBack }: { onBack?: () => void }) {
  const { speakEnglish, isSpeaking } = useSpeech();
  const { activeProfile, recordActivity, isLoggedIn } = useChildProfile();
  const { isEnglish, isHindi, t, shouldShowHindi } = useLanguage();
  const showHindi = shouldShowHindi();

  const kidName = isLoggedIn ? activeProfile.name : (isHindi ? 'नन्हा छात्र' : 'Young Explorer');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [evaluation, setEvaluation] = useState<{
    tested: boolean;
    isCorrect: boolean;
    score: number;
    recognized: string;
    feedbackEnglish: string;
    feedbackHindi: string;
  } | null>(null);

  const currentItem = PRACTICE_ITEMS[currentIndex];

  const handleSpeechResult = (transcript: string, alternatives: string[] = []) => {
    if (!transcript) {
      setEvaluation({
        tested: true,
        isCorrect: false,
        score: 0,
        recognized: '',
        feedbackEnglish: 'Could not hear clearly. Try again close to mic!',
        feedbackHindi: 'आवाज़ साफ़ नहीं आई। माइक के पास आकर बोलें!',
      });
      soundEffects.playTryAgain();
      return;
    }

    const result = compareEnglishSpeech(currentItem.english, transcript, alternatives, 'normal');

    setEvaluation({
      tested: true,
      isCorrect: result.isMatch,
      score: result.similarityPercent,
      recognized: result.recognized,
      feedbackEnglish: result.feedbackEnglish,
      feedbackHindi: result.feedbackHindi,
    });

    if (result.isMatch) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playTryAgain();
    }

    // Save directly into the child's record!
    recordActivity({
      word: currentItem.english,
      meaningHindi: currentItem.hindi,
      language: 'english',
      activityType: 'speech',
      score: result.similarityPercent,
      isCorrect: result.isMatch,
      userSpoken: result.recognized,
      attempts: 1,
    });
  };

  const {
    isListening,
    startListening,
    stopListening,
    isFallbackMode,
    confirmFallbackSpeech,
  } = useSpeechRecognition({
    lang: 'en-IN',
    timeoutMs: 6500,
    onFinalResult: (transcript, alts) => {
      handleSpeechResult(transcript, alts);
    },
  });

  const handleNext = () => {
    soundEffects.playPop();
    setEvaluation(null);
    setCurrentIndex((prev) => (prev + 1) % PRACTICE_ITEMS.length);
  };

  const handlePrev = () => {
    soundEffects.playPop();
    setEvaluation(null);
    setCurrentIndex((prev) => (prev - 1 + PRACTICE_ITEMS.length) % PRACTICE_ITEMS.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top bar with back and category indicator */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-stone-900 font-black text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('Back', 'वापस')}</span>
          </button>
        )}

        <div className="text-center flex-1">
          <span className="px-3 py-1 bg-amber-200 text-amber-950 font-black text-xs rounded-full uppercase tracking-wider">
            {currentItem.category} • {currentIndex + 1} / {PRACTICE_ITEMS.length}
          </span>
        </div>

        <div className="text-xs font-black text-amber-700">
          {t(`${kidName}'s Practice ⭐`, `${kidName} की प्रैक्टिस ⭐`)}
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6 text-center">
        
        {/* Visual Hero Badge */}
        <div
          className={`w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-gradient-to-tr ${currentItem.bgGradient} flex items-center justify-center text-6xl sm:text-7xl shadow-md border-4 border-white animate-in zoom-in-95`}
        >
          {currentItem.emoji}
        </div>

        {/* English Sentence to speak */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            &quot;{currentItem.english}&quot;
          </h2>
          {showHindi && (
            <p className="text-sm sm:text-base font-bold text-stone-600 font-hindi">
              {currentItem.hindi}
            </p>
          )}
        </div>

        {/* Phonics mouth guide tip */}
        {showHindi && (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-hindi max-w-md mx-auto flex items-center justify-center gap-2">
            <span>👄</span>
            <span>{currentItem.phonicsTip}</span>
          </div>
        )}

        {/* Action Controls: Listen & Speak */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* 1. Listen Teacher Voice */}
          <button
            onClick={() => {
              soundEffects.playPop();
              speakEnglish(currentItem.english);
            }}
            disabled={isSpeaking}
            className="flex items-center gap-2 px-5 py-3.5 bg-amber-100 hover:bg-amber-200 text-stone-900 font-black text-sm sm:text-base rounded-2xl border-2 border-amber-300 shadow-xs transition-transform active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-amber-700 animate-pulse" />
            <span>{t('Listen 🔊', 'उच्चारण सुनें 🔊')}</span>
          </button>

          {/* 2. Speak into mic */}
          <button
            onClick={() => {
              soundEffects.playPop();
              if (isListening) {
                stopListening();
              } else {
                startListening(currentItem.english);
              }
            }}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-200'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105'
            }`}
          >
            <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
            <span>{isListening ? t('Listening... Speak now! 🎙️', 'सुन रहे हैं... बोलें! 🎙️') : t('Tap to Speak! 🎤', 'माइक दबाकर बोलें! 🎤')}</span>
          </button>
        </div>

        {/* Cross-browser Fallback Confirmation Button */}
        {isListening && isFallbackMode && (
          <div className="p-3 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl space-y-2 animate-in fade-in">
            <p className="text-xs text-indigo-900 font-bold">
              {t('After speaking, click the button below:', 'बोलने के बाद नीचे \'मैंने बोल दिया\' बटन दबाएँ:')}
            </p>
            <button
              onClick={() => {
                confirmFallbackSpeech(currentItem.english);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-xs"
            >
              {t('I Spoke! ⭐ (Tap to confirm)', 'मैंने बोल दिया! ⭐')}
            </button>
          </div>
        )}

        {/* Evaluation feedback result */}
        {evaluation && (
          <div
            className={`p-4 rounded-2xl border-2 animate-in zoom-in-95 duration-150 space-y-1 ${
              evaluation.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-base font-black">
              <span>{evaluation.isCorrect ? '🎉' : '💪'}</span>
              <span>{showHindi ? evaluation.feedbackHindi : (evaluation.isCorrect ? 'Super Job! Perfect Pronunciation!' : 'Keep practicing!')}</span>
            </div>

            <p className="text-xs font-semibold text-stone-600">
              {evaluation.feedbackEnglish}
            </p>

            {evaluation.recognized && (
              <p className="text-[11px] text-stone-500 mt-1">
                {t(`Recognized: "${evaluation.recognized}" (${evaluation.score}% accuracy)`, `पहचाना गया: "${evaluation.recognized}" (सटीकता: ${evaluation.score}%)`)}
              </p>
            )}
          </div>
        )}

        {/* Navigation arrows (Previous / Next) */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-stone-100">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('Prev', 'पिछला')}</span>
          </button>

          <span className="text-xs text-stone-400 font-bold">
            {currentIndex + 1} of {PRACTICE_ITEMS.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs sm:text-sm rounded-xl shadow-sm transition-transform active:scale-95"
          >
            <span>{t('Next', 'अगला')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

