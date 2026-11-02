"use client";

import React, { useState } from 'react';
import { SWAR_ITEMS } from '@/data/swar';
import { VYANJAN_ITEMS } from '@/data/vyanjan';
import { MATRA_DEFINITIONS } from '@/data/matraWords';
import { useSpeech } from '@/hooks/useSpeech';
import { useChildProfile } from '@/context/ChildProfileContext';
import { soundEffects } from '@/lib/sounds';
import { Volume2, Sparkles, Mic, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

type VarnamalaSection = 'swar' | 'vyanjan' | 'matra';

const VARGA_LIST = [
  { id: 'all', label: 'सभी (All)' },
  { id: 'ka', label: 'क-वर्ग (क-ङ)' },
  { id: 'cha', label: 'च-वर्ग (च-ञ)' },
  { id: 'ta', label: 'ट-वर्ग (ट-ण)' },
  { id: 'ta2', label: 'त-वर्ग (त-न)' },
  { id: 'pa', label: 'प-वर्ग (प-म)' },
  { id: 'antastha', label: 'अन्तःस्थ (य-व)' },
  { id: 'ushma', label: 'ऊष्म (श-ह)' },
  { id: 'samyukta', label: 'संयुक्त (क्ष-श्र)' },
];

export function HindiVarnamalaExplorer() {
  const [section, setSection] = useState<VarnamalaSection>('swar');
  const [selectedVarga, setSelectedVarga] = useState<string>('all');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const { speakHindi, isSpeaking, speakingText } = useSpeech();
  const { addStars } = useChildProfile();

  const handlePlayLetter = (letter: string, word?: string) => {
    soundEffects.playPop();
    setActiveLetter(letter);
    const textToSpeak = word ? `${letter} से ${word}। ${word}` : letter;
    speakHindi(textToSpeak, { rate: 0.8 });
    addStars(1, 'hindi');
  };

  const handlePracticeMic = (letter: string, word?: string) => {
    soundEffects.playSuccess();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    addStars(2, 'hindi');
    const speech = word ? `शाबाश! ${letter} से ${word}` : `बहुत बढ़िया! ${letter}`;
    speakHindi(speech, { rate: 0.85 });
  };

  // Filter Vyanjan by Varga
  const filteredVyanjan = VYANJAN_ITEMS.filter((item) => {
    if (selectedVarga === 'all') return true;
    const dev = item.devanagari;
    if (selectedVarga === 'ka') return ['क', 'ख', 'ग', 'घ', 'ङ'].includes(dev);
    if (selectedVarga === 'cha') return ['च', 'छ', 'ज', 'झ', 'ञ'].includes(dev);
    if (selectedVarga === 'ta') return ['ट', 'ठ', 'ड', 'ढ', 'ण'].includes(dev);
    if (selectedVarga === 'ta2') return ['त', 'थ', 'द', 'ध', 'न'].includes(dev);
    if (selectedVarga === 'pa') return ['प', 'फ', 'ब', 'भ', 'म'].includes(dev);
    if (selectedVarga === 'antastha') return ['य', 'र', 'ल', 'व'].includes(dev);
    if (selectedVarga === 'ushma') return ['श', 'ष', 'स', 'ह'].includes(dev);
    if (selectedVarga === 'samyukta') return ['क्ष', 'त्र', 'ज्ञ', 'श्र'].includes(dev);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            <span>हिंदी वर्णमाला व मात्रा ज्ञान 🇮🇳</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            {section === 'swar' && 'स्वर (13 Swar: अ से अः)'}
            {section === 'vyanjan' && 'व्यंजन (36 Vyanjan: क से ज्ञ)'}
            {section === 'matra' && 'मात्रा ज्ञान (14 Matras: ा, ि, ी, ु...)'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-100 max-w-xl">
            अक्षर पर क्लिक करके साफ़ उच्चारण सुनें, सुंदर चित्र देखें और बोलकर सितारे जीतें!
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
          {section === 'swar' ? '🍎' : section === 'vyanjan' ? '🕊️' : '🎋'}
        </div>
      </div>

      {/* 2. Main Section Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => {
            soundEffects.playPop();
            setSection('swar');
          }}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base transition-all ${
            section === 'swar'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🔤</span>
          <span>स्वर (अ से अः)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/40">{SWAR_ITEMS.length}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setSection('vyanjan');
          }}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base transition-all ${
            section === 'vyanjan'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🎨</span>
          <span>व्यंजन (क से ज्ञ)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/40">{VYANJAN_ITEMS.length}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setSection('matra');
          }}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base transition-all ${
            section === 'matra'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🎋</span>
          <span>मात्रा ज्ञान (Matras)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/40">{MATRA_DEFINITIONS.length}</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: SWAR (स्वर: 13 अक्षर)
          ======================================================== */}
      {section === 'swar' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {SWAR_ITEMS.map((item) => {
              const isPlaying = isSpeaking && speakingText?.includes(item.devanagari);
              return (
                <div
                  key={item.id}
                  onClick={() => handlePlayLetter(item.devanagari, item.exampleWord)}
                  className={`bg-white p-4 rounded-3xl border-3 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between text-center select-none ${
                    isPlaying
                      ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-200'
                      : 'border-amber-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-400 font-bold mb-1">
                    <span className="font-mono">{item.transliteration}</span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>

                  <div className="my-2">
                    <span className="text-5xl sm:text-6xl font-black font-hindi text-stone-900 leading-tight">
                      {item.devanagari}
                    </span>
                  </div>

                  <div className="bg-amber-50 p-2 rounded-2xl border border-amber-200 mt-1">
                    <p className="text-sm font-black font-hindi text-amber-950">
                      {item.devanagari} से {item.exampleWord}
                    </p>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {item.englishMeaning}
                    </p>
                  </div>

                  {item.soundTipHindi && (
                    <p className="text-[10px] text-stone-500 font-hindi mt-2 line-clamp-1">
                      💡 {item.soundTipHindi}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLetter(item.devanagari, item.exampleWord);
                      }}
                      className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 transition-colors flex items-center justify-center"
                      title="आवाज़ सुनें"
                    >
                      <Volume2 className="w-4 h-4 text-orange-600" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePracticeMic(item.devanagari, item.exampleWord);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-black transition-colors flex items-center gap-1"
                      title="माइक से बोलो और सितारा जीतो"
                    >
                      <Mic className="w-3.5 h-3.5 text-emerald-700" />
                      <span>बोलें +2⭐</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: VYANJAN (व्यंजन: 36 अक्षर)
          ======================================================== */}
      {section === 'vyanjan' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Varga Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-amber-50 rounded-2xl border border-amber-300 max-w-fit mx-auto">
            {VARGA_LIST.map((varga) => (
              <button
                key={varga.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedVarga(varga.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedVarga === varga.id
                    ? 'bg-amber-400 text-stone-950 shadow-xs ring-1 ring-amber-500 scale-105'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                {varga.label}
              </button>
            ))}
          </div>

          {/* Vyanjan Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {filteredVyanjan.map((item) => {
              const isPlaying = isSpeaking && speakingText?.includes(item.devanagari);
              return (
                <div
                  key={item.id}
                  onClick={() => handlePlayLetter(item.devanagari, item.exampleWord)}
                  className={`bg-white p-3.5 rounded-3xl border-3 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between text-center select-none ${
                    isPlaying
                      ? 'border-sky-500 bg-sky-50 ring-4 ring-sky-200'
                      : 'border-sky-200 hover:border-sky-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-400 font-bold mb-1">
                    <span className="font-mono">{item.transliteration}</span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>

                  <div className="my-1.5">
                    <span className="text-5xl font-black font-hindi text-stone-900 leading-tight">
                      {item.devanagari}
                    </span>
                  </div>

                  <div className="bg-sky-50 p-2 rounded-2xl border border-sky-200 mt-1">
                    <p className="text-xs font-black font-hindi text-sky-950 truncate">
                      {item.devanagari} से {item.exampleWord}
                    </p>
                    <p className="text-[10px] text-stone-500 font-medium truncate">
                      {item.englishMeaning}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLetter(item.devanagari, item.exampleWord);
                      }}
                      className="p-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors flex items-center justify-center"
                      title="आवाज़ सुनें"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-700" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePracticeMic(item.devanagari, item.exampleWord);
                      }}
                      className="px-2 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-black transition-colors flex items-center gap-1"
                      title="माइक से बोलो और सितारा जीतो"
                    >
                      <Mic className="w-3 h-3 text-emerald-700" />
                      <span>+2⭐</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: MATRA GYAN (मात्रा ज्ञान: 14 मात्राएँ)
          ======================================================== */}
      {section === 'matra' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MATRA_DEFINITIONS.map((m) => (
              <div
                key={m.sign}
                onClick={() => {
                  soundEffects.playPop();
                  speakHindi(`${m.name}। ${m.tip}`, { rate: 0.8 });
                  addStars(1, 'hindi');
                }}
                className="bg-white p-4 rounded-3xl border-3 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-emerald-50 border border-emerald-200 font-hindi font-black text-emerald-900 w-14 h-14 flex items-center justify-center">
                    क{m.sign}
                  </span>
                  <span className="text-3xl">{m.emoji}</span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-black font-hindi text-stone-900">
                    {m.name}
                  </h3>
                  <p className="text-xs text-stone-600 font-hindi mt-0.5">
                    {m.description}
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-2.5 rounded-2xl border border-emerald-200 mt-3 text-xs font-hindi text-emerald-950">
                  <p className="font-bold">💡 आवाज़:</p>
                  <p className="text-[11px] mt-0.5">{m.tip}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:text-emerald-900"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>सुनें व समझें</span>
                  </button>
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                    +1 ⭐
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

