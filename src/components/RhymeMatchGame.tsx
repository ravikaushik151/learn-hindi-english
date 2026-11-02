"use client";

import React, { useState, useEffect } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import { useChildProfile } from '@/context/ChildProfileContext';
import { soundEffects } from '@/lib/sounds';
import { Sparkles, RotateCcw, Check, Star, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RhymePair {
  id: string;
  word1: string;
  word2: string;
  hindi1: string;
  hindi2: string;
  emoji1: string;
  emoji2: string;
}

const RHYME_PAIRS: RhymePair[] = [
  { id: 'r1', word1: 'Cat', word2: 'Bat', hindi1: 'बिल्ली', hindi2: 'चमगादड़ / बल्ला', emoji1: '🐱', emoji2: '🦇' },
  { id: 'r2', word1: 'Sun', word2: 'Run', hindi1: 'सूरज', hindi2: 'दौड़ना', emoji1: '☀️', emoji2: '🏃' },
  { id: 'r3', word1: 'Hen', word2: 'Pen', hindi1: 'मुर्गी', hindi2: 'कलम', emoji1: '🐔', emoji2: '🖊️' },
  { id: 'r4', word1: 'Star', word2: 'Car', hindi1: 'तारा', hindi2: 'गाड़ी', emoji1: '⭐', emoji2: '🚗' },
  { id: 'r5', word1: 'Frog', word2: 'Dog', hindi1: 'मेंढक', hindi2: 'कुत्ता', emoji1: '🐸', emoji2: '🐶' },
  { id: 'r6', word1: 'Fish', word2: 'Dish', hindi1: 'मछली', hindi2: 'थाली', emoji1: '🐟', emoji2: '🍽️' },
];

interface CardItem {
  cardId: string;
  pairId: string;
  word: string;
  hindi: string;
  emoji: string;
  isMatched: boolean;
}

export function RhymeMatchGame({ onBack }: { onBack?: () => void }) {
  const { speakEnglish } = useSpeech();
  const { activeProfile, recordActivity, addStars, isLoggedIn } = useChildProfile();

  const kidName = isLoggedIn ? activeProfile.name : 'नन्हा छात्र';

  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedFirst, setSelectedFirst] = useState<CardItem | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<CardItem | null>(null);
  const [matchesFound, setMatchesFound] = useState<number>(0);

  // Initialize and shuffle cards
  const initializeGame = () => {
    const cardList: CardItem[] = [];
    RHYME_PAIRS.forEach((p) => {
      cardList.push({
        cardId: `${p.id}-1`,
        pairId: p.id,
        word: p.word1,
        hindi: p.hindi1,
        emoji: p.emoji1,
        isMatched: false,
      });
      cardList.push({
        cardId: `${p.id}-2`,
        pairId: p.id,
        word: p.word2,
        hindi: p.hindi2,
        emoji: p.emoji2,
        isMatched: false,
      });
    });

    // Shuffle
    cardList.sort(() => Math.random() - 0.5);
    setCards(cardList);
    setSelectedFirst(null);
    setSelectedSecond(null);
    setMatchesFound(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: CardItem) => {
    if (card.isMatched || selectedSecond) return;
    soundEffects.playPop();
    speakEnglish(card.word);

    if (!selectedFirst) {
      setSelectedFirst(card);
    } else if (selectedFirst.cardId !== card.cardId) {
      setSelectedSecond(card);

      // Check match
      if (selectedFirst.pairId === card.pairId) {
        // MATCH!
        setTimeout(() => {
          soundEffects.playSuccess();
          speakEnglish(`${selectedFirst.word} and ${card.word} rhyme!`);
          
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === card.pairId ? { ...c, isMatched: true } : c
            )
          );
          setMatchesFound((prev) => {
            const nextCount = prev + 1;
            if (nextCount === RHYME_PAIRS.length) {
              // ALL MATCHED!
              soundEffects.playCelebration();
              confetti({ particleCount: 80, spread: 70 });
            }
            return nextCount;
          });

          // Record to child profile
          recordActivity({
            word: `${selectedFirst.word} + ${card.word}`,
            meaningHindi: 'तुकबंदी वाले शब्द (Rhyme pair)',
            language: 'english',
            activityType: 'rhyme',
            score: 100,
            isCorrect: true,
            attempts: 1,
          });

          setSelectedFirst(null);
          setSelectedSecond(null);
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          soundEffects.playTryAgain();
          setSelectedFirst(null);
          setSelectedSecond(null);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-stone-900 font-black text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>वापस (Back)</span>
          </button>
        )}

        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-black text-stone-900">
            तुकबंदी वाले शब्द मिलाओ (Rhyme Match) 🎵
          </h2>
          <p className="text-xs text-stone-500 font-hindi">
            एक जैसी ध्वनि वाले दो कार्ड्स पर क्लिक करें!
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playPop();
            initializeGame();
          }}
          className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>रीसेट</span>
        </button>
      </div>

      {/* Progress & Star Indicator */}
      <div className="flex items-center justify-between bg-amber-50 p-3 rounded-2xl border border-amber-200">
        <span className="text-xs font-bold text-stone-600">
          जोड़े मिले: <strong>{matchesFound} / {RHYME_PAIRS.length}</strong>
        </span>
        <div className="flex items-center gap-1 text-sm font-black text-amber-600">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{kidName} • ⭐ +{matchesFound * 2}</span>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isSelected =
            selectedFirst?.cardId === card.cardId || selectedSecond?.cardId === card.cardId;

          return (
            <div
              key={card.cardId}
              onClick={() => handleCardClick(card)}
              className={`p-4 sm:p-6 rounded-3xl border-3 text-center cursor-pointer transition-all transform active:scale-95 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] select-none ${
                card.isMatched
                  ? 'bg-emerald-100 border-emerald-400 opacity-80 cursor-default scale-98'
                  : isSelected
                  ? 'bg-amber-300 border-amber-500 shadow-xl scale-105 ring-4 ring-amber-200'
                  : 'bg-white border-amber-200 shadow-md hover:border-amber-400 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div className="text-3xl sm:text-5xl mb-1.5 transition-transform">
                {card.emoji}
              </div>
              <div className="text-base sm:text-xl font-black text-stone-900">
                {card.word}
              </div>
              <div className="text-[11px] font-hindi text-stone-500 font-semibold mt-0.5">
                {card.hindi}
              </div>

              {card.isMatched && (
                <div className="mt-1 px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-black rounded-full">
                  मिल गया ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {matchesFound === RHYME_PAIRS.length && (
        <div className="p-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 rounded-3xl text-white text-center space-y-3 shadow-xl animate-in zoom-in-95">
          <div className="text-5xl">🏆</div>
          <h3 className="text-2xl font-black">
            शाबाश {kidName}! तुमने सारे तुकबंदी शब्द मिला दिए!
          </h3>
          <p className="text-sm font-medium text-emerald-100 font-hindi">
            आपको मिले +{RHYME_PAIRS.length * 2} चमचमाते सितारे!
          </p>
          <button
            onClick={() => {
              soundEffects.playCelebration();
              initializeGame();
            }}
            className="px-6 py-3 bg-white text-emerald-900 font-black text-sm rounded-2xl shadow-md hover:bg-emerald-50 transition-transform active:scale-95"
          >
            फिर से खेलें 🔄
          </button>
        </div>
      )}
    </div>
  );
}

