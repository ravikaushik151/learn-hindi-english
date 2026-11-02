"use client";

import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/context/LanguageContext';

interface HindiAudioButtonProps {
  text: string;
  speechText?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  pitch?: number;
  className?: string;
  showSparkle?: boolean;
  forceRender?: boolean;
}

export function HindiAudioButton({
  text,
  speechText,
  label = 'हिंदी में समझें',
  size = 'md',
  rate = 0.85,
  pitch = 1.0,
  className = '',
  showSparkle = false,
  forceRender = false,
}: HindiAudioButtonProps) {
  let showHindi = true;
  try {
    const langCtx = useLanguage();
    showHindi = langCtx.shouldShowHindi();
  } catch (e) {
    showHindi = true;
  }

  const { speakHindi, isSpeaking, speakingText, speakingLang } = useSpeech();
  const textToPlay = speechText || text;
  const currentlyPlayingThis = isSpeaking && speakingLang === 'hi' && speakingText === textToPlay;

  // Strict language isolation: Hide Hindi audio buttons when English mode is active
  if (!showHindi && !forceRender) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakHindi(textToPlay, { rate, pitch });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1 rounded-xl',
    md: 'px-3.5 py-2 text-xs md:text-sm gap-2 rounded-2xl font-bold',
    lg: 'px-5 py-2.5 text-sm md:text-base gap-2.5 rounded-3xl font-extrabold',
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Listen in Hindi: ${textToPlay}`}
        title={`हिंदी में सुनें: "${textToPlay}"`}
        className={`inline-flex items-center justify-center font-hindi transition-all duration-200 active:scale-95 shadow-sm select-none ${
          currentlyPlayingThis
            ? 'bg-orange-500 text-white ring-4 ring-orange-200 animate-pulse'
            : 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-2 border-orange-300 hover:border-orange-400'
        } ${sizeClasses[size]} ${className}`}
      >
        <Volume2
          className={`${
            size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
          } ${currentlyPlayingThis ? 'animate-bounce text-white' : 'text-orange-600'}`}
        />
        <span>🇮🇳 {label}</span>
        {showSparkle && <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />}
      </button>
    </div>
  );
}
