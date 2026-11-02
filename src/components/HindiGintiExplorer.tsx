"use client";

import React, { useState } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { useChildProfile } from '@/context/ChildProfileContext';
import { soundEffects } from '@/lib/sounds';
import { Volume2, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HindiNumber {
  devanagari: string;
  num: number;
  wordHindi: string;
  roman: string;
  emojiCount?: string;
}

const HINDI_GINTI: HindiNumber[] = [
  { devanagari: "१", num: 1, wordHindi: "एक", roman: "Ek", emojiCount: "🍎" },
  { devanagari: "२", num: 2, wordHindi: "दो", roman: "Do", emojiCount: "🍎🍎" },
  { devanagari: "३", num: 3, wordHindi: "तीन", roman: "Teen", emojiCount: "⭐⭐⭐" },
  { devanagari: "४", num: 4, wordHindi: "चार", roman: "Chaar", emojiCount: "🎈🎈🎈🎈" },
  { devanagari: "५", num: 5, wordHindi: "पाँच", roman: "Paanch", emojiCount: "🖐️" },
  { devanagari: "६", num: 6, wordHindi: "छह", roman: "Chhah" },
  { devanagari: "७", num: 7, wordHindi: "सात", roman: "Saat" },
  { devanagari: "८", num: 8, wordHindi: "आठ", roman: "Aath" },
  { devanagari: "९", num: 9, wordHindi: "नौ", roman: "Nau" },
  { devanagari: "१०", num: 10, wordHindi: "दस", roman: "Das" },
  { devanagari: "११", num: 11, wordHindi: "ग्यारह", roman: "Gyaarah" },
  { devanagari: "१२", num: 12, wordHindi: "बारह", roman: "Baarah" },
  { devanagari: "१३", num: 13, wordHindi: "तेरह", roman: "Terah" },
  { devanagari: "१४", num: 14, wordHindi: "चौदह", roman: "Chaudah" },
  { devanagari: "१५", num: 15, wordHindi: "पंद्रह", roman: "Pandrah" },
  { devanagari: "१६", num: 16, wordHindi: "सोलह", roman: "Solah" },
  { devanagari: "१७", num: 17, wordHindi: "सत्रह", roman: "Satrah" },
  { devanagari: "१८", num: 18, wordHindi: "अठारह", roman: "Athaarah" },
  { devanagari: "१९", num: 19, wordHindi: "उन्नीस", roman: "Unnees" },
  { devanagari: "२०", num: 20, wordHindi: "बीस", roman: "Bees" },
  { devanagari: "२१", num: 21, wordHindi: "इक्कीस", roman: "Ikkees" },
  { devanagari: "२२", num: 22, wordHindi: "बाईस", roman: "Baees" },
  { devanagari: "२३", num: 23, wordHindi: "तेईस", roman: "Tees" },
  { devanagari: "२४", num: 24, wordHindi: "चौबीस", roman: "Chaubees" },
  { devanagari: "२५", num: 25, wordHindi: "पच्चीस", roman: "Pachchees" },
  { devanagari: "२६", num: 26, wordHindi: "छब्बीस", roman: "Chhabbees" },
  { devanagari: "२७", num: 27, wordHindi: "सत्ताईस", roman: "Sattaees" },
  { devanagari: "२८", num: 28, wordHindi: "अट्ठाईस", roman: "Atthaees" },
  { devanagari: "२९", num: 29, wordHindi: "उनतीस", roman: "Untees" },
  { devanagari: "३०", num: 30, wordHindi: "तीस", roman: "Tees" },
  { devanagari: "३१", num: 31, wordHindi: "इकत्तीस", roman: "Ikattees" },
  { devanagari: "३२", num: 32, wordHindi: "बत्तीस", roman: "Battees" },
  { devanagari: "३३", num: 33, wordHindi: "तैंतीस", roman: "Taintees" },
  { devanagari: "३४", num: 34, wordHindi: "चौंतीस", roman: "Chauntees" },
  { devanagari: "३५", num: 35, wordHindi: "पैंतीस", roman: "Paintees" },
  { devanagari: "३६", num: 36, wordHindi: "छत्तीस", roman: "Chhattees" },
  { devanagari: "३७", num: 37, wordHindi: "सैंतीस", roman: "Saintees" },
  { devanagari: "३८", num: 38, wordHindi: "अड़तीस", roman: "Adtees" },
  { devanagari: "३९", num: 39, wordHindi: "उनतालीस", roman: "Untaalees" },
  { devanagari: "४०", num: 40, wordHindi: "चालीस", roman: "Chaalees" },
  { devanagari: "४१", num: 41, wordHindi: "इकतालीस", roman: "Iktalees" },
  { devanagari: "४२", num: 42, wordHindi: "बयालीस", roman: "Bayaalees" },
  { devanagari: "४३", num: 43, wordHindi: "तैंतालीस", roman: "Taintalees" },
  { devanagari: "४४", num: 44, wordHindi: "चवालीस", roman: "Chawalees" },
  { devanagari: "४५", num: 45, wordHindi: "पैंतालीस", roman: "Paintalees" },
  { devanagari: "४६", num: 46, wordHindi: "छियालीस", roman: "Chhiyaalees" },
  { devanagari: "४७", num: 47, wordHindi: "सैंतालीस", roman: "Saintalees" },
  { devanagari: "४८", num: 48, wordHindi: "अड़तालीस", roman: "Adtalees" },
  { devanagari: "४९", num: 49, wordHindi: "उनचास", roman: "Unchaas" },
  { devanagari: "५०", num: 50, wordHindi: "पचास", roman: "Pachaas" },
  { devanagari: "५१", num: 51, wordHindi: "इक्यावन", roman: "Ikyaavan" },
  { devanagari: "५२", num: 52, wordHindi: "बावन", roman: "Baavan" },
  { devanagari: "५३", num: 53, wordHindi: "तिरेपन", roman: "Tirepan" },
  { devanagari: "५४", num: 54, wordHindi: "चौवन", roman: "Chauvan" },
  { devanagari: "५५", num: 55, wordHindi: "पचपन", roman: "Pachpan" },
  { devanagari: "५६", num: 56, wordHindi: "छप्पन", roman: "Chhappan" },
  { devanagari: "५७", num: 57, wordHindi: "सत्तावन", roman: "Sattaavan" },
  { devanagari: "५८", num: 58, wordHindi: "अट्ठावन", roman: "Atthaavan" },
  { devanagari: "५९", num: 59, wordHindi: "उनसठ", roman: "Unsath" },
  { devanagari: "६०", num: 60, wordHindi: "साठ", roman: "Saath" },
  { devanagari: "६१", num: 61, wordHindi: "इकसठ", roman: "Iksath" },
  { devanagari: "६२", num: 62, wordHindi: "बासठ", roman: "Baasath" },
  { devanagari: "६३", num: 63, wordHindi: "तिरेसठ", roman: "Tiresath" },
  { devanagari: "६४", num: 64, wordHindi: "चौंसठ", roman: "Chaunsath" },
  { devanagari: "६५", num: 65, wordHindi: "पैंसठ", roman: "Painsath" },
  { devanagari: "६६", num: 66, wordHindi: "छियासठ", roman: "Chhiyaasath" },
  { devanagari: "६७", num: 67, wordHindi: "सरसठ", roman: "Sarsath" },
  { devanagari: "६८", num: 68, wordHindi: "अड़सठ", roman: "Adsath" },
  { devanagari: "६९", num: 69, wordHindi: "उनहत्तर", roman: "Unhattar" },
  { devanagari: "७०", num: 70, wordHindi: "सत्तर", roman: "Sattar" },
  { devanagari: "७१", num: 71, wordHindi: "इकहत्तर", roman: "Ikhattar" },
  { devanagari: "७२", num: 72, wordHindi: "बहत्तर", roman: "Bahattar" },
  { devanagari: "७३", num: 73, wordHindi: "तिहत्तर", roman: "Tihattar" },
  { devanagari: "७४", num: 74, wordHindi: "चौहत्तर", roman: "Chauhattar" },
  { devanagari: "७५", num: 75, wordHindi: "पचहत्तर", roman: "Pachhattar" },
  { devanagari: "७६", num: 76, wordHindi: "छिहत्तर", roman: "Chhihattar" },
  { devanagari: "७७", num: 77, wordHindi: "सतहत्तर", roman: "Sat-hattar" },
  { devanagari: "७८", num: 78, wordHindi: "अठहत्तर", roman: "Ath-hattar" },
  { devanagari: "७९", num: 79, wordHindi: "उनासी", roman: "Unaasee" },
  { devanagari: "८०", num: 80, wordHindi: "अस्सी", roman: "Assee" },
  { devanagari: "८१", num: 81, wordHindi: "इक्यासी", roman: "Ikyaasee" },
  { devanagari: "८२", num: 82, wordHindi: "बयासी", roman: "Bayaasee" },
  { devanagari: "८३", num: 83, wordHindi: "तिरासी", roman: "Tiraasee" },
  { devanagari: "८४", num: 84, wordHindi: "चौरासी", roman: "Chauraasee" },
  { devanagari: "८५", num: 85, wordHindi: "पचासी", roman: "Pachaasee" },
  { devanagari: "८६", num: 86, wordHindi: "छियासी", roman: "Chhiyaasee" },
  { devanagari: "८७", num: 87, wordHindi: "सतासी", roman: "Sataasee" },
  { devanagari: "८८", num: 88, wordHindi: "अट्ठासी", roman: "Atthaasee" },
  { devanagari: "८९", num: 89, wordHindi: "नवासी", roman: "Nawaasee" },
  { devanagari: "९०", num: 90, wordHindi: "नब्बे", roman: "Nabbe" },
  { devanagari: "९१", num: 91, wordHindi: "इक्यानवे", roman: "Ikyaanve" },
  { devanagari: "९२", num: 92, wordHindi: "बानवे", roman: "Baanve" },
  { devanagari: "९३", num: 93, wordHindi: "तिरानवे", roman: "Tiraanve" },
  { devanagari: "९४", num: 94, wordHindi: "चौरानवे", roman: "Chauraanve" },
  { devanagari: "९५", num: 95, wordHindi: "पंचानवे", roman: "Panchaanve" },
  { devanagari: "९६", num: 96, wordHindi: "छियानवे", roman: "Chhiyaanve" },
  { devanagari: "९७", num: 97, wordHindi: "सत्तानवे", roman: "Sattaanve" },
  { devanagari: "९८", num: 98, wordHindi: "अट्ठानवे", roman: "Atthaanve" },
  { devanagari: "९९", num: 99, wordHindi: "निन्यानवे", roman: "Ninyaanve" },
  { devanagari: "१००", num: 100, wordHindi: "सौ", roman: "Sau", emojiCount: "💯" },
];

export function HindiGintiExplorer() {
  const [rangeFilter, setRangeFilter] = useState<'1-20' | '21-50' | '51-100' | 'all'>('1-20');
  const [activeNum, setActiveNum] = useState<number | null>(null);

  const { speakHindi, isSpeaking, speakingText } = useSpeech();
  const { addStars } = useChildProfile();

  const filtered = HINDI_GINTI.filter((item) => {
    if (rangeFilter === '1-20') return item.num >= 1 && item.num <= 20;
    if (rangeFilter === '21-50') return item.num >= 21 && item.num <= 50;
    if (rangeFilter === '51-100') return item.num >= 51 && item.num <= 100;
    return true;
  });

  const handlePlay = (item: HindiNumber) => {
    soundEffects.playPop();
    setActiveNum(item.num);
    speakHindi(`${item.devanagari}। ${item.wordHindi}`, { rate: 0.85 });
    addStars(1, 'hindi');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            <span>हिंदी गिनती (Hindi Counting 1 to 100) 🔢</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            १ से १०० तक हिंदी गिनती
          </h2>
          <p className="text-xs sm:text-sm font-bold text-blue-100 max-w-xl">
            अंक पर क्लिक करके हिंदी शब्द और शुद्ध उच्चारण सुनें!
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
          💯
        </div>
      </div>

      {/* Range Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => {
            soundEffects.playPop();
            setRangeFilter('1-20');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            rangeFilter === '1-20'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          १ से २० (1–20)
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setRangeFilter('21-50');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            rangeFilter === '21-50'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          २१ से ५० (21–50)
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setRangeFilter('51-100');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            rangeFilter === '51-100'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          ५१ से १०० (51–100)
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setRangeFilter('all');
          }}
          className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            rangeFilter === 'all'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          सभी १०० अंक (All 100)
        </button>
      </div>

      {/* Numbers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 animate-in fade-in">
        {filtered.map((item) => {
          const isPlaying = isSpeaking && speakingText?.includes(item.wordHindi);

          return (
            <div
              key={item.num}
              onClick={() => handlePlay(item)}
              className={`bg-white p-4 rounded-3xl border-3 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between text-center select-none ${
                isPlaying
                  ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
                  : 'border-indigo-200 hover:border-indigo-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-400 font-bold mb-1">
                <span className="font-mono text-xs">#{item.num}</span>
                {item.emojiCount && <span className="text-sm">{item.emojiCount}</span>}
              </div>

              <div className="my-1.5">
                <span className="text-4xl sm:text-5xl font-black font-hindi text-stone-900 leading-tight">
                  {item.devanagari}
                </span>
              </div>

              <div className="bg-indigo-50 p-2 rounded-2xl border border-indigo-200 mt-1">
                <p className="text-base font-black font-hindi text-indigo-950">
                  {item.wordHindi}
                </p>
                <p className="text-[11px] text-stone-500 font-medium">
                  {item.roman} ({item.num})
                </p>
              </div>

              <div className="flex items-center justify-center mt-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(item);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>सुनें +1⭐</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

