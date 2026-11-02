"use client";

import React, { useState, useEffect } from 'react';
import {
  HINDI_PICTURE_LETTER_ITEMS,
  HINDI_MISSING_LETTER_ITEMS,
  HINDI_RHYME_PAIRS,
  HINDI_WORD_BUILDER_ITEMS,
  HINDI_GINTI_TRAIN_ITEMS,
  PictureLetterQuizItem,
  MissingLetterQuizItem,
  RhymePairItem,
  WordBuilderQuizItem,
  GintiTrainItem,
} from '@/data/hindiGamesData';
import { soundEffects } from '@/lib/sounds';
import { useSpeech } from '@/hooks/useSpeech';
import { useChildProfile } from '@/context/ChildProfileContext';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Star,
  Volume2,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Puzzle,
  Trophy,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

type HindiGameMode =
  | 'picture-letter'
  | 'word-builder-puzzle'
  | 'missing-letter'
  | 'rhyme-match'
  | 'ginti-train';

export function HindiGamesView() {
  const [activeGame, setActiveGame] = useState<HindiGameMode>('picture-letter');
  const { speakHindi } = useSpeech();
  const { addStars } = useChildProfile();

  // ----------------------------------------------------
  // 1. Picture Letter Quiz State
  // ----------------------------------------------------
  const [plIndex, setPlIndex] = useState(0);
  const [plSelected, setPlSelected] = useState<string | null>(null);
  const [plFeedback, setPlFeedback] = useState<'correct' | 'wrong' | null>(null);
  const currentPl = HINDI_PICTURE_LETTER_ITEMS[plIndex] || HINDI_PICTURE_LETTER_ITEMS[0];

  const handlePlSelect = (letter: string) => {
    if (plFeedback === 'correct') return;
    setPlSelected(letter);

    if (letter === currentPl.correctLetter) {
      soundEffects.playCelebration();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setPlFeedback('correct');
      addStars(5, 'hindi');
      speakHindi(`शाबाश! ${currentPl.correctLetter} से ${currentPl.wordHindi}!`);
      setTimeout(() => {
        setPlIndex((prev) => (prev + 1) % HINDI_PICTURE_LETTER_ITEMS.length);
        setPlSelected(null);
        setPlFeedback(null);
      }, 1800);
    } else {
      soundEffects.playTryAgain();
      setPlFeedback('wrong');
      speakHindi(`फिर से कोशिश करो!`);
      setTimeout(() => setPlFeedback(null), 1200);
    }
  };

  // ----------------------------------------------------
  // 2. Word Builder Puzzle State
  // ----------------------------------------------------
  const [wbIndex, setWbIndex] = useState(0);
  const currentWb = HINDI_WORD_BUILDER_ITEMS[wbIndex] || HINDI_WORD_BUILDER_ITEMS[0];
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [wbCompleted, setWbCompleted] = useState(false);

  useEffect(() => {
    setSelectedLetters([]);
    setWbCompleted(false);
    // Shuffle the target letters
    const shuffled = [...currentWb.letters].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [wbIndex, currentWb]);

  const handleTileClick = (letter: string, tileIndex: number) => {
    if (wbCompleted) return;
    soundEffects.playPop();
    speakHindi(letter);

    const nextSelected = [...selectedLetters, letter];
    setSelectedLetters(nextSelected);

    // Remove from options
    setShuffledOptions((prev) => prev.filter((_, idx) => idx !== tileIndex));

    // Check if fully assembled
    if (nextSelected.length === currentWb.letters.length) {
      const assembledWord = nextSelected.join('');
      if (assembledWord === currentWb.word) {
        soundEffects.playCelebration();
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        setWbCompleted(true);
        addStars(5, 'hindi');
        speakHindi(`शाबाश! ${currentWb.word}! बहुत सुंदर बनाया!`);
        setTimeout(() => {
          setWbIndex((prev) => (prev + 1) % HINDI_WORD_BUILDER_ITEMS.length);
        }, 2200);
      } else {
        soundEffects.playTryAgain();
        speakHindi(`गलत क्रम! फिर से बनाओ।`);
        setTimeout(() => {
          setSelectedLetters([]);
          setShuffledOptions([...currentWb.letters].sort(() => Math.random() - 0.5));
        }, 1200);
      }
    }
  };

  // ----------------------------------------------------
  // 3. Missing Letter Quiz State
  // ----------------------------------------------------
  const [mlIndex, setMlIndex] = useState(0);
  const [mlSelected, setMlSelected] = useState<string | null>(null);
  const [mlFeedback, setMlFeedback] = useState<'correct' | 'wrong' | null>(null);
  const currentMl = HINDI_MISSING_LETTER_ITEMS[mlIndex] || HINDI_MISSING_LETTER_ITEMS[0];

  const handleMlSelect = (letter: string) => {
    if (mlFeedback === 'correct') return;
    setMlSelected(letter);

    if (letter === currentMl.correctLetter) {
      soundEffects.playCelebration();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setMlFeedback('correct');
      addStars(5, 'hindi');
      speakHindi(`बिल्कुल सही! पूरा शब्द है: ${currentMl.fullWord}!`);
      setTimeout(() => {
        setMlIndex((prev) => (prev + 1) % HINDI_MISSING_LETTER_ITEMS.length);
        setMlSelected(null);
        setMlFeedback(null);
      }, 1800);
    } else {
      soundEffects.playTryAgain();
      setMlFeedback('wrong');
      speakHindi(`गलत अक्षर! फिर से सोचो।`);
      setTimeout(() => setMlFeedback(null), 1200);
    }
  };

  // ----------------------------------------------------
  // 4. Rhyme Match Pairs State
  // ----------------------------------------------------
  const [rhymeIndex, setRhymeIndex] = useState(0);
  const [rhymeTarget, setRhymeTarget] = useState<RhymePairItem>(HINDI_RHYME_PAIRS[0]);
  const [rhymeOptions, setRhymeOptions] = useState<RhymePairItem[]>([]);
  const [rhymeFeedback, setRhymeFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    const target = HINDI_RHYME_PAIRS[rhymeIndex % HINDI_RHYME_PAIRS.length];
    setRhymeTarget(target);
    // Pick 2 distractors
    const distractors = HINDI_RHYME_PAIRS.filter((r) => r.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const opts = [target, ...distractors].sort(() => Math.random() - 0.5);
    setRhymeOptions(opts);
    setRhymeFeedback(null);
  }, [rhymeIndex]);

  const handleRhymeSelect = (item: RhymePairItem) => {
    if (rhymeFeedback === 'correct') return;

    if (item.id === rhymeTarget.id) {
      soundEffects.playCelebration();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setRhymeFeedback('correct');
      addStars(5, 'hindi');
      speakHindi(`शाबाश! ${rhymeTarget.word1} और ${rhymeTarget.word2} तुकबंदी हैं!`);
      setTimeout(() => {
        setRhymeIndex((prev) => (prev + 1) % HINDI_RHYME_PAIRS.length);
      }, 2000);
    } else {
      soundEffects.playTryAgain();
      setRhymeFeedback('wrong');
      speakHindi(`यह तुकबंदी नहीं है! फिर से चुनो।`);
      setTimeout(() => setRhymeFeedback(null), 1200);
    }
  };

  // ----------------------------------------------------
  // 5. Ginti Train Sequence State
  // ----------------------------------------------------
  const [gtIndex, setGtIndex] = useState(0);
  const [gtSelected, setGtSelected] = useState<string | null>(null);
  const [gtFeedback, setGtFeedback] = useState<'correct' | 'wrong' | null>(null);
  const currentGt = HINDI_GINTI_TRAIN_ITEMS[gtIndex] || HINDI_GINTI_TRAIN_ITEMS[0];

  const handleGtSelect = (numStr: string) => {
    if (gtFeedback === 'correct') return;
    setGtSelected(numStr);

    if (numStr === currentGt.correctNumDevanagari) {
      soundEffects.playCelebration();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setGtFeedback('correct');
      addStars(5, 'hindi');
      speakHindi(`शाबाश! सही अंक है: ${currentGt.correctNumDevanagari}, यानी ${currentGt.correctNumWord}!`);
      setTimeout(() => {
        setGtIndex((prev) => (prev + 1) % HINDI_GINTI_TRAIN_ITEMS.length);
        setGtSelected(null);
        setGtFeedback(null);
      }, 1900);
    } else {
      soundEffects.playTryAgain();
      setGtFeedback('wrong');
      speakHindi(`गलत अंक! फिर से चुनो।`);
      setTimeout(() => setGtFeedback(null), 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
            <span>हिंदी गेम्स हब (Hindi Learning Games) 🎮</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-hindi">
            {activeGame === 'picture-letter' && 'चित्र पहचानो और सही अक्षर चुनो 🎨'}
            {activeGame === 'word-builder-puzzle' && 'शब्द बनाओ पहेली 🪷'}
            {activeGame === 'missing-letter' && 'गायब अक्षर ढूंढो 🕳️'}
            {activeGame === 'rhyme-match' && 'तुकबंदी मिलाओ (Rhyme Match) 🎵'}
            {activeGame === 'ginti-train' && 'गिनती की रेलगाड़ी (Number Train) 🚂'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-pink-100 max-w-xl font-hindi">
            मजेदार खेल खेलें, सही उत्तर दें और ढेर सारे चमचमाते सितारे जीतें!
          </p>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
          {activeGame === 'picture-letter' ? '🎨' : activeGame === 'word-builder-puzzle' ? '🧩' : activeGame === 'missing-letter' ? '🕳️' : activeGame === 'rhyme-match' ? '🎵' : '🚂'}
        </div>
      </div>

      {/* 2. Game Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/80 rounded-3xl border-2 border-amber-300 shadow-sm max-w-fit mx-auto">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveGame('picture-letter');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeGame === 'picture-letter'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🎨</span>
          <span className="font-hindi">चित्र पहचानो</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveGame('word-builder-puzzle');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeGame === 'word-builder-puzzle'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🧩</span>
          <span className="font-hindi">शब्द बनाओ</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveGame('missing-letter');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeGame === 'missing-letter'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🕳️</span>
          <span className="font-hindi">गायब अक्षर</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveGame('rhyme-match');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeGame === 'rhyme-match'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🎵</span>
          <span className="font-hindi">तुकबंदी</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveGame('ginti-train');
          }}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
            activeGame === 'ginti-train'
              ? 'bg-amber-400 text-stone-950 shadow-md ring-2 ring-amber-300 scale-102'
              : 'text-stone-700 hover:bg-white/60'
          }`}
        >
          <span>🚂</span>
          <span className="font-hindi">गिनती रेल</span>
        </button>
      </div>

      {/* ========================================================
          GAME 1: चित्र पहचानो और सही अक्षर चुनो (Picture Letter Quiz)
          ======================================================== */}
      {activeGame === 'picture-letter' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-amber-300 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400">
            <span>प्रश्न #{plIndex + 1} / {HINDI_PICTURE_LETTER_ITEMS.length}</span>
            <button
              onClick={() => speakHindi(`चित्र देखकर सही पहला अक्षर चुनो! यह क्या है?`)}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-800 font-hindi font-black"
            >
              <Volume2 className="w-4 h-4" />
              <span>प्रॉम्प्ट सुनें</span>
            </button>
          </div>

          {/* Picture Card */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl bg-gradient-to-tr from-amber-100 to-orange-100 border-4 border-amber-300 flex items-center justify-center text-7xl sm:text-8xl shadow-inner animate-bounce-gentle select-none">
            {currentPl.imageEmoji}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black font-hindi text-stone-900">
              यह क्या है? सही पहला अक्षर चुनो!
            </h3>
            <p className="text-sm font-hindi text-amber-800 font-bold">
              संकेत: {currentPl.hint}
            </p>
          </div>

          {/* Letter Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto pt-2">
            {currentPl.options.map((opt) => {
              const isSelected = plSelected === opt;
              const isCorrect = isSelected && plFeedback === 'correct';
              const isWrong = isSelected && plFeedback === 'wrong';

              return (
                <button
                  key={opt}
                  onClick={() => handlePlSelect(opt)}
                  className={`py-5 rounded-2xl font-black font-hindi text-4xl sm:text-5xl transition-all shadow-md active:scale-95 border-3 ${
                    isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-105 ring-4 ring-emerald-200'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                      : 'bg-stone-50 hover:bg-amber-100 text-stone-900 border-amber-300 hover:border-amber-400'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {plFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-black font-hindi text-base animate-in zoom-in">
              🎉 शाबाश! {currentPl.correctLetter} से {currentPl.wordHindi}! (+5 ⭐)
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          GAME 2: शब्द बनाओ पहेली (Word Builder Puzzle)
          ======================================================== */}
      {activeGame === 'word-builder-puzzle' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-amber-300 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400">
            <span>पहेली #{wbIndex + 1} / {HINDI_WORD_BUILDER_ITEMS.length}</span>
            <button
              onClick={() => {
                soundEffects.playPop();
                setSelectedLetters([]);
                setShuffledOptions([...currentWb.letters].sort(() => Math.random() - 0.5));
              }}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट करें</span>
            </button>
          </div>

          {/* Picture Card */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-100 to-teal-100 border-4 border-emerald-300 flex items-center justify-center text-6xl sm:text-7xl shadow-inner select-none">
            {currentWb.emoji}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black font-hindi text-stone-900">
              अक्षरों को सही क्रम में छूकर शब्द बनाओ!
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Meaning: {currentWb.meaning}
            </p>
          </div>

          {/* Word Slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
            {currentWb.letters.map((_, idx) => {
              const letter = selectedLetters[idx];
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 flex items-center justify-center font-black font-hindi text-4xl sm:text-5xl shadow-inner select-none transition-all ${
                    letter
                      ? 'bg-amber-300 text-stone-950 border-amber-500 scale-105'
                      : 'bg-stone-100 text-stone-300 border-dashed border-stone-300'
                  }`}
                >
                  {letter || '_'}
                </div>
              );
            })}
          </div>

          {/* Available Letter Tiles to Click */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-stone-500 font-hindi">
              👇 नीचे दिए अक्षरों को क्रम से छूएं:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {shuffledOptions.map((letter, idx) => (
                <button
                  key={`${letter}-${idx}`}
                  onClick={() => handleTileClick(letter, idx)}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-black font-hindi text-3xl sm:text-4xl shadow-lg border-2 border-sky-300 transition-all active:scale-95"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {wbCompleted && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-black font-hindi text-base animate-in zoom-in">
              🎉 शाबाश! आपने बनाया: {currentWb.word}! (+5 ⭐)
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          GAME 3: गायब अक्षर ढूंढो (Missing Letter Challenge)
          ======================================================== */}
      {activeGame === 'missing-letter' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-amber-300 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400">
            <span>शब्द #{mlIndex + 1} / {HINDI_MISSING_LETTER_ITEMS.length}</span>
            <button
              onClick={() => speakHindi(`खाली स्थान में कौन सा अक्षर आएगा?`)}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-800 font-hindi font-black"
            >
              <Volume2 className="w-4 h-4" />
              <span>सुनें</span>
            </button>
          </div>

          {/* Picture & Incomplete Word */}
          <div className="w-32 h-32 mx-auto rounded-3xl bg-amber-50 border-3 border-amber-300 flex items-center justify-center text-6xl shadow-inner">
            {currentMl.imageEmoji}
          </div>

          {/* Word with Missing Blank */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
            {currentMl.displayParts.map((part, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 flex items-center justify-center font-black font-hindi text-4xl sm:text-5xl shadow-sm ${
                  part === '_'
                    ? 'bg-amber-100 border-amber-400 border-dashed text-amber-700 animate-pulse'
                    : 'bg-white border-amber-300 text-stone-900'
                }`}
              >
                {part === '_' ? (mlSelected || '?') : part}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black font-hindi text-stone-900">
              खाली स्थान में कौन सा अक्षर आएगा?
            </h3>
            <p className="text-xs text-stone-500 font-hindi">
              अर्थ: {currentMl.meaning}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto pt-2">
            {currentMl.options.map((opt) => {
              const isSelected = mlSelected === opt;
              const isCorrect = isSelected && mlFeedback === 'correct';
              const isWrong = isSelected && mlFeedback === 'wrong';

              return (
                <button
                  key={opt}
                  onClick={() => handleMlSelect(opt)}
                  className={`py-4 rounded-2xl font-black font-hindi text-3xl sm:text-4xl transition-all shadow-md active:scale-95 border-3 ${
                    isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                      : 'bg-stone-50 hover:bg-amber-100 text-stone-900 border-amber-300'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {mlFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-black font-hindi text-base animate-in zoom-in">
              🎉 शाबाश! पूरा शब्द है: {currentMl.fullWord}! (+5 ⭐)
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          GAME 4: तुकबंदी मिलाओ (Rhyme Match Pairs)
          ======================================================== */}
      {activeGame === 'rhyme-match' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-amber-300 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400">
            <span>जोड़ी #{rhymeIndex + 1} / {HINDI_RHYME_PAIRS.length}</span>
            <button
              onClick={() => speakHindi(`${rhymeTarget.word1} की तुकबंदी चुनो!`)}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-800 font-hindi font-black"
            >
              <Volume2 className="w-4 h-4" />
              <span>सुनें</span>
            </button>
          </div>

          {/* Target Word */}
          <div className="p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl border-3 border-pink-300 max-w-sm mx-auto shadow-inner space-y-2">
            <span className="text-5xl">{rhymeTarget.emoji1}</span>
            <h3 className="text-4xl sm:text-5xl font-black font-hindi text-stone-900">
              {rhymeTarget.word1}
            </h3>
            <p className="text-xs font-bold text-pink-700 font-hindi">
              समान तुक: {rhymeTarget.tukSound}
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-hindi text-stone-900">
            "{rhymeTarget.word1}" से मिलती-जुलती तुकबंदी वाला शब्द चुनो:
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
            {rhymeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleRhymeSelect(opt)}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-pink-50 border-3 border-pink-200 hover:border-pink-400 text-stone-900 font-black font-hindi text-2xl transition-all shadow-sm hover:scale-105 active:scale-95 flex flex-col items-center gap-1"
              >
                <span className="text-3xl">{opt.emoji2}</span>
                <span>{opt.word2}</span>
              </button>
            ))}
          </div>

          {rhymeFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-black font-hindi text-base animate-in zoom-in">
              🎉 शाबाश! {rhymeTarget.word1} और {rhymeTarget.word2} तुकबंदी हैं! (+5 ⭐)
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          GAME 5: गिनती की रेलगाड़ी (Ginti Train Sequence)
          ======================================================== */}
      {activeGame === 'ginti-train' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-3 border-amber-300 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400">
            <span>रेलगाड़ी #{gtIndex + 1} / {HINDI_GINTI_TRAIN_ITEMS.length}</span>
            <button
              onClick={() => speakHindi(`रेलगाड़ी के खाली डिब्बे में कौन सा अंक आएगा?`)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-hindi font-black"
            >
              <Volume2 className="w-4 h-4" />
              <span>सुनें</span>
            </button>
          </div>

          {/* Train Visual */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-3xl border-3 border-indigo-300 shadow-inner overflow-x-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max">
              {/* Engine */}
              <div className="text-4xl sm:text-5xl">🚂</div>

              {/* Wagons */}
              {currentGt.sequence.map((wagon, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-3 flex flex-col items-center justify-center font-black font-hindi text-3xl sm:text-4xl shadow-md ${
                    wagon === null
                      ? 'bg-amber-300 border-amber-500 text-stone-950 animate-bounce'
                      : 'bg-white border-indigo-400 text-indigo-950'
                  }`}
                >
                  <span className="text-[10px] text-stone-400 font-mono">#{idx + 1}</span>
                  <span>{wagon === null ? (gtSelected || '?') : wagon}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black font-hindi text-stone-900">
              खाली डिब्बे (?) में कौन सा अंक आएगा?
            </h3>
          </div>

          {/* Options */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            {currentGt.options.map((opt) => {
              const isSelected = gtSelected === opt;
              const isCorrect = isSelected && gtFeedback === 'correct';
              const isWrong = isSelected && gtFeedback === 'wrong';

              return (
                <button
                  key={opt}
                  onClick={() => handleGtSelect(opt)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl font-black font-hindi text-4xl sm:text-5xl transition-all shadow-md active:scale-95 border-3 flex items-center justify-center ${
                    isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                      : 'bg-stone-50 hover:bg-amber-100 text-stone-900 border-amber-300'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {gtFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-2xl font-black font-hindi text-base animate-in zoom-in">
              🎉 शाबाश! सही अंक है: {currentGt.correctNumDevanagari} ({currentGt.correctNumWord})! (+5 ⭐)
            </div>
          )}
        </div>
      )}

      {/* 3. Quick Links to Fullscreen Interactive Activities */}
      <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black font-hindi text-amber-950">
              और भी मजेदार खेल व गतिविधियाँ 🎪
            </h3>
            <p className="text-xs text-stone-500 font-hindi">
              पूरी स्क्रीन पर खेलें और अपनी आवाज़ रिकॉर्ड करें
            </p>
          </div>
          <span className="text-2xl">🎯</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/word-builder"
            className="p-3.5 bg-white hover:bg-orange-50 border-2 border-orange-200 rounded-2xl transition-all flex items-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🧩</span>
            <div>
              <h4 className="font-black text-xs font-hindi text-stone-900">चित्र शब्द बनाओ (6 स्तर)</h4>
              <p className="text-[10px] text-stone-500 font-hindi">270+ बारहखड़ी शब्द</p>
            </div>
          </Link>

          <Link
            href="/practice"
            className="p-3.5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 rounded-2xl transition-all flex items-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🎙️</span>
            <div>
              <h4 className="font-black text-xs font-hindi text-stone-900">सुनो और बोलो</h4>
              <p className="text-[10px] text-stone-500 font-hindi">माइक से बोलकर अभ्यास</p>
            </div>
          </Link>

          <Link
            href="/sound-reading"
            className="p-3.5 bg-white hover:bg-teal-50 border-2 border-teal-200 rounded-2xl transition-all flex items-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
            <div>
              <h4 className="font-black text-xs font-hindi text-stone-900">शब्द-पठन ब्लेंडिंग</h4>
              <p className="text-[10px] text-stone-500 font-hindi">ध्वनियाँ जोड़कर पढ़ें</p>
            </div>
          </Link>

          <Link
            href="/my-voice"
            className="p-3.5 bg-white hover:bg-sky-50 border-2 border-sky-200 rounded-2xl transition-all flex items-center gap-3 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🎧</span>
            <div>
              <h4 className="font-black text-xs font-hindi text-stone-900">मेरी आवाज़ रिकॉर्डर</h4>
              <p className="text-[10px] text-stone-500 font-hindi">ध्वनि तरंगें व मिलान</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
