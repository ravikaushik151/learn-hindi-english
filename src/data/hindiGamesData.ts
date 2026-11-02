export interface PictureLetterQuizItem {
  id: string;
  imageEmoji: string;
  wordHindi: string;
  correctLetter: string;
  options: string[];
  hint: string;
}

export interface MissingLetterQuizItem {
  id: string;
  imageEmoji: string;
  fullWord: string;
  displayParts: string[]; // e.g. ["ज", "_"]
  correctLetter: string;
  options: string[];
  meaning: string;
}

export interface RhymePairItem {
  id: string;
  word1: string;
  emoji1: string;
  word2: string;
  emoji2: string;
  tukSound: string;
}

export interface WordBuilderQuizItem {
  id: string;
  word: string;
  emoji: string;
  meaning: string;
  letters: string[];
}

export interface GintiTrainItem {
  id: string;
  sequence: (string | null)[]; // e.g. ["१", "२", null, "४"]
  correctNumDevanagari: string;
  correctNumWord: string;
  options: string[];
}

// 1. चित्र देखकर पहला अक्षर चुनो (20+ items)
export const HINDI_PICTURE_LETTER_ITEMS: PictureLetterQuizItem[] = [
  { id: "pl-1", imageEmoji: "🍎", wordHindi: "अनार", correctLetter: "अ", options: ["अ", "आ", "इ", "क"], hint: "अ से अनार" },
  { id: "pl-2", imageEmoji: "🥭", wordHindi: "आम", correctLetter: "आ", options: ["आ", "अ", "ओ", "म"], hint: "आ से आम" },
  { id: "pl-3", imageEmoji: "🟤", wordHindi: "इमली", correctLetter: "इ", options: ["इ", "ई", "उ", "ल"], hint: "इ से इमली" },
  { id: "pl-4", imageEmoji: "🎋", wordHindi: "ईख", correctLetter: "ई", options: ["ई", "इ", "ऋ", "ख"], hint: "ई से ईख" },
  { id: "pl-5", imageEmoji: "🦉", wordHindi: "उल्लू", correctLetter: "उ", options: ["उ", "ऊ", "ओ", "ल"], hint: "उ से उल्लू" },
  { id: "pl-6", imageEmoji: "🕊️", wordHindi: "कबूतर", correctLetter: "क", options: ["क", "ख", "ग", "प"], hint: "क से कबूतर" },
  { id: "pl-7", imageEmoji: "🐇", wordHindi: "खरगोश", correctLetter: "ख", options: ["ख", "क", "ग", "र"], hint: "ख से खरगोश" },
  { id: "pl-8", imageEmoji: "🪴", wordHindi: "गमला", correctLetter: "ग", options: ["ग", "घ", "क", "म"], hint: "ग से गमला" },
  { id: "pl-9", imageEmoji: "🏠", wordHindi: "घर", correctLetter: "घ", options: ["घ", "ग", "ध", "र"], hint: "घ से घर" },
  { id: "pl-10", imageEmoji: "🥄", wordHindi: "चम्मच", correctLetter: "च", options: ["च", "छ", "ज", "म"], hint: "च से चम्मच" },
  { id: "pl-11", imageEmoji: "☂️", wordHindi: "छाता", correctLetter: "छ", options: ["छ", "च", "ज", "त"], hint: "छ से छाता" },
  { id: "pl-12", imageEmoji: "🚢", wordHindi: "जहाज", correctLetter: "ज", options: ["ज", "झ", "च", "ह"], hint: "ज से जहाज" },
  { id: "pl-13", imageEmoji: "🚩", wordHindi: "झंडा", correctLetter: "झ", options: ["झ", "ज", "ट", "ड"], hint: "झ से झंडा" },
  { id: "pl-14", imageEmoji: "🍅", wordHindi: "टमाटर", correctLetter: "ट", options: ["ट", "ठ", "ड", "म"], hint: "ट से टमाटर" },
  { id: "pl-15", imageEmoji: "🍉", wordHindi: "तरबूज", correctLetter: "त", options: ["त", "थ", "द", "र"], hint: "त से तरबूज" },
  { id: "pl-16", imageEmoji: "🚰", wordHindi: "नल", correctLetter: "न", options: ["न", "म", "ल", "प"], hint: "न से नल" },
  { id: "pl-17", imageEmoji: "🪁", wordHindi: "पतंग", correctLetter: "प", options: ["प", "फ", "ब", "त"], hint: "प से पतंग" },
  { id: "pl-18", imageEmoji: "🍎", wordHindi: "फल", correctLetter: "फ", options: ["फ", "प", "ब", "ल"], hint: "फ से फल" },
  { id: "pl-19", imageEmoji: "🐟", wordHindi: "मछली", correctLetter: "म", options: ["म", "न", "ब", "छ"], hint: "म से मछली" },
  { id: "pl-20", imageEmoji: "🐘", wordHindi: "हाथी", correctLetter: "ह", options: ["ह", "थ", "ध", "स"], hint: "ह से हाथी" },
];

// 2. गायब अक्षर भरो (Missing Letter Quiz)
export const HINDI_MISSING_LETTER_ITEMS: MissingLetterQuizItem[] = [
  { id: "ml-1", imageEmoji: "💧", fullWord: "जल", displayParts: ["ज", "_"], correctLetter: "ल", options: ["ल", "प", "स", "म"], meaning: "पानी" },
  { id: "ml-2", imageEmoji: "🏠", fullWord: "घर", displayParts: ["घ", "_"], correctLetter: "र", options: ["र", "ल", "न", "त"], meaning: "निवास" },
  { id: "ml-3", imageEmoji: "🚌", fullWord: "बस", displayParts: ["ब", "_"], correctLetter: "स", options: ["स", "म", "क", "ल"], meaning: "सवारी गाड़ी" },
  { id: "ml-4", imageEmoji: "🚰", fullWord: "नल", displayParts: ["न", "_"], correctLetter: "ल", options: ["ल", "क", "ट", "य"], meaning: "पानी का नल" },
  { id: "ml-5", imageEmoji: "🍎", fullWord: "फल", displayParts: ["फ", "_"], correctLetter: "ल", options: ["ल", "र", "म", "स"], meaning: "मीठे फल" },
  { id: "ml-6", imageEmoji: "🪷", fullWord: "कमल", displayParts: ["क", "_", "ल"], correctLetter: "म", options: ["म", "न", "र", "त"], meaning: "राष्ट्रीय फूल" },
  { id: "ml-7", imageEmoji: "🟢", fullWord: "मटर", displayParts: ["म", "ट", "_"], correctLetter: "र", options: ["र", "ल", "स", "प"], meaning: "हरी सब्जी" },
  { id: "ml-8", imageEmoji: "🛣️", fullWord: "सड़क", displayParts: ["स", "_", "क"], correctLetter: "ड़", options: ["ड़", "त", "म", "ल"], meaning: "रास्ता" },
  { id: "ml-9", imageEmoji: "✒️", fullWord: "कलम", displayParts: ["क", "ल", "_"], correctLetter: "म", options: ["म", "र", "क", "न"], meaning: "पेन" },
  { id: "ml-10", imageEmoji: "🍯", fullWord: "शहद", displayParts: ["श", "ह", "_"], correctLetter: "द", options: ["द", "क", "ल", "म"], meaning: "मधु" },
  { id: "ml-11", imageEmoji: "🐍", fullWord: "अजगर", displayParts: ["अ", "ज", "ग", "_"], correctLetter: "र", options: ["र", "न", "स", "ल"], meaning: "बड़ा सांप" },
  { id: "ml-12", imageEmoji: "🌳", fullWord: "बरगद", displayParts: ["ब", "र", "ग", "_"], correctLetter: "द", options: ["द", "त", "र", "न"], meaning: "राष्ट्रीय पेड़" },
  { id: "ml-13", imageEmoji: "🫚", fullWord: "अदरक", displayParts: ["अ", "द", "र", "_"], correctLetter: "क", options: ["क", "प", "ल", "म"], meaning: "सब्जी / मसाला" },
  { id: "ml-14", imageEmoji: "🏋️", fullWord: "कसरत", displayParts: ["क", "स", "र", "_"], correctLetter: "त", options: ["त", "प", "न", "ल"], meaning: "व्यायाम" },
];

// 3. तुकबंदी मिलाओ (Rhyming Pairs)
export const HINDI_RHYME_PAIRS: RhymePairItem[] = [
  { id: "rp-1", word1: "जल", emoji1: "💧", word2: "नल", emoji2: "🚰", tukSound: "-ल ध्वनि" },
  { id: "rp-2", word1: "घर", emoji1: "🏠", word2: "पर", emoji2: "🪶", tukSound: "-र ध्वनि" },
  { id: "rp-3", word1: "राजा", emoji1: "👑", word2: "बाजा", emoji2: "🎺", tukSound: "-जा ध्वनि" },
  { id: "rp-4", word1: "रात", emoji1: "🌙", word2: "बात", emoji2: "💬", tukSound: "-त ध्वनि" },
  { id: "rp-5", word1: "मोर", emoji1: "🦚", word2: "चोर", emoji2: "🦹", tukSound: "-ओर ध्वनि" },
  { id: "rp-6", word1: "सेब", emoji1: "🍎", word2: "जेब", emoji2: "👛", tukSound: "-एब ध्वनि" },
  { id: "rp-7", word1: "खेल", emoji1: "⚽", word2: "रेल", emoji2: "🚂", tukSound: "-एल ध्वनि" },
  { id: "rp-8", word1: "तारा", emoji1: "⭐", word2: "धारा", emoji2: "🌊", tukSound: "-आरा ध्वनि" },
  { id: "rp-9", word1: "मटर", emoji1: "🟢", word2: "शटर", emoji2: "🏪", tukSound: "-टर ध्वनि" },
  { id: "rp-10", word1: "पानी", emoji1: "🥛", word2: "नानी", emoji2: "👵", tukSound: "-आनी ध्वनि" },
];

// 4. शब्द बनाओ पहेली (Word Builder Items)
export const HINDI_WORD_BUILDER_ITEMS: WordBuilderQuizItem[] = [
  { id: "wb-1", word: "कमल", emoji: "🪷", meaning: "Lotus", letters: ["क", "म", "ल"] },
  { id: "wb-2", word: "मटर", emoji: "🟢", meaning: "Green Peas", letters: ["म", "ट", "र"] },
  { id: "wb-3", word: "सड़क", emoji: "🛣️", meaning: "Road", letters: ["स", "ड़", "क"] },
  { id: "wb-4", word: "कलम", emoji: "✒️", meaning: "Pen", letters: ["क", "ल", "म"] },
  { id: "wb-5", word: "महल", emoji: "🏰", meaning: "Palace", letters: ["म", "ह", "ल"] },
  { id: "wb-6", word: "शहद", emoji: "🍯", meaning: "Honey", letters: ["श", "ह", "द"] },
  { id: "wb-7", word: "अजगर", emoji: "🐍", meaning: "Python", letters: ["अ", "ज", "ग", "र"] },
  { id: "wb-8", word: "बरगद", emoji: "🌳", meaning: "Banyan Tree", letters: ["ब", "र", "ग", "द"] },
  { id: "wb-9", word: "अदरक", emoji: "🫚", meaning: "Ginger", letters: ["अ", "द", "र", "क"] },
  { id: "wb-10", word: "कसरत", emoji: "🏋️", meaning: "Exercise", letters: ["क", "स", "र", "त"] },
];

// 5. हिंदी गिनती की रेलगाड़ी (Ginti Train Sequence)
export const HINDI_GINTI_TRAIN_ITEMS: GintiTrainItem[] = [
  { id: "gt-1", sequence: ["१", "२", null, "४"], correctNumDevanagari: "३", correctNumWord: "तीन", options: ["३", "५", "६"] },
  { id: "gt-2", sequence: ["४", "५", null, "७"], correctNumDevanagari: "६", correctNumWord: "छह", options: ["६", "८", "९"] },
  { id: "gt-3", sequence: ["७", "८", null, "१०"], correctNumDevanagari: "९", correctNumWord: "नौ", options: ["९", "६", "५"] },
  { id: "gt-4", sequence: ["१०", "११", null, "१३"], correctNumDevanagari: "१२", correctNumWord: "बारह", options: ["१२", "१४", "१५"] },
  { id: "gt-5", sequence: ["१४", "१५", null, "१७"], correctNumDevanagari: "१६", correctNumWord: "सोलह", options: ["१६", "१८", "१९"] },
  { id: "gt-6", sequence: ["१७", "१८", null, "२०"], correctNumDevanagari: "१९", correctNumWord: "उन्नीस", options: ["१९", "१३", "१५"] },
  { id: "gt-7", sequence: ["२१", "२२", null, "२४"], correctNumDevanagari: "२३", correctNumWord: "तेईस", options: ["२३", "२५", "२६"] },
  { id: "gt-8", sequence: ["२८", "२९", null, "३१"], correctNumDevanagari: "३०", correctNumWord: "तीस", options: ["३०", "३२", "३३"] },
];
