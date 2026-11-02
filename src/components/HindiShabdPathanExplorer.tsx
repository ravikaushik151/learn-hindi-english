"use client";

import React, { useState } from 'react';
import { TWO_LETTER_ITEMS } from '@/data/twoLetterWords';
import { THREE_LETTER_ITEMS } from '@/data/threeLetterWords';
import { FOUR_LETTER_ITEMS } from '@/data/fourLetterWords';
import { MATRA_WORD_ITEMS } from '@/data/matraWords';
import { HindiItem } from '@/data/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useChildProfile } from '@/context/ChildProfileContext';
import { soundEffects } from '@/lib/sounds';
import { Volume2, Sparkles, Mic, BookOpen, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

type WordCategory = 'two' | 'three' | 'four' | 'matra';

export function HindiShabdPathanExplorer() {
  const [level, setLevel] = useState<WordCategory>('two');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  const { speakHindi, isSpeaking, speakingText } = useSpeech();
  const { addStars, markWordMastered } = useChildProfile();

  let currentItems: HindiItem[] = [];
  if (level === 'two') currentItems = TWO_LETTER_ITEMS;
  else if (level === 'three') currentItems = THREE_LETTER_ITEMS;
  else if (level === 'four') currentItems = FOUR_LETTER_ITEMS;
  else currentItems = MATRA_WORD_ITEMS;

  const handlePlayWord = (item: HindiItem) => {
    soundEffects.playPop();
    setActiveWordId(item.id);
    const word = item.devanagari || item.text;
    const speech = item.soundTipHindi ? `${word}। ${item.soundTipHindi}` : word;
    speakHindi(speech, { rate: 0.8 });
    addStars(1, 'hindi');
  };

  const handleSpeakMic = (item: HindiItem) => {
    const word = item.devanagari || item.text;
    soundEffects.playSuccess();
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    markWordMastered(word, 'hindi');
    addStars(2, 'hindi');
    speakHindi(`शाबाश! बहुत सुंदर बोला: ${word}`, { rate: 0.85 });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            <span>हिंदी शब्द-पठन अभ्यास (Word Reading) 📖</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            {level === 'two' && 'Level 1: दो अक्षर वाले सरल शब्द'}
            {level === 'three' && 'Level 2: तीन अक्षर वाले शब्द'}
            {level === 'four' && 'Level 3: चार अक्षर वाले शब्द'}
            {level === 'matra' && 'Level 4: मात्रा वाले शब्द'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-teal-100 max-w-xl">
            अक्षरों को जोड़कर शब्द पढ़ें, सही उच्चारण सुनें और बोलकर सितारे जीतें!
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
          {level === 'two' ? '💧' : level === 'three' ? '🪷' : level === 'four' ? '🐍' : '🎋'}
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => {
            soundEffects.playPop();
            setLevel('two');
          }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            level === 'two'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>💧</span>
          <span>२ अक्षर वाले शब्द</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/40">{TWO_LETTER_ITEMS.length}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setLevel('three');
          }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            level === 'three'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🪷</span>
          <span>३ अक्षर वाले शब्द</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/40">{THREE_LETTER_ITEMS.length}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setLevel('four');
          }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            level === 'four'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🐍</span>
          <span>४ अक्षर वाले शब्द</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/40">{FOUR_LETTER_ITEMS.length}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setLevel('matra');
          }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            level === 'matra'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🎋</span>
          <span>मात्रा वाले शब्द</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/40">{MATRA_WORD_ITEMS.length}</span>
        </button>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 animate-in fade-in">
        {currentItems.map((item) => {
          const word = item.devanagari || item.text;
          const isPlaying = isSpeaking && speakingText?.includes(word);

          return (
            <div
              key={item.id}
              onClick={() => handlePlayWord(item)}
              className={`bg-white p-4 rounded-3xl border-3 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between text-center select-none ${
                isPlaying
                  ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200'
                  : 'border-emerald-200 hover:border-emerald-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold mb-1">
                <span className="font-mono">{item.transliteration}</span>
                <span className="text-2xl">{item.emoji}</span>
              </div>

              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black font-hindi text-stone-900 leading-tight">
                  {word}
                </span>
              </div>

              {/* Blending Tip / Meaning */}
              <div className="bg-emerald-50 p-2 rounded-2xl border border-emerald-200 mt-1">
                <p className="text-xs font-black font-hindi text-emerald-950">
                  {item.soundTipHindi || word}
                </p>
                <p className="text-[10px] text-stone-500 font-medium truncate">
                  {item.meaning || item.englishMeaning}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayWord(item);
                  }}
                  className="p-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                  title="आवाज़ सुनें"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakMic(item);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-300 hover:bg-amber-400 text-stone-950 text-xs font-black transition-colors flex items-center gap-1 shadow-xs"
                  title="बोलें और सितारे जीतें"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>बोलें +2⭐</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

