// Auto-generated 200+ Class-Wise Curriculum & Practice Questions
// Covering Nursery, Class 1, Class 2, Class 3, and Class 4-5 across Maths, English & Hindi

export type GradeLevel = 'nursery' | 'class-1' | 'class-2' | 'class-3' | 'class-4-5';

export interface CurriculumTopic {
  id: string;
  titleEnglish: string;
  titleHindi: string;
  descriptionEnglish: string;
  descriptionHindi: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyConcepts: { english: string; hindi: string }[];
  quizQuestions: {
    questionEnglish: string;
    questionHindi: string;
    visual?: string;
    options: string[];
    correctAnswer: string;
    explanationEnglish: string;
    explanationHindi: string;
  }[];
}

export interface GradeCurriculum {
  id: GradeLevel;
  gradeLabelEnglish: string;
  gradeLabelHindi: string;
  ageRange: string;
  color: string;
  englishTopics: CurriculumTopic[];
  hindiTopics: CurriculumTopic[];
  mathsTopics: CurriculumTopic[];
  scienceTopics: CurriculumTopic[];
  gkTopics: CurriculumTopic[];
}

export const CLASS_WISE_CURRICULUM: Record<GradeLevel, GradeCurriculum> = {
  "nursery": {
    "id": "nursery",
    "gradeLabelEnglish": "Nursery & LKG",
    "gradeLabelHindi": "नर्सरी और LKG",
    "ageRange": "Age 3-4 Yrs",
    "color": "from-amber-400 to-orange-400",
    "mathsTopics": [
      {
        "id": "nursery-math-1",
        "titleEnglish": "Counting 1 to 10",
        "titleHindi": "गिनती १ से १० (Counting 1-10)",
        "descriptionEnglish": "Count bright colorful objects, fingers, and toys with voice audio.",
        "descriptionHindi": "सेब, तारे और गुब्बारों को गिनकर संख्या पहचानना सीखें।",
        "icon": "🔢",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "1 = 🍎 (One)",
            "hindi": "१ = 🍎 (एक)"
          },
          {
            "english": "2 = 🍎🍎 (Two)",
            "hindi": "२ = 🍎🍎 (दो)"
          },
          {
            "english": "3 = 🍎🍎🍎 (Three)",
            "hindi": "३ = 🍎🍎🍎 (तीन)"
          },
          {
            "english": "5 = 🖐️ (Five fingers)",
            "hindi": "५ = 🖐️ (पाँच उंगलियाँ)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "How many apples are there? 🍎🍎🍎",
            "questionHindi": "यहाँ कितने सेब हैं? 🍎🍎🍎",
            "visual": "🍎🍎🍎",
            "options": [
              "2",
              "3",
              "4",
              "5"
            ],
            "correctAnswer": "3",
            "explanationEnglish": "There are 3 delicious red apples!",
            "explanationHindi": "यहाँ ३ लाल सेब हैं!"
          },
          {
            "questionEnglish": "Count the stars: ⭐⭐⭐⭐⭐",
            "questionHindi": "सितारे गिनें: ⭐⭐⭐⭐⭐",
            "visual": "⭐⭐⭐⭐⭐",
            "options": [
              "4",
              "5",
              "6",
              "3"
            ],
            "correctAnswer": "5",
            "explanationEnglish": "There are 5 bright shiny stars!",
            "explanationHindi": "यहाँ ५ चमकीले सितारे हैं!"
          },
          {
            "questionEnglish": "How many cars do you see? 🚗🚗",
            "questionHindi": "यहाँ कितनी गाड़ियाँ हैं? 🚗🚗",
            "visual": "🚗🚗",
            "options": [
              "1",
              "2",
              "3",
              "4"
            ],
            "correctAnswer": "2",
            "explanationEnglish": "There are 2 speedy cars!",
            "explanationHindi": "यहाँ २ गाड़ियाँ हैं!"
          },
          {
            "questionEnglish": "Count the cute ducks: 🦆🦆🦆🦆",
            "questionHindi": "बतखों को गिनें: 🦆🦆🦆🦆",
            "visual": "🦆🦆🦆🦆",
            "options": [
              "3",
              "4",
              "5",
              "2"
            ],
            "correctAnswer": "4",
            "explanationEnglish": "There are 4 happy yellow ducks!",
            "explanationHindi": "यहाँ ४ बतखें हैं!"
          },
          {
            "questionEnglish": "How many balloons are floating? 🎈🎈🎈🎈🎈🎈",
            "questionHindi": "कितने गुब्बारे उड़ रहे हैं? 🎈🎈🎈🎈🎈🎈",
            "visual": "🎈🎈🎈🎈🎈🎈",
            "options": [
              "5",
              "6",
              "7",
              "4"
            ],
            "correctAnswer": "6",
            "explanationEnglish": "There are 6 colorful balloons!",
            "explanationHindi": "यहाँ ६ रंग-बिरंगे गुब्बारे हैं!"
          }
        ]
      },
      {
        "id": "nursery-math-2",
        "titleEnglish": "Shapes & Colors",
        "titleHindi": "आकार और रंग (Shapes & Colors)",
        "descriptionEnglish": "Identify Circle, Square, Triangle, and vibrant colors.",
        "descriptionHindi": "गोल (वृत्त), चौकोर (वर्ग) और त्रिकोण पहचानें।",
        "icon": "🔵",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "Circle 🔴 is round like a ball",
            "hindi": "गोला 🔴 गेंद जैसा गोल होता है"
          },
          {
            "english": "Square 🟦 has 4 equal sides",
            "hindi": "चौकोर 🟦 की ४ बराबर भुजाएं होती हैं"
          },
          {
            "english": "Triangle 🔺 has 3 corners",
            "hindi": "त्रिकोण 🔺 के ३ कोने होते हैं"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Which shape is round like a wheel? 🔴",
            "questionHindi": "पहिए जैसा गोल कौन सा आकार है? 🔴",
            "visual": "🔴",
            "options": [
              "Circle (गोला)",
              "Square (चौकोर)",
              "Triangle (त्रिकोण)"
            ],
            "correctAnswer": "Circle (गोला)",
            "explanationEnglish": "A circle is round with no corners!",
            "explanationHindi": "गोला (Circle) गेंद और पहिए जैसा गोल होता है!"
          },
          {
            "questionEnglish": "Which shape has 3 corners like a pizza slice? 🔺",
            "questionHindi": "पिज्ज़ा स्लाइस जैसा ३ कोनों वाला आकार कौन सा है? 🔺",
            "visual": "🍕 🔺",
            "options": [
              "Triangle (त्रिकोण)",
              "Circle (गोला)",
              "Square (चौकोर)"
            ],
            "correctAnswer": "Triangle (त्रिकोण)",
            "explanationEnglish": "A triangle has exactly 3 corners and 3 sides!",
            "explanationHindi": "त्रिकोण (Triangle) में ३ कोने होते हैं!"
          },
          {
            "questionEnglish": "Which shape has 4 equal sides like a gift box? 🟦",
            "questionHindi": "गिफ्ट बॉक्स जैसा ४ बराबर भुजाओं वाला आकार कौन सा है? 🟦",
            "visual": "🎁 🟦",
            "options": [
              "Square (चौकोर)",
              "Circle (गोला)",
              "Triangle (त्रिकोण)"
            ],
            "correctAnswer": "Square (चौकोर)",
            "explanationEnglish": "A square has 4 equal sides and 4 straight corners!",
            "explanationHindi": "वर्ग (Square) की चारों भुजाएं बराबर होती हैं!"
          },
          {
            "questionEnglish": "What color is the bright shining sun? ☀️",
            "questionHindi": "चमकते हुए सूरज का रंग कौन सा होता है? ☀️",
            "visual": "☀️",
            "options": [
              "Yellow (पीला)",
              "Blue (नीला)",
              "Green (हरा)",
              "Pink (गुलाबी)"
            ],
            "correctAnswer": "Yellow (पीला)",
            "explanationEnglish": "The sun shines with a bright yellow light!",
            "explanationHindi": "सूरज पीले रंग का चमकता है!"
          },
          {
            "questionEnglish": "What color is the fresh garden grass? 🌱",
            "questionHindi": "ताज़ी हरी घास का रंग कौन सा होता है? 🌱",
            "visual": "🌱",
            "options": [
              "Green (हरा)",
              "Red (लाल)",
              "Black (काला)",
              "Purple (बैंगनी)"
            ],
            "correctAnswer": "Green (हरा)",
            "explanationEnglish": "Grass and plant leaves are green!",
            "explanationHindi": "घास और पेड़ के पत्ते हरे होते हैं!"
          }
        ]
      },
      {
        "id": "nursery-math-3",
        "titleEnglish": "Big vs Small & Sizes",
        "titleHindi": "बड़ा और छोटा (Big vs Small)",
        "descriptionEnglish": "Compare sizes: Elephant vs Mouse, Tall tree vs Small bush.",
        "descriptionHindi": "आकार की तुलना: बड़ा हाथी, छोटा चूहा, लंबा और नाटा।",
        "icon": "🐘",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "Elephant 🐘 is BIG",
            "hindi": "हाथी 🐘 बड़ा है"
          },
          {
            "english": "Mouse 🐭 is SMALL",
            "hindi": "चूहा 🐭 छोटा है"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Which animal is BIGGER? 🐘 or 🐭",
            "questionHindi": "कौन सा जानवर बड़ा है? 🐘 या 🐭",
            "visual": "🐘 vs 🐭",
            "options": [
              "Elephant 🐘 (हाथी)",
              "Mouse 🐭 (चूहा)"
            ],
            "correctAnswer": "Elephant 🐘 (हाथी)",
            "explanationEnglish": "Elephant is huge and heavy!",
            "explanationHindi": "हाथी चूहे से बहुत बड़ा होता है!"
          },
          {
            "questionEnglish": "Which fruit is SMALLER? 🍉 or 🍓",
            "questionHindi": "कौन सा फल छोटा है? 🍉 या 🍓",
            "visual": "🍉 vs 🍓",
            "options": [
              "Strawberry 🍓 (स्ट्रॉबेरी)",
              "Watermelon 🍉 (तरबूज)"
            ],
            "correctAnswer": "Strawberry 🍓 (स्ट्रॉबेरी)",
            "explanationEnglish": "A strawberry is tiny compared to a giant watermelon!",
            "explanationHindi": "स्ट्रॉबेरी तरबूज से बहुत छोटी होती है!"
          },
          {
            "questionEnglish": "Which animal is TALLER? 🦒 or 🐇",
            "questionHindi": "कौन सा जानवर अधिक लंबा है? 🦒 या 🐇",
            "visual": "🦒 vs 🐇",
            "options": [
              "Giraffe 🦒 (जिराफ़)",
              "Rabbit 🐇 (खरगोश)"
            ],
            "correctAnswer": "Giraffe 🦒 (जिराफ़)",
            "explanationEnglish": "The giraffe has a very tall neck!",
            "explanationHindi": "जिराफ़ की गर्दन बहुत लंबी होती है!"
          },
          {
            "questionEnglish": "Which vehicle is HEAVIER? 🚌 or 🚲",
            "questionHindi": "कौन सा वाहन अधिक भारी है? 🚌 या 🚲",
            "visual": "🚌 vs 🚲",
            "options": [
              "Bus 🚌 (बस)",
              "Bicycle 🚲 (साइकिल)"
            ],
            "correctAnswer": "Bus 🚌 (बस)",
            "explanationEnglish": "A bus is huge and much heavier than a bicycle!",
            "explanationHindi": "बस साइकिल से बहुत भारी होती है!"
          }
        ]
      }
    ],
    "englishTopics": [
      {
        "id": "nursery-eng-1",
        "titleEnglish": "Alphabet Sounds (A to Z)",
        "titleHindi": "वर्णमाला ध्वनि (Letter Phonics A-Z)",
        "descriptionEnglish": "Learn the first sound of everyday objects: A for Apple, B for Ball.",
        "descriptionHindi": "अक्षरों की आवाज़ पहचानें: A से Apple, B से Ball।",
        "icon": "🔤",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "A says /æ/ as in 🍎 Apple",
            "hindi": "A की आवाज़ /ऐ/ जैसे Apple"
          },
          {
            "english": "B says /b/ as in ⚽ Ball",
            "hindi": "B की आवाज़ /ब/ जैसे Ball"
          },
          {
            "english": "C says /k/ as in 🐱 Cat",
            "hindi": "C की आवाज़ /क/ जैसे Cat"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is the first letter of 🍎 Apple?",
            "questionHindi": "🍎 Apple का पहला अक्षर कौन सा है?",
            "visual": "🍎",
            "options": [
              "A",
              "B",
              "C",
              "D"
            ],
            "correctAnswer": "A",
            "explanationEnglish": "A is for Apple! /æ/ Apple.",
            "explanationHindi": "A से Apple होता है!"
          },
          {
            "questionEnglish": "What is the first letter of 🐱 Cat?",
            "questionHindi": "🐱 Cat (बिल्ली) का पहला अक्षर क्या है?",
            "visual": "🐱",
            "options": [
              "C",
              "K",
              "S",
              "T"
            ],
            "correctAnswer": "C",
            "explanationEnglish": "C is for Cat! /k/ /k/ Cat.",
            "explanationHindi": "C से Cat होता है!"
          },
          {
            "questionEnglish": "What is the first letter of 🦁 Lion?",
            "questionHindi": "🦁 Lion (शेर) किस अक्षर से शुरू होता है?",
            "visual": "🦁",
            "options": [
              "L",
              "M",
              "N",
              "P"
            ],
            "correctAnswer": "L",
            "explanationEnglish": "L is for Lion! /l/ Lion.",
            "explanationHindi": "L से Lion होता है!"
          },
          {
            "questionEnglish": "What is the first letter of ☀️ Sun?",
            "questionHindi": "☀️ Sun (सूरज) किस अक्षर से शुरू होता है?",
            "visual": "☀️",
            "options": [
              "S",
              "C",
              "Z",
              "T"
            ],
            "correctAnswer": "S",
            "explanationEnglish": "S is for Sun! /s/ Sun.",
            "explanationHindi": "S से Sun होता है!"
          }
        ]
      },
      {
        "id": "nursery-eng-2",
        "titleEnglish": "3-Letter Sight Words",
        "titleHindi": "३ अक्षरों वाले सरल शब्द (Sight Words)",
        "descriptionEnglish": "Read easy 3-letter CVC words like CAT, SUN, DOG, BUS.",
        "descriptionHindi": "CAT, SUN, DOG जैसे सरल शब्दों को चित्रों के साथ पढ़ें।",
        "icon": "📖",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "C-A-T = CAT 🐱",
            "hindi": "क-ऐ-ट = कैट (बिल्ली)"
          },
          {
            "english": "S-U-N = SUN ☀️",
            "hindi": "स-अ-न = सन (सूरज)"
          },
          {
            "english": "D-O-G = DOG 🐶",
            "hindi": "ड-ऑ-ग = डॉग (कुत्ता)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Which word matches the picture? ☀️",
            "questionHindi": "चित्र के लिए सही शब्द कौन सा है? ☀️",
            "visual": "☀️",
            "options": [
              "SUN",
              "CAT",
              "DOG",
              "BUS"
            ],
            "correctAnswer": "SUN",
            "explanationEnglish": "SUN means the bright yellow sun in the sky!",
            "explanationHindi": "SUN का अर्थ है सूरज!"
          },
          {
            "questionEnglish": "Which word matches the picture? 🐱",
            "questionHindi": "चित्र के लिए सही शब्द कौन सा है? 🐱",
            "visual": "🐱",
            "options": [
              "CAT",
              "BAT",
              "RAT",
              "HAT"
            ],
            "correctAnswer": "CAT",
            "explanationEnglish": "CAT is the cute meowing animal!",
            "explanationHindi": "CAT का अर्थ बिल्ली है!"
          },
          {
            "questionEnglish": "Which word matches the picture? 🚗",
            "questionHindi": "चित्र के लिए सही शब्द कौन सा है? 🚗",
            "visual": "🚗",
            "options": [
              "CAR",
              "BUS",
              "VAN",
              "CAB"
            ],
            "correctAnswer": "CAR",
            "explanationEnglish": "CAR is a vehicle with 4 wheels!",
            "explanationHindi": "CAR का अर्थ गाड़ी है!"
          },
          {
            "questionEnglish": "Which word matches the picture? 🐶",
            "questionHindi": "चित्र के लिए सही शब्द कौन सा है? 🐶",
            "visual": "🐶",
            "options": [
              "DOG",
              "PIG",
              "FOX",
              "COW"
            ],
            "correctAnswer": "DOG",
            "explanationEnglish": "DOG is a friendly barking pet!",
            "explanationHindi": "DOG का अर्थ कुत्ता है!"
          }
        ]
      }
    ],
    "hindiTopics": [
      {
        "id": "nursery-hin-1",
        "titleEnglish": "Hindi Swar (अ से अः)",
        "titleHindi": "हिंदी स्वर (अ से अः)",
        "descriptionEnglish": "Learn 13 Hindi vowels with audio pronunciation and pictures.",
        "descriptionHindi": "अ से अनार, आ से आम, इ से इमली को चित्रों व आवाज़ से पहचानें।",
        "icon": "🔤",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "अ = अनार (Pomegranate)",
            "hindi": "अ से अनार 🍎"
          },
          {
            "english": "आ = आम (Mango)",
            "hindi": "आ से आम 🥭"
          },
          {
            "english": "इ = इमली (Tamarind)",
            "hindi": "इ से इमली 🌿"
          },
          {
            "english": "ई = ईख (Sugarcane)",
            "hindi": "ई से ईख 🎋"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "अनार 🍎 किस स्वर से शुरू होता है?",
            "questionHindi": "अनार 🍎 किस स्वर से शुरू होता है?",
            "visual": "🍎",
            "options": [
              "अ",
              "आ",
              "इ",
              "ई"
            ],
            "correctAnswer": "अ",
            "explanationEnglish": "अ से अनार होता है!",
            "explanationHindi": "अ से अनार होता है!"
          },
          {
            "questionEnglish": "आम 🥭 किस स्वर से शुरू होता है?",
            "questionHindi": "आम 🥭 किस स्वर से शुरू होता है?",
            "visual": "🥭",
            "options": [
              "आ",
              "अ",
              "उ",
              "ए"
            ],
            "correctAnswer": "आ",
            "explanationEnglish": "आ से मीठा आम होता है!",
            "explanationHindi": "आ से मीठा आम होता है!"
          },
          {
            "questionEnglish": "इमली किस स्वर से शुरू होती है?",
            "questionHindi": "इमली किस स्वर से शुरू होती है?",
            "visual": "🌿",
            "options": [
              "इ",
              "ई",
              "उ",
              "ऋ"
            ],
            "correctAnswer": "इ",
            "explanationEnglish": "इ से खट्टी इमली होती है!",
            "explanationHindi": "इ से खट्टी इमली होती है!"
          },
          {
            "questionEnglish": "ऊन 🧶 किस स्वर से शुरू होती है?",
            "questionHindi": "ऊन 🧶 किस स्वर से शुरू होती है?",
            "visual": "🧶",
            "options": [
              "ऊ",
              "उ",
              "ओ",
              "औ"
            ],
            "correctAnswer": "ऊ",
            "explanationEnglish": "ऊ से गरम ऊन होती है!",
            "explanationHindi": "ऊ से गरम ऊन होती है!"
          }
        ]
      },
      {
        "id": "nursery-hin-2",
        "titleEnglish": "Hindi Vyanjan Basics (क से घ)",
        "titleHindi": "व्यंजन पहचान (क, ख, ग, घ)",
        "descriptionEnglish": "First consonants of Hindi alphabet: Kamal, Khargosh, Gamla, Ghadi.",
        "descriptionHindi": "क से कमल, ख से खरगोश, ग से गमला, घ से घड़ी।",
        "icon": "🎨",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "क = कमल (Lotus)",
            "hindi": "क से कमल 🪷"
          },
          {
            "english": "ख = खरगोश (Rabbit)",
            "hindi": "ख से खरगोश 🐇"
          },
          {
            "english": "ग = गमला (Pot)",
            "hindi": "ग से गमला 🪴"
          },
          {
            "english": "घ = घड़ी (Clock)",
            "hindi": "घ से घड़ी ⏰"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "क + ल मिलकर कौन सा शब्द बनता है?",
            "questionHindi": "क + ल मिलकर कौन सा शब्द बनता है?",
            "visual": "क + ल",
            "options": [
              "कल",
              "कम",
              "कप",
              "कर"
            ],
            "correctAnswer": "कल",
            "explanationEnglish": "क और ल मिलकर \"कल\" बनता है!",
            "explanationHindi": "क और ल मिलकर \"कल\" बनता है!"
          },
          {
            "questionEnglish": "कमल 🪷 किस अक्षर से शुरू होता है?",
            "questionHindi": "कमल 🪷 किस अक्षर से शुरू होता है?",
            "visual": "🪷",
            "options": [
              "क",
              "ख",
              "ग",
              "घ"
            ],
            "correctAnswer": "क",
            "explanationEnglish": "क से कमल!",
            "explanationHindi": "क से कमल!"
          },
          {
            "questionEnglish": "घड़ी ⏰ किस अक्षर से शुरू होती है?",
            "questionHindi": "घड़ी ⏰ किस अक्षर से शुरू होती है?",
            "visual": "⏰",
            "options": [
              "घ",
              "ग",
              "च",
              "छ"
            ],
            "correctAnswer": "घ",
            "explanationEnglish": "घ से घड़ी!",
            "explanationHindi": "घ से घड़ी!"
          },
          {
            "questionEnglish": "गमला 🪴 किस अक्षर से शुरू होता है?",
            "questionHindi": "गमला 🪴 किस अक्षर से शुरू होता है?",
            "visual": "🪴",
            "options": [
              "ग",
              "घ",
              "क",
              "प"
            ],
            "correctAnswer": "ग",
            "explanationEnglish": "ग से सुंदर गमला!",
            "explanationHindi": "ग से सुंदर गमला!"
          }
        ]
      }
    ],
    "scienceTopics": [
      {
            "id": "nursery-sci-1",
            "titleEnglish": "My Body Parts (शरीर के अंग)",
            "titleHindi": "शरीर के अंग व उनके काम",
            "descriptionEnglish": "Learn about eyes, nose, ears, hands, and feet with pictures.",
            "descriptionHindi": "आँख, कान, नाक, हाथ और पैरों को चित्रों से पहचानें।",
            "icon": "👀",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Eyes = See 👁️",
                        "hindi": "आँखें = देखना"
                  },
                  {
                        "english": "Nose = Smell 👃",
                        "hindi": "नाक = सूंघना"
                  },
                  {
                        "english": "Ears = Hear 👂",
                        "hindi": "कान = सुनना"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which body part do we use to see books and toys? 👀",
                        "questionHindi": "किताबें और खिलौने देखने के लिए हम किस अंग का उपयोग करते हैं? 👀",
                        "visual": "👀 📖",
                        "options": [
                              "Eyes (आँखें)",
                              "Nose (नाक)",
                              "Ears (कान)",
                              "Feet (पैर)"
                        ],
                        "correctAnswer": "Eyes (आँखें)",
                        "explanationEnglish": "We see with our eyes! Eyes help us view beautiful colors and books.",
                        "explanationHindi": "हम अपनी आँखों से देखते हैं!"
                  },
                  {
                        "questionEnglish": "Which body part do we use to smell sweet flowers? 👃",
                        "questionHindi": "सुगंधित फूलों को सूंघने के लिए हम किसका उपयोग करते हैं? 👃",
                        "visual": "👃 🌸",
                        "options": [
                              "Nose (नाक)",
                              "Hands (हाथ)",
                              "Teeth (दांत)",
                              "Tongue (जीभ)"
                        ],
                        "correctAnswer": "Nose (नाक)",
                        "explanationEnglish": "Our nose helps us smell fragrances and food.",
                        "explanationHindi": "नाक से हम खुशबू और गंध सूंघते हैं।"
                  },
                  {
                        "questionEnglish": "How many legs does a human child have to walk and jump? 🦵",
                        "questionHindi": "चलने और कूदने के लिए हमारे कितने पैर होते हैं? 🦵",
                        "visual": "🦵 🏃",
                        "options": [
                              "2 Legs (दो पैर)",
                              "4 Legs",
                              "1 Leg",
                              "6 Legs"
                        ],
                        "correctAnswer": "2 Legs (दो पैर)",
                        "explanationEnglish": "Humans have 2 legs to walk, run, and jump!",
                        "explanationHindi": "मनुष्य के चलने-दौड़ने के लिए २ पैर होते हैं!"
                  }
            ]
      },
      {
            "id": "nursery-sci-2",
            "titleEnglish": "Animals & Their Sounds (जानवर और आवाजें)",
            "titleHindi": "प्यारे जानवर और उनकी बोलियाँ",
            "descriptionEnglish": "Learn friendly domestic and wild animals and the sounds they make.",
            "descriptionHindi": "कुत्ता, बिल्ली, गाय और शेर की पहचान और आवाजें।",
            "icon": "🐶",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Dog = Bow-Bow 🐶",
                        "hindi": "कुत्ता = भौं-भौं"
                  },
                  {
                        "english": "Cat = Meow-Meow 🐱",
                        "hindi": "बिल्ली = म्याऊँ"
                  },
                  {
                        "english": "Cow = Moo-Moo 🐮",
                        "hindi": "गाय = अम्मा/मूँ"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which friendly animal says 'Bow-Bow' and guards our home? 🐶",
                        "questionHindi": "कौन सा वफादार जानवर 'भौं-भौं' करता है और घर की रखवाली करता है? 🐶",
                        "visual": "🐶 🦴",
                        "options": [
                              "Dog (कुत्ता) 🐕",
                              "Cat (बिल्ली) 🐈",
                              "Cow (गाय) 🐮",
                              "Lion (शेर) 🦁"
                        ],
                        "correctAnswer": "Dog (कुत्ता) 🐕",
                        "explanationEnglish": "Dogs say 'Bow-Bow' or 'Woof-Woof'!",
                        "explanationHindi": "कुत्ता भौं-भौं करता है!"
                  },
                  {
                        "questionEnglish": "Which gentle farm animal gives us healthy sweet milk? 🐮",
                        "questionHindi": "हमें मीठा और पौष्टिक दूध कौन सा जानवर देता है? 🐮",
                        "visual": "🐮 🥛",
                        "options": [
                              "Cow (गाय) 🐮",
                              "Monkey (बंदर) 🐒",
                              "Tiger (बाघ) 🐅",
                              "Rabbit (खरगोश) 🐇"
                        ],
                        "correctAnswer": "Cow (गाय) 🐮",
                        "explanationEnglish": "Cows give us fresh healthy milk everyday!",
                        "explanationHindi": "गाय हमें स्वादिष्ट और पौष्टिक दूध देती है।"
                  }
            ]
      }
],
    "gkTopics": [
      {
            "id": "nursery-gk-1",
            "titleEnglish": "Colors All Around Us (हमारे रंग)",
            "titleHindi": "रंगों की सतरंगी दुनिया",
            "descriptionEnglish": "Identify red, blue, green, yellow and rainbow shades.",
            "descriptionHindi": "लाल, पीला, हरा, नीला रंगों की पहचान करें।",
            "icon": "🎨",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Apple = Red 🍎",
                        "hindi": "सेब = लाल"
                  },
                  {
                        "english": "Leaf = Green 🍃",
                        "hindi": "पत्ती = हरी"
                  },
                  {
                        "english": "Sun = Yellow ☀️",
                        "hindi": "सूरज = पीला"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "What is the bright color of a delicious ripe apple? 🍎",
                        "questionHindi": "स्वादिष्ट पके हुए सेब का रंग क्या होता है? 🍎",
                        "visual": "🍎 🔴",
                        "options": [
                              "Red (लाल)",
                              "Blue (नीला)",
                              "Black (काला)",
                              "White (सफेद)"
                        ],
                        "correctAnswer": "Red (लाल)",
                        "explanationEnglish": "Apples are bright red in color!",
                        "explanationHindi": "सेब लाल रंग का होता है!"
                  },
                  {
                        "questionEnglish": "What is the color of fresh tree leaves and garden grass? 🌿",
                        "questionHindi": "पेड़ की पत्तियों और बगीचे की हरी घास का रंग क्या है? 🌿",
                        "visual": "🌿 🍃",
                        "options": [
                              "Green (हरा)",
                              "Pink (गुलाबी)",
                              "Purple (बैंगनी)",
                              "Brown (भूरा)"
                        ],
                        "correctAnswer": "Green (हरा)",
                        "explanationEnglish": "Leaves and garden grass are vibrant green!",
                        "explanationHindi": "घास और पत्तियां हरी होती हैं!"
                  }
            ]
      },
      {
            "id": "nursery-gk-2",
            "titleEnglish": "Fruits & Sweet Treats (फल और भोजन)",
            "titleHindi": "स्वादिष्ट फल और उनका पोषण",
            "descriptionEnglish": "Learn delicious fruits: Mango, Banana, Apple & Watermelon.",
            "descriptionHindi": "आम, केला, अंगूर और तरबूज की पहचान करें।",
            "icon": "🥭",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Mango = King of Fruits 🥭",
                        "hindi": "आम = फलों का राजा"
                  },
                  {
                        "english": "Banana = Monkey favorite 🍌",
                        "hindi": "केला = ऊर्जा का स्रोत"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Who is celebrated as the sweet 'King of Fruits' in India? 🥭",
                        "questionHindi": "भारत में 'फलों का राजा' किस फल को कहा जाता है? 🥭",
                        "visual": "🥭 👑",
                        "options": [
                              "Mango (आम) 🥭",
                              "Lemon (नींबू) 🍋",
                              "Onion (प्याज) 🧅",
                              "Potato (आलू) 🥔"
                        ],
                        "correctAnswer": "Mango (आम) 🥭",
                        "explanationEnglish": "Mango is the King of Fruits and India's national fruit!",
                        "explanationHindi": "आम को सभी फलों का राजा कहा जाता है!"
                  },
                  {
                        "questionEnglish": "Which fruit is yellow, easy to peel, and monkeys love it? 🍌",
                        "questionHindi": "कौन सा फल पीला होता है, छीलकर खाया जाता है और बंदरों को खूब भाता है? 🍌",
                        "visual": "🍌 🐒",
                        "options": [
                              "Banana (केला) 🍌",
                              "Watermelon (तरबूज) 🍉",
                              "Coconut (नारियल) 🥥",
                              "Chilli (मिर्च) 🌶️"
                        ],
                        "correctAnswer": "Banana (केला) 🍌",
                        "explanationEnglish": "Bananas are yellow, soft, sweet, and full of energy!",
                        "explanationHindi": "केला पीला और मीठा फल होता है!"
                  }
            ]
      }
]
  },
  "class-1": {
    "id": "class-1",
    "gradeLabelEnglish": "Class 1 (Grade 1)",
    "gradeLabelHindi": "कक्षा १ (Class 1)",
    "ageRange": "Age 5-6 Yrs",
    "color": "from-emerald-500 to-teal-600",
    "mathsTopics": [
      {
        "id": "c1-math-add-single",
        "titleEnglish": "Single-Digit Addition (1-9)",
        "titleHindi": "एक अंकीय जोड़ (Single-Digit Addition)",
        "descriptionEnglish": "Solve real-life visual addition with fruits, stars, and playful objects.",
        "descriptionHindi": "सेब और सितारों की मदद से जोड़ना सीखें (४ + ३ = ७)।",
        "icon": "➕",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "4 + 3 = 7",
            "hindi": "४ + ३ = ७"
          },
          {
            "english": "5 + 5 = 10",
            "hindi": "५ + ५ = १०"
          },
          {
            "english": "Addition means putting items together!",
            "hindi": "जोड़ने का मतलब है चीजों को एक साथ मिलाना!"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 4 + 3?",
            "questionHindi": "४ + ३ कितना होता है? 🍎🍎🍎🍎 + 🍎🍎🍎",
            "visual": "🍎🍎🍎🍎 + 🍎🍎🍎",
            "options": [
              "6",
              "7",
              "8",
              "9"
            ],
            "correctAnswer": "7",
            "explanationEnglish": "4 apples plus 3 apples equals 7 apples!",
            "explanationHindi": "४ और ३ मिलकर ७ होते हैं!"
          },
          {
            "questionEnglish": "What is 5 + 4? ⭐⭐⭐⭐⭐ + ⭐⭐⭐⭐",
            "questionHindi": "५ + ४ कितना होता है? ⭐⭐⭐⭐⭐ + ⭐⭐⭐⭐",
            "visual": "⭐⭐⭐⭐⭐ + ⭐⭐⭐⭐",
            "options": [
              "8",
              "9",
              "10",
              "7"
            ],
            "correctAnswer": "9",
            "explanationEnglish": "5 stars plus 4 stars equals 9 stars!",
            "explanationHindi": "५ और ४ मिलकर ९ होते हैं!"
          },
          {
            "questionEnglish": "What is 6 + 2? 🚗🚗🚗🚗🚗🚗 + 🚗🚗",
            "questionHindi": "६ + २ कितना होता है? 🚗🚗🚗🚗🚗🚗 + 🚗🚗",
            "visual": "🚗🚗🚗🚗🚗🚗 + 🚗🚗",
            "options": [
              "7",
              "8",
              "9",
              "6"
            ],
            "correctAnswer": "8",
            "explanationEnglish": "6 cars plus 2 cars equals 8 cars!",
            "explanationHindi": "६ और २ मिलकर ८ होते हैं!"
          },
          {
            "questionEnglish": "What is 3 + 5? 🎈🎈🎈 + 🎈🎈🎈🎈🎈",
            "questionHindi": "३ + ५ कितना होता है? 🎈🎈🎈 + 🎈🎈🎈🎈🎈",
            "visual": "🎈🎈🎈 + 🎈🎈🎈🎈🎈",
            "options": [
              "7",
              "8",
              "9",
              "10"
            ],
            "correctAnswer": "8",
            "explanationEnglish": "3 balloons plus 5 balloons equals 8 balloons!",
            "explanationHindi": "३ और ५ मिलकर ८ होते हैं!"
          },
          {
            "questionEnglish": "What is 8 + 1? 🍬🍬🍬🍬🍬🍬🍬🍬 + 🍬",
            "questionHindi": "८ + १ कितना होता है? 🍬🍬🍬🍬🍬🍬🍬🍬 + 🍬",
            "visual": "🍬🍬🍬🍬🍬🍬🍬🍬 + 🍬",
            "options": [
              "7",
              "8",
              "9",
              "10"
            ],
            "correctAnswer": "9",
            "explanationEnglish": "8 candies plus 1 candy equals 9 candies!",
            "explanationHindi": "८ और १ मिलकर ९ होते हैं!"
          }
        ]
      },
      {
        "id": "c1-math-sub-single",
        "titleEnglish": "Single-Digit Subtraction",
        "titleHindi": "एक अंकीय घटाव (Subtraction 1-9)",
        "descriptionEnglish": "Learn taking away objects: 7 balloons minus 3 popped = 4 balloons.",
        "descriptionHindi": "वस्तुओं को अलग करना और घटाना सीखें (७ - ३ = ४)।",
        "icon": "➖",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "7 - 3 = 4",
            "hindi": "७ - ३ = ४"
          },
          {
            "english": "Subtraction means taking away",
            "hindi": "घटाने का मतलब कम करना होता है"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 7 - 3?",
            "questionHindi": "७ - ३ कितना होता है? 🎈🎈🎈🎈🎈🎈🎈 - 🎈🎈🎈",
            "visual": "🎈🎈🎈🎈🎈🎈🎈 - 🎈🎈🎈",
            "options": [
              "3",
              "4",
              "5",
              "6"
            ],
            "correctAnswer": "4",
            "explanationEnglish": "Take away 3 from 7, you get 4!",
            "explanationHindi": "७ में से ३ घटाने पर ४ बचते हैं!"
          },
          {
            "questionEnglish": "What is 9 - 5? 🍦🍦🍦🍦🍦🍦🍦🍦🍦 - 🍦🍦🍦🍦🍦",
            "questionHindi": "९ - ५ कितना होता है? 🍦🍦🍦🍦🍦🍦🍦🍦🍦 - 🍦🍦🍦🍦🍦",
            "visual": "🍦🍦🍦🍦🍦🍦🍦🍦🍦 - 🍦🍦🍦🍦🍦",
            "options": [
              "3",
              "4",
              "5",
              "6"
            ],
            "correctAnswer": "4",
            "explanationEnglish": "Take away 5 ice creams from 9, you have 4 left!",
            "explanationHindi": "९ में से ५ घटाने पर ४ बचते हैं!"
          },
          {
            "questionEnglish": "What is 6 - 2? 🍓🍓🍓🍓🍓🍓 - 🍓🍓",
            "questionHindi": "६ - २ कितना होता है? 🍓🍓🍓🍓🍓🍓 - 🍓🍓",
            "visual": "🍓🍓🍓🍓🍓🍓 - 🍓🍓",
            "options": [
              "3",
              "4",
              "5",
              "2"
            ],
            "correctAnswer": "4",
            "explanationEnglish": "6 strawberries minus 2 strawberries equals 4 strawberries!",
            "explanationHindi": "६ में से २ घटाने पर ४ बचते हैं!"
          },
          {
            "questionEnglish": "What is 8 - 3? ⭐⭐⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐",
            "questionHindi": "८ - ३ कितना होता है? ⭐⭐⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐",
            "visual": "⭐⭐⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐",
            "options": [
              "4",
              "5",
              "6",
              "7"
            ],
            "correctAnswer": "5",
            "explanationEnglish": "8 stars minus 3 stars equals 5 stars!",
            "explanationHindi": "८ में से ३ घटाने पर ५ बचते हैं!"
          },
          {
            "questionEnglish": "What is 5 - 4? 🍎🍎🍎🍎🍎 - 🍎🍎🍎🍎",
            "questionHindi": "५ - ४ कितना होता है? 🍎🍎🍎🍎🍎 - 🍎🍎🍎🍎",
            "visual": "🍎🍎🍎🍎🍎 - 🍎🍎🍎🍎",
            "options": [
              "1",
              "2",
              "0",
              "3"
            ],
            "correctAnswer": "1",
            "explanationEnglish": "5 apples minus 4 apples equals 1 apple!",
            "explanationHindi": "५ में से ४ घटाने पर १ बचता है!"
          }
        ]
      },
      {
        "id": "c1-math-numbers-100",
        "titleEnglish": "Numbers up to 100 & Place Value",
        "titleHindi": "१०० तक संख्याएँ व स्थानीय मान (Numbers to 100)",
        "descriptionEnglish": "Understand Tens and Ones, Before and After, Greater than and Less than.",
        "descriptionHindi": "दहाई (Tens) और इकाई (Ones), आगे और पीछे की संख्याएँ।",
        "icon": "💯",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "Tens and Ones: 25 = 2 Tens + 5 Ones",
            "hindi": "२५ = २ दहाई + ५ इकाई"
          },
          {
            "english": "After 49 comes 50",
            "hindi": "४९ के बाद ५० आता है"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What number comes right after 49?",
            "questionHindi": "४९ के ठीक बाद कौन सी संख्या आती है?",
            "visual": "49 ➔ ?",
            "options": [
              "48",
              "50",
              "51",
              "40"
            ],
            "correctAnswer": "50",
            "explanationEnglish": "Counting forward: 48, 49, 50!",
            "explanationHindi": "४९ के बाद ५० आता है!"
          },
          {
            "questionEnglish": "Which number is GREATER: 67 or 76?",
            "questionHindi": "कौन सी संख्या बड़ी है: ६७ या ७६?",
            "visual": "67 vs 76",
            "options": [
              "76",
              "67",
              "Both are equal",
              "None"
            ],
            "correctAnswer": "76",
            "explanationEnglish": "76 has 7 Tens, which is bigger than 6 Tens in 67!",
            "explanationHindi": "७६ में ७ दहाई हैं, इसलिए ७६ बड़ा है!"
          },
          {
            "questionEnglish": "What is the number name of 25?",
            "questionHindi": "संख्या २५ का नाम क्या है?",
            "visual": "25",
            "options": [
              "Twenty-Five (पच्चीस)",
              "Thirty-Five (पैंतीस)",
              "Fifteen (पंद्रह)",
              "Twenty (बीस)"
            ],
            "correctAnswer": "Twenty-Five (पच्चीस)",
            "explanationEnglish": "25 is read as Twenty-Five (पच्चीस)!",
            "explanationHindi": "२५ को पच्चीस कहते हैं!"
          },
          {
            "questionEnglish": "What number comes right before 90?",
            "questionHindi": "९० के ठीक पहले कौन सी संख्या आती है?",
            "visual": "? ➔ 90",
            "options": [
              "89",
              "91",
              "80",
              "99"
            ],
            "correctAnswer": "89",
            "explanationEnglish": "89 comes right before 90!",
            "explanationHindi": "९० के ठीक पहले ८९ आता है!"
          },
          {
            "questionEnglish": "3 Tens and 4 Ones make which number?",
            "questionHindi": "३ दहाई और ४ इकाई मिलकर कौन सी संख्या बनती है?",
            "visual": "3 Tens + 4 Ones",
            "options": [
              "34",
              "43",
              "30",
              "40"
            ],
            "correctAnswer": "34",
            "explanationEnglish": "3 Tens (30) + 4 Ones (4) = 34!",
            "explanationHindi": "३ दहाई (३०) + ४ इकाई (४) = ३४!"
          }
        ]
      }
    ],
    "englishTopics": [
      {
        "id": "c1-eng-nouns",
        "titleEnglish": "Nouns (Naming Words)",
        "titleHindi": "संज्ञा (Nouns - Naming Words)",
        "descriptionEnglish": "Name of a Person, Place, Animal, or Thing.",
        "descriptionHindi": "किसी व्यक्ति, जगह, जानवर या वस्तु के नाम को संज्ञा कहते हैं।",
        "icon": "🏷️",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "Person: Boy, Girl, Teacher",
            "hindi": "व्यक्ति: लड़का, लड़की, अध्यापक"
          },
          {
            "english": "Place: School, Park, Home",
            "hindi": "जगह: स्कूल, बगीचा, घर"
          },
          {
            "english": "Animal: Cat, Dog, Lion",
            "hindi": "जानवर: बिल्ली, कुत्ता, शेर"
          },
          {
            "english": "Thing: Book, Pen, Ball",
            "hindi": "वस्तु: किताब, कलम, गेंद"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Find the Noun (Person) in: \"The boy plays.\"",
            "questionHindi": "\"The boy plays.\" में Noun (व्यक्ति का नाम) क्या है?",
            "visual": "👦 ⚽",
            "options": [
              "boy",
              "plays",
              "The",
              "none"
            ],
            "correctAnswer": "boy",
            "explanationEnglish": "\"Boy\" is a person, so it is a Noun!",
            "explanationHindi": "\"Boy\" (लड़का) एक व्यक्ति है, इसलिए यह Noun है!"
          },
          {
            "questionEnglish": "\"School\" is a name of a?",
            "questionHindi": "\"School\" (स्कूल) किसका नाम है?",
            "visual": "🏫",
            "options": [
              "Place (जगह)",
              "Person (व्यक्ति)",
              "Animal (जानवर)",
              "Thing (वस्तु)"
            ],
            "correctAnswer": "Place (जगह)",
            "explanationEnglish": "School is a place where children go to learn!",
            "explanationHindi": "स्कूल एक जगह (Place) का नाम है!"
          },
          {
            "questionEnglish": "Which word is an Animal name?",
            "questionHindi": "इनमें से कौन सा शब्द जानवर का नाम है?",
            "visual": "🐅",
            "options": [
              "Tiger",
              "Table",
              "Teacher",
              "Town"
            ],
            "correctAnswer": "Tiger",
            "explanationEnglish": "Tiger is a wild striped animal!",
            "explanationHindi": "Tiger (बाघ) एक जानवर का नाम है!"
          },
          {
            "questionEnglish": "\"Book\" is a name of a?",
            "questionHindi": "\"Book\" (किताब) किसका नाम है?",
            "visual": "📚",
            "options": [
              "Thing (चीज़)",
              "Person (व्यक्ति)",
              "Place (जगह)",
              "Animal (जानवर)"
            ],
            "correctAnswer": "Thing (चीज़)",
            "explanationEnglish": "A book is an object or thing that you read!",
            "explanationHindi": "किताब एक वस्तु (Thing) है!"
          }
        ]
      },
      {
        "id": "c1-eng-articles",
        "titleEnglish": "Articles: A and An",
        "titleHindi": "आर्टिकल्स (Articles: A और An)",
        "descriptionEnglish": "Use \"An\" before vowel sounds (A, E, I, O, U) and \"A\" before consonants.",
        "descriptionHindi": "स्वर ध्वनि (A, E, I, O, U) के पहले \"An\" और व्यंजन ध्वनि के पहले \"A\" लगाएं।",
        "icon": "🅰️",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "An Apple 🍎, An Elephant 🐘, An Umbrella ☂️",
            "hindi": "An Apple, An Elephant, An Umbrella"
          },
          {
            "english": "A Cat 🐱, A Ball ⚽, A Tree 🌳",
            "hindi": "A Cat, A Ball, A Tree"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Fill in the blank: \"I saw _____ elephant.\" 🐘",
            "questionHindi": "खाली स्थान भरें: \"I saw _____ elephant.\" 🐘",
            "visual": "🐘",
            "options": [
              "an",
              "a",
              "the",
              "two"
            ],
            "correctAnswer": "an",
            "explanationEnglish": "Elephant starts with the vowel E, so we use \"an\"!",
            "explanationHindi": "Elephant स्वर E से शुरू होता है, इसलिए \"an\" आएगा!"
          },
          {
            "questionEnglish": "Fill in the blank: \"She has _____ cat.\" 🐱",
            "questionHindi": "खाली स्थान भरें: \"She has _____ cat.\" 🐱",
            "visual": "🐱",
            "options": [
              "a",
              "an",
              "in",
              "on"
            ],
            "correctAnswer": "a",
            "explanationEnglish": "Cat starts with consonant C, so we use \"a\"!",
            "explanationHindi": "Cat व्यंजन C से शुरू होता है, इसलिए \"a\" आएगा!"
          },
          {
            "questionEnglish": "Fill in the blank: \"Take _____ umbrella.\" ☂️",
            "questionHindi": "खाली स्थान भरें: \"Take _____ umbrella.\" ☂️",
            "visual": "☂️",
            "options": [
              "an",
              "a",
              "to",
              "at"
            ],
            "correctAnswer": "an",
            "explanationEnglish": "Umbrella starts with vowel U, so we use \"an\"!",
            "explanationHindi": "Umbrella स्वर U से शुरू होता है, इसलिए \"an\" आएगा!"
          },
          {
            "questionEnglish": "Fill in the blank: \"This is _____ orange.\" 🍊",
            "questionHindi": "खाली स्थान भरें: \"This is _____ orange.\" 🍊",
            "visual": "🍊",
            "options": [
              "an",
              "a",
              "of",
              "by"
            ],
            "correctAnswer": "an",
            "explanationEnglish": "Orange starts with vowel O, so we use \"an\"!",
            "explanationHindi": "Orange स्वर O से शुरू होता है, इसलिए \"an\" आएगा!"
          }
        ]
      },
      {
        "id": "c1-eng-pronouns",
        "titleEnglish": "Pronouns (He, She, It, They)",
        "titleHindi": "सर्वनाम (Pronouns - He, She, It, They)",
        "descriptionEnglish": "Words used in place of nouns: He for boys, She for girls, It for things/animals.",
        "descriptionHindi": "संज्ञा की जगह आने वाले शब्द: He (लड़का), She (लड़की), It (वस्तु/जानवर)।",
        "icon": "👥",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "He = Boy / Man",
            "hindi": "He = लड़का / पुरुष"
          },
          {
            "english": "She = Girl / Woman",
            "hindi": "She = लड़की / महिला"
          },
          {
            "english": "It = Animal / Thing",
            "hindi": "It = जानवर / वस्तु"
          },
          {
            "english": "They = More than one person",
            "hindi": "They = एक से अधिक लोग"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Rohan is smiling. _____ is happy.",
            "questionHindi": "रोहन मुस्कुरा रहा है: \"Rohan is smiling. _____ is happy.\"",
            "visual": "👦 😊",
            "options": [
              "He",
              "She",
              "It",
              "They"
            ],
            "correctAnswer": "He",
            "explanationEnglish": "Rohan is a boy, so we use \"He\"!",
            "explanationHindi": "रोहन लड़का है, इसलिए \"He\" का प्रयोग होगा!"
          },
          {
            "questionEnglish": "Riya is reading. _____ loves books.",
            "questionHindi": "रिया पढ़ रही है: \"Riya is reading. _____ loves books.\"",
            "visual": "👧 📖",
            "options": [
              "She",
              "He",
              "It",
              "We"
            ],
            "correctAnswer": "She",
            "explanationEnglish": "Riya is a girl, so we use \"She\"!",
            "explanationHindi": "रिया लड़की है, इसलिए \"She\" का प्रयोग होगा!"
          },
          {
            "questionEnglish": "Look at the puppy. _____ is barking.",
            "questionHindi": "पिल्ले को देखो: \"Look at the puppy. _____ is barking.\"",
            "visual": "🐶",
            "options": [
              "It",
              "He",
              "She",
              "They"
            ],
            "correctAnswer": "It",
            "explanationEnglish": "For a puppy or animal, we use \"It\"!",
            "explanationHindi": "जानवर के लिए \"It\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "The children are in the park. _____ are playing.",
            "questionHindi": "बच्चे पार्क में हैं: \"The children are in the park. _____ are playing.\"",
            "visual": "🧒👧 ⚽",
            "options": [
              "They",
              "He",
              "She",
              "It"
            ],
            "correctAnswer": "They",
            "explanationEnglish": "For more than one child, we use \"They\"!",
            "explanationHindi": "एक से अधिक बच्चों के लिए \"They\" का प्रयोग होता है!"
          }
        ]
      }
    ],
    "hindiTopics": [
      {
        "id": "c1-hin-do-akshar",
        "titleEnglish": "2 & 3 Akshar Bina Matra Words",
        "titleHindi": "२ व ३ अक्षर वाले बिना मात्रा के शब्द",
        "descriptionEnglish": "Read simple 2 and 3 letter Hindi words: Jal, Ghar, Kamal, Sadak.",
        "descriptionHindi": "जल, घर, बस, कमल, सड़क जैसे बिना मात्रा के सरल शब्द पढ़ें।",
        "icon": "💧",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "ज + ल = जल (Water)",
            "hindi": "ज + ल = जल 💧"
          },
          {
            "english": "घ + र = घर (Home)",
            "hindi": "घ + र = घर 🏠"
          },
          {
            "english": "क + म + ल = कमल (Lotus)",
            "hindi": "क + म + ल = कमल 🪷"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "ज + ल जोड़कर क्या बनता है?",
            "questionHindi": "ज + ल जोड़कर क्या बनता है?",
            "visual": "ज + ल",
            "options": [
              "जल",
              "जग",
              "जन",
              "जब"
            ],
            "correctAnswer": "जल",
            "explanationEnglish": "ज और ल मिलकर \"जल\" (पानी) बनता है!",
            "explanationHindi": "ज और ल मिलकर \"जल\" बनता है!"
          },
          {
            "questionEnglish": "क + म + ल जोड़कर क्या बनता है?",
            "questionHindi": "क + म + ल जोड़कर क्या बनता है?",
            "visual": "क + म + ल",
            "options": [
              "कमल",
              "कलम",
              "कनक",
              "कपिल"
            ],
            "correctAnswer": "कमल",
            "explanationEnglish": "क, म और ल मिलकर \"कमल\" बनता है!",
            "explanationHindi": "क, म और ल मिलकर \"कमल\" बनता है!"
          },
          {
            "questionEnglish": "स + ड़ + क जोड़कर कौन सा शब्द बनता है?",
            "questionHindi": "स + ड़ + क जोड़कर कौन सा शब्द बनता है?",
            "visual": "स + ड़ + क",
            "options": [
              "सड़क",
              "सड़कन",
              "सड़किया",
              "सदन"
            ],
            "correctAnswer": "सड़क",
            "explanationEnglish": "स, ड़ और क मिलकर \"सड़क\" (Road) बनता है!",
            "explanationHindi": "स, ड़ और क मिलकर \"सड़क\" बनता है!"
          },
          {
            "questionEnglish": "न + ह + र जोड़कर क्या बनता है?",
            "questionHindi": "न + ह + र जोड़कर क्या बनता है?",
            "visual": "न + ह + र",
            "options": [
              "नहर",
              "नगर",
              "नजर",
              "नमन"
            ],
            "correctAnswer": "नहर",
            "explanationEnglish": "न, ह और र मिलकर \"नहर\" बनता है!",
            "explanationHindi": "न, ह और र मिलकर \"नहर\" बनता है!"
          }
        ]
      },
      {
        "id": "c1-hin-aa-matra",
        "titleEnglish": "Aa Ki Matra (ा) Words",
        "titleHindi": "आ की मात्रा (ा) के शब्द",
        "descriptionEnglish": "Words with Aa Matra: Raja, Baja, Mala, Badal, Aam.",
        "descriptionHindi": "राजा, बाजा, माला, बादल जैसे आ की मात्रा वाले शब्द।",
        "icon": "👑",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "क + ा = का (Kaa)",
            "hindi": "क + ा = का"
          },
          {
            "english": "र + ा + ज + ा = राजा (King)",
            "hindi": "र + ा + ज + ा = राजा 👑"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "क + ा + न मिलकर क्या बनता है?",
            "questionHindi": "क + ा + न मिलकर क्या बनता है?",
            "visual": "क + ा + न",
            "options": [
              "कान",
              "कम",
              "कल",
              "कर"
            ],
            "correctAnswer": "कान",
            "explanationEnglish": "क पर आ की मात्रा और न मिलकर \"कान\" बनता है!",
            "explanationHindi": "क पर आ की मात्रा और न मिलकर \"कान\" बनता है!"
          },
          {
            "questionEnglish": "र + ा + ज + ा मिलकर कौन सा शब्द बनता है?",
            "questionHindi": "र + ा + ज + ा मिलकर कौन सा शब्द बनता है?",
            "visual": "र + ा + ज + ा",
            "options": [
              "राजा",
              "राजी",
              "राजू",
              "रात"
            ],
            "correctAnswer": "राजा",
            "explanationEnglish": "र पर आ की मात्रा और ज पर आ की मात्रा मिलकर \"राजा\" बनता है!",
            "explanationHindi": "दोनों पर आ की मात्रा लगने से \"राजा\" बनता है!"
          },
          {
            "questionEnglish": "म + ा + ल + ा जोड़कर क्या बनता है?",
            "questionHindi": "म + ा + ल + ा जोड़कर क्या बनता है?",
            "visual": "म + ा + ल + ा",
            "options": [
              "माला",
              "माली",
              "माता",
              "मामला"
            ],
            "correctAnswer": "माला",
            "explanationEnglish": "म और ल पर आ की मात्रा से \"माला\" बनता है!",
            "explanationHindi": "म और ल पर आ की मात्रा से \"माला\" बनता है!"
          },
          {
            "questionEnglish": "ब + ा + द + ल जोड़कर कौन सा शब्द बनता है?",
            "questionHindi": "ब + ा + द + ल जोड़कर कौन सा शब्द बनता है?",
            "visual": "ब + ा + द + ल",
            "options": [
              "बादल",
              "बादर",
              "बदल",
              "बालक"
            ],
            "correctAnswer": "बादल",
            "explanationEnglish": "ब पर आ की मात्रा, द और ल मिलकर \"बादल\" (Cloud) बनता है!",
            "explanationHindi": "ब पर आ की मात्रा, द और ल मिलकर \"बादल\" बनता है!"
          }
        ]
      },
      {
        "id": "c1-hin-ee-matra",
        "titleEnglish": "Ee Ki Matra (ि, ी) Words",
        "titleHindi": "इ (ि) व ई (ी) की मात्रा के शब्द",
        "descriptionEnglish": "Understand Choti Ee (ि) in Din, Pin and Badi Ee (ी) in Machli, Hathi.",
        "descriptionHindi": "दिन, पिन (छोटी इ) और मछली, हाथी (बड़ी ई) की मात्रा में अंतर।",
        "icon": "🐟",
        "difficulty": "Beginner",
        "keyConcepts": [
          {
            "english": "Choti Ee (ि) comes before letter: दिन (Day)",
            "hindi": "छोटी इ (ि) अक्षर के पहले लगती है: दिन ☀️"
          },
          {
            "english": "Badi Ee (ी) comes after letter: मछली (Fish)",
            "hindi": "बड़ी ई (ी) अक्षर के बाद लगती है: मछली 🐟"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"दिन\" में \"द\" पर कौन सी मात्रा लगी है?",
            "questionHindi": "\"दिन\" में \"द\" पर कौन सी मात्रा लगी है?",
            "visual": "दिन",
            "options": [
              "छोटी इ (ि)",
              "बड़ी ई (ी)",
              "आ की मात्रा (ा)",
              "छोटा उ (ु)"
            ],
            "correctAnswer": "छोटी इ (ि)",
            "explanationEnglish": "दिन में अक्षर के पहले छोटी इ (ि) लगती है!",
            "explanationHindi": "दिन में अक्षर के पहले छोटी इ (ि) लगती है!"
          },
          {
            "questionEnglish": "\"मछली\" में \"ल\" पर कौन सी मात्रा लगी है? 🐟",
            "questionHindi": "\"मछली\" में \"ल\" पर कौन सी मात्रा लगी है? 🐟",
            "visual": "मछली 🐟",
            "options": [
              "बड़ी ई (ी)",
              "छोटी इ (ि)",
              "आ (ा)",
              "ऊ (ू)"
            ],
            "correctAnswer": "बड़ी ई (ी)",
            "explanationEnglish": "मछली में ल के बाद बड़ी ई (ी) की मात्रा आती है!",
            "explanationHindi": "मछली में ल के बाद बड़ी ई (ी) की मात्रा आती है!"
          },
          {
            "questionEnglish": "\"चिड़िया\" में कौन सी मात्रा है? 🐦",
            "questionHindi": "\"चिड़िया\" में कौन सी मात्रा है? 🐦",
            "visual": "चिड़िया 🐦",
            "options": [
              "छोटी इ (ि)",
              "बड़ी ई (ी)",
              "बड़ा ऊ (ू)",
              "ए (े)"
            ],
            "correctAnswer": "छोटी इ (ि)",
            "explanationEnglish": "चिड़िया में च और ड़ पर छोटी इ (ि) की मात्रा है!",
            "explanationHindi": "चिड़िया में च और ड़ पर छोटी इ (ि) की मात्रा है!"
          },
          {
            "questionEnglish": "\"हाथी\" में \"थ\" पर कौन सी मात्रा है? 🐘",
            "questionHindi": "\"हाथी\" में \"थ\" पर कौन सी मात्रा है? 🐘",
            "visual": "हाथी 🐘",
            "options": [
              "बड़ी ई (ी)",
              "छोटी इ (ि)",
              "ओ (ो)",
              "औ (ौ)"
            ],
            "correctAnswer": "बड़ी ई (ी)",
            "explanationEnglish": "हाथी में थ पर बड़ी ई (ी) की मात्रा है!",
            "explanationHindi": "हाथी में थ पर बड़ी ई (ी) की मात्रा है!"
          }
        ]
      }
    ],
    "scienceTopics": [
      {
            "id": "class1-sci-1",
            "titleEnglish": "Living & Non-Living Things (सजीव और निर्जीव)",
            "titleHindi": "सजीव और निर्जीव वस्तुओं की पहचान",
            "descriptionEnglish": "Understand the difference between things that breathe/grow vs objects.",
            "descriptionHindi": "जो वस्तुएं सांस लेती हैं और बढ़ती हैं वे सजीव हैं।",
            "icon": "🌱",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Living: Grow, Breathe, Eat 🌱",
                        "hindi": "सजीव: बढ़ते हैं, सांस लेते हैं"
                  },
                  {
                        "english": "Non-Living: Cannot move or grow 🪨",
                        "hindi": "निर्जीव: बढ़ नहीं सकते"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which of these is a LIVING thing that breathes, eats, and grows? 🌱",
                        "questionHindi": "इनमें से कौन सजीव वस्तु है जो सांस लेती है और बड़ी होती है? 🌱",
                        "visual": "🐶 🚗 🪑",
                        "options": [
                              "Little Puppy (पिल्ला) 🐶",
                              "Toy Car (खिलौना कार) 🚗",
                              "Wooden Table (मेज़) 🪑",
                              "Pencil (पेंसिल) ✏️"
                        ],
                        "correctAnswer": "Little Puppy (पिल्ला) 🐶",
                        "explanationEnglish": "Puppies are living animals—they eat, breathe, grow, and play!",
                        "explanationHindi": "पिल्ला सजीव है, यह बढ़ता है और सांस लेता है।"
                  },
                  {
                        "questionEnglish": "Which part of a plant stays underground and drinks water from the soil? 🌱",
                        "questionHindi": "पौधे का कौन सा भाग मिट्टी के अंदर रहकर पानी सोखता है? 🌱",
                        "visual": "🌱 💧 🪨",
                        "options": [
                              "Roots (जड़ें) 🌿",
                              "Flowers (फूल) 🌸",
                              "Fruit (फल) 🍎",
                              "Leaves (पत्तियां) 🍃"
                        ],
                        "correctAnswer": "Roots (जड़ें) 🌿",
                        "explanationEnglish": "Roots fix the plant into the soil and absorb water and nutrients!",
                        "explanationHindi": "जड़ें मिट्टी से पानी और खनिज चूसती हैं।"
                  },
                  {
                        "questionEnglish": "What three essential things does a seed need to sprout into a plant? ☀️",
                        "questionHindi": "एक नन्हे बीज को पौधा बनने के लिए किन तीन चीजों की जरूरत होती है? ☀️",
                        "visual": "🌱 ☀️ 💧",
                        "options": [
                              "Sunlight, Water & Air (धूप, पानी व हवा)",
                              "Juice, Milk & Sugar",
                              "Ice & Salt",
                              "Only Darkness"
                        ],
                        "correctAnswer": "Sunlight, Water & Air (धूप, पानी व हवा)",
                        "explanationEnglish": "Seeds need warm sunlight, fresh water, and clean air to grow!",
                        "explanationHindi": "पौधों को सूर्य की धूप, पानी और हवा चाहिए।"
                  }
            ]
      },
      {
            "id": "class1-sci-2",
            "titleEnglish": "Weather & The Four Seasons (मौसम और ऋतुएँ)",
            "titleHindi": "मौसम व चार मुख्य ऋतुएँ",
            "descriptionEnglish": "Explore summer heat, winter snow, monsoon rain, and spring flowers.",
            "descriptionHindi": "गर्मी, सर्दी, वर्षा और वसंत ऋतु की विशेषताएं।",
            "icon": "⛅",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Summer: Hot & Sunny ☀️",
                        "hindi": "गर्मी: तेज धूप"
                  },
                  {
                        "english": "Rainy: Rain & Umbrella 🌧️",
                        "hindi": "वर्षा: बारिश व छाता"
                  },
                  {
                        "english": "Winter: Cold & Sweaters ❄️",
                        "hindi": "सर्दी: ऊनी कपड़े"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "In which season do we feel chilly and wear warm woolen sweaters? ❄️",
                        "questionHindi": "किस मौसम में ठंड लगती है और हम ऊनी स्वेटर व मफलर पहनते हैं? ❄️",
                        "visual": "🧣 🧤 ❄️",
                        "options": [
                              "Winter (सर्दी/शीत ऋतु) ❄️",
                              "Summer (गर्मी) ☀️",
                              "Rainy (बरसात) 🌧️",
                              "Autumn (पतझड़) 🍂"
                        ],
                        "correctAnswer": "Winter (सर्दी/शीत ऋतु) ❄️",
                        "explanationEnglish": "In winter, the weather gets cold and sweaters keep us cozy!",
                        "explanationHindi": "सर्दियों में ठंड से बचने के लिए स्वेटर पहनते हैं।"
                  },
                  {
                        "questionEnglish": "What do we use to stay dry when dark clouds bring pouring rain? 🌧️",
                        "questionHindi": "जब आसमान से रिमझिम बारिश गिरती है, तब भीगने से बचने के लिए क्या लेते हैं? 🌧️",
                        "visual": "☔ 🌧️ 🌈",
                        "options": [
                              "Umbrella & Raincoat (छाता व बरसाती) ☔",
                              "Sunglasses (धूप का चश्मा) 🕶️",
                              "Woolen Gloves (दस्ताने) 🧤",
                              "Fan (पंखा) 🪭"
                        ],
                        "correctAnswer": "Umbrella & Raincoat (छाता व बरसाती) ☔",
                        "explanationEnglish": "An umbrella or raincoat protects our clothes from rainwater.",
                        "explanationHindi": "छाता और रेनकोट हमें बारिश के पानी से बचाते हैं।"
                  }
            ]
      }
],
    "gkTopics": [
      {
            "id": "class1-gk-1",
            "titleEnglish": "National Symbols of India (राष्ट्रीय प्रतीक)",
            "titleHindi": "भारत के गौरवशाली राष्ट्रीय प्रतीक",
            "descriptionEnglish": "Learn our National Flag, National Bird, Animal, and Flower.",
            "descriptionHindi": "तिरंगा, मोर, बाघ, कमल और राष्ट्रीय चिन्ह।",
            "icon": "🇮🇳",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Bird: Peacock 🦚",
                        "hindi": "पक्षी: मोर"
                  },
                  {
                        "english": "Animal: Royal Bengal Tiger 🐅",
                        "hindi": "पशु: बाघ"
                  },
                  {
                        "english": "Flower: Lotus 🪷",
                        "hindi": "पुष्प: कमल"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which magnificent bird with colorful feathers is India's National Bird? 🦚",
                        "questionHindi": "मनमोहक रंग-बिरंगे पंखों वाला कौन सा पक्षी भारत का राष्ट्रीय पक्षी है? 🦚",
                        "visual": "🦚 🇮🇳",
                        "options": [
                              "Peacock (मोर) 🦚",
                              "Parrot (तोता) 🦜",
                              "Pigeon (कबूतर) 🕊️",
                              "Crow (कौआ) 🐦"
                        ],
                        "correctAnswer": "Peacock (मोर) 🦚",
                        "explanationEnglish": "The Peacock (Mayur) is the proud National Bird of India!",
                        "explanationHindi": "मोर भारत का राष्ट्रीय पक्षी है!"
                  },
                  {
                        "questionEnglish": "Which powerful striped big cat is the National Animal of India? 🐅",
                        "questionHindi": "धारीदार शरीर वाला कौन सा शक्तिशाली जानवर भारत का राष्ट्रीय पशु है? 🐅",
                        "visual": "🐅 🇮🇳",
                        "options": [
                              "Royal Bengal Tiger (बाघ) 🐅",
                              "African Lion (शेर) 🦁",
                              "Cheetah (चीता) 🐆",
                              "Elephant (हाथी) 🐘"
                        ],
                        "correctAnswer": "Royal Bengal Tiger (बाघ) 🐅",
                        "explanationEnglish": "The Royal Bengal Tiger represents strength, grace, and national power.",
                        "explanationHindi": "बाघ (Tiger) भारत का राष्ट्रीय पशु है।"
                  },
                  {
                        "questionEnglish": "What is India's National Flower that blooms beautifully in ponds? 🪷",
                        "questionHindi": "पानी और कीचड़ में भी पवित्रता से खिलने वाला भारत का राष्ट्रीय फूल कौन सा है? 🪷",
                        "visual": "🪷 💧",
                        "options": [
                              "Lotus (कमल) 🪷",
                              "Rose (गुलाब) 🌹",
                              "Sunflower (सूरजमुखी) 🌻",
                              "Marigold (गेंदा) 🌼"
                        ],
                        "correctAnswer": "Lotus (कमल) 🪷",
                        "explanationEnglish": "The Lotus (Kamal) symbolizes purity and auspiciousness.",
                        "explanationHindi": "कमल (Lotus) भारत का राष्ट्रीय फूल है।"
                  }
            ]
      },
      {
            "id": "class1-gk-2",
            "titleEnglish": "Our Community Helpers (हमारे मददगार)",
            "titleHindi": "समाज के सहायक व मददगार",
            "descriptionEnglish": "Learn about Doctors, Teachers, Firefighters, and Police officers.",
            "descriptionHindi": "डॉक्टर, शिक्षक, पुलिस और सफाईकर्मियों का योगदान।",
            "icon": "👩‍⚕️",
            "difficulty": "Beginner",
            "keyConcepts": [
                  {
                        "english": "Doctor = Cures Illness 🩺",
                        "hindi": "डॉक्टर = इलाज करते हैं"
                  },
                  {
                        "english": "Teacher = Educates 👩‍🏫",
                        "hindi": "शिक्षक = ज्ञान देते हैं"
                  },
                  {
                        "english": "Police = Protects 👮",
                        "hindi": "पुलिस = सुरक्षा करती है"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Who examines us with a stethoscope and gives medicine when sick? 🩺",
                        "questionHindi": "बीमार होने पर स्टेथोस्कोप से जांच करके हमें दवा कौन देता है? 🩺",
                        "visual": "🩺 👩‍⚕️",
                        "options": [
                              "Doctor (डॉक्टर) 🩺",
                              "Pilot (पायलट) 👨‍✈️",
                              "Tailor (दर्जी) 🧵",
                              "Chef (बावर्ची) 👨‍🍳"
                        ],
                        "correctAnswer": "Doctor (डॉक्टर) 🩺",
                        "explanationEnglish": "Doctors and nurses take care of our health when we fall sick.",
                        "explanationHindi": "डॉक्टर हमारे स्वास्थ्य की देखभाल और इलाज करते हैं।"
                  },
                  {
                        "questionEnglish": "Who helps children learn alphabets, numbers, and good values in school? 👩‍🏫",
                        "questionHindi": "स्कूल में बच्चों को पढ़ाई-लिखाई और अच्छी आदतें कौन सिखाते हैं? 👩‍🏫",
                        "visual": "📚 👩‍🏫 🏫",
                        "options": [
                              "Teacher (अध्यापक/शिक्षिका) 👩‍🏫",
                              "Driver (चालक) 🚌",
                              "Mason (राजमिस्त्री) 🧱",
                              "Plumber (प्लम्बर) 🔧"
                        ],
                        "correctAnswer": "Teacher (अध्यापक/शिक्षिका) 👩‍🏫",
                        "explanationEnglish": "Teachers shape young minds with love and knowledge!",
                        "explanationHindi": "शिक्षक हमें ज्ञान और अच्छे संस्कार देते हैं।"
                  }
            ]
      }
]
  },
  "class-2": {
    "id": "class-2",
    "gradeLabelEnglish": "Class 2 (Grade 2)",
    "gradeLabelHindi": "कक्षा २ (Class 2)",
    "ageRange": "Age 6-7 Yrs",
    "color": "from-blue-500 to-indigo-600",
    "mathsTopics": [
      {
        "id": "c2-math-add-carry",
        "titleEnglish": "2-Digit Addition with Carry",
        "titleHindi": "हासिल वाला जोड़ (2-Digit Addition with Carry)",
        "descriptionEnglish": "Master column addition with regrouping and carrying over to tens.",
        "descriptionHindi": "इकाई का जोड़ १० से ज्यादा होने पर दहाई में हासिल लगाना सीखें (२८ + १५ = ४३)।",
        "icon": "➕",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Regrouping: 8 + 5 = 13 (3 ones, carry 1 ten)",
            "hindi": "८ + ५ = १३ (३ इकाई, १ दहाई हासिल)"
          },
          {
            "english": "28 + 15 = 43",
            "hindi": "२८ + १५ = ४३"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 28 + 15?",
            "questionHindi": "२८ + १५ कितना होता है?",
            "visual": "28 + 15 = ?",
            "options": [
              "41",
              "43",
              "45",
              "33"
            ],
            "correctAnswer": "43",
            "explanationEnglish": "8 + 5 = 13 (write 3, carry 1). 1 + 2 + 1 = 4. Result is 43!",
            "explanationHindi": "८ + ५ = १३ (३ लिखकर १ हासिल)। १ + २ + १ = ४। उत्तर है ४३!"
          },
          {
            "questionEnglish": "What is 36 + 27?",
            "questionHindi": "३६ + २७ कितना होता है?",
            "visual": "36 + 27 = ?",
            "options": [
              "63",
              "53",
              "61",
              "65"
            ],
            "correctAnswer": "63",
            "explanationEnglish": "6 + 7 = 13 (carry 1). 1 + 3 + 2 = 6. Answer: 63!",
            "explanationHindi": "६ + ७ = १३ (१ हासिल)। १ + ३ + २ = ६। सही उत्तर ६३ है!"
          },
          {
            "questionEnglish": "What is 45 + 38?",
            "questionHindi": "४५ + ३८ कितना होता है?",
            "visual": "45 + 38 = ?",
            "options": [
              "83",
              "73",
              "81",
              "85"
            ],
            "correctAnswer": "83",
            "explanationEnglish": "5 + 8 = 13 (carry 1). 1 + 4 + 3 = 8. Answer: 83!",
            "explanationHindi": "५ + ८ = १३ (१ हासिल)। १ + ४ + ३ = ८। सही उत्तर ८३ है!"
          },
          {
            "questionEnglish": "What is 59 + 24?",
            "questionHindi": "५९ + २४ कितना होता है?",
            "visual": "59 + 24 = ?",
            "options": [
              "83",
              "73",
              "85",
              "79"
            ],
            "correctAnswer": "83",
            "explanationEnglish": "9 + 4 = 13 (carry 1). 1 + 5 + 2 = 8. Answer: 83!",
            "explanationHindi": "९ + ४ = १३ (१ हासिल)। १ + ५ + २ = ८। सही उत्तर ८३ है!"
          },
          {
            "questionEnglish": "What is 47 + 26?",
            "questionHindi": "४७ + २६ कितना होता है?",
            "visual": "47 + 26 = ?",
            "options": [
              "73",
              "63",
              "71",
              "75"
            ],
            "correctAnswer": "73",
            "explanationEnglish": "7 + 6 = 13 (carry 1). 1 + 4 + 2 = 7. Answer: 73!",
            "explanationHindi": "७ + ६ = १३ (१ हासिल)। १ + ४ + २ = ७। सही उत्तर ७३ है!"
          }
        ]
      },
      {
        "id": "c2-math-sub-borrow",
        "titleEnglish": "2-Digit Subtraction with Borrow",
        "titleHindi": "उधार वाला घटाव (Subtraction with Borrow)",
        "descriptionEnglish": "Borrowing from tens column when top unit is smaller (42 - 17 = 25).",
        "descriptionHindi": "दहाई से १ उधार लेकर घटाना सीखें।",
        "icon": "➖",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Borrow 1 Ten = 10 Ones",
            "hindi": "१ दहाई उधार लेने पर १० इकाई मिलती है"
          },
          {
            "english": "42 - 17 = 25",
            "hindi": "४२ - १७ = २५"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 42 - 17?",
            "questionHindi": "४२ - १७ कितना होता है?",
            "visual": "42 - 17 = ?",
            "options": [
              "25",
              "35",
              "23",
              "27"
            ],
            "correctAnswer": "25",
            "explanationEnglish": "Borrow 1 ten: 12 - 7 = 5. Remaining 3 - 1 = 2. Answer: 25!",
            "explanationHindi": "२ में से ७ नहीं घटता, उधार लिया: १२ - ७ = ५ और ३ - १ = २। उत्तर: २५!"
          },
          {
            "questionEnglish": "What is 50 - 24?",
            "questionHindi": "५० - २४ कितना होता है?",
            "visual": "50 - 24 = ?",
            "options": [
              "26",
              "36",
              "24",
              "34"
            ],
            "correctAnswer": "26",
            "explanationEnglish": "Borrow 1: 10 - 4 = 6. 4 - 2 = 2. Answer: 26!",
            "explanationHindi": "१० - ४ = ६ और ४ - २ = २। सही उत्तर २६ है!"
          },
          {
            "questionEnglish": "What is 63 - 28?",
            "questionHindi": "६३ - २८ कितना होता है?",
            "visual": "63 - 28 = ?",
            "options": [
              "35",
              "45",
              "33",
              "37"
            ],
            "correctAnswer": "35",
            "explanationEnglish": "Borrow 1: 13 - 8 = 5. 5 - 2 = 3. Answer: 35!",
            "explanationHindi": "१३ - ८ = ५ और ५ - २ = ३। सही उत्तर ३५ है!"
          },
          {
            "questionEnglish": "What is 71 - 35?",
            "questionHindi": "७१ - ३५ कितना होता है?",
            "visual": "71 - 35 = ?",
            "options": [
              "36",
              "46",
              "34",
              "44"
            ],
            "correctAnswer": "36",
            "explanationEnglish": "Borrow 1: 11 - 5 = 6. 6 - 3 = 3. Answer: 36!",
            "explanationHindi": "११ - ५ = ६ और ६ - ३ = ३। सही उत्तर ३६ है!"
          },
          {
            "questionEnglish": "What is 84 - 39?",
            "questionHindi": "८४ - ३९ कितना होता है?",
            "visual": "84 - 39 = ?",
            "options": [
              "45",
              "55",
              "43",
              "47"
            ],
            "correctAnswer": "45",
            "explanationEnglish": "Borrow 1: 14 - 9 = 5. 7 - 3 = 4. Answer: 45!",
            "explanationHindi": "१४ - ९ = ५ और ७ - ३ = ४। सही उत्तर ४५ है!"
          }
        ]
      },
      {
        "id": "c2-math-tables",
        "titleEnglish": "Multiplication Tables (2, 3, 4, 5)",
        "titleHindi": "पहाड़े २, ३, ४, ५ (Multiplication Tables)",
        "descriptionEnglish": "Understand repeated addition: 4 x 5 = 5 + 5 + 5 + 5 = 20.",
        "descriptionHindi": "गुणा बार-बार जोड़ने का सरल तरीका है।",
        "icon": "✖️",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "4 × 5 = 20",
            "hindi": "४ × ५ = २०"
          },
          {
            "english": "3 × 7 = 21",
            "hindi": "३ × ७ = २१"
          },
          {
            "english": "5 × 8 = 40",
            "hindi": "५ × ८ = ४०"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 4 × 5?",
            "questionHindi": "४ × ५ कितना होता है?",
            "visual": "4 × 5 = ?",
            "options": [
              "16",
              "18",
              "20",
              "25"
            ],
            "correctAnswer": "20",
            "explanationEnglish": "4 times 5 equals 20!",
            "explanationHindi": "४ का पहाड़ा ५ बार पढ़ने पर २० आता है!"
          },
          {
            "questionEnglish": "What is 3 × 7?",
            "questionHindi": "३ × ७ कितना होता है?",
            "visual": "3 × 7 = ?",
            "options": [
              "18",
              "21",
              "24",
              "27"
            ],
            "correctAnswer": "21",
            "explanationEnglish": "3 times 7 equals 21!",
            "explanationHindi": "३ × ७ = २१ होता है!"
          },
          {
            "questionEnglish": "What is 5 × 8?",
            "questionHindi": "५ × ८ कितना होता है?",
            "visual": "5 × 8 = ?",
            "options": [
              "35",
              "40",
              "45",
              "30"
            ],
            "correctAnswer": "40",
            "explanationEnglish": "5 times 8 equals 40!",
            "explanationHindi": "५ × ८ = ४० होता है!"
          },
          {
            "questionEnglish": "What is 2 × 9?",
            "questionHindi": "२ × ९ कितना होता है?",
            "visual": "2 × 9 = ?",
            "options": [
              "16",
              "18",
              "20",
              "14"
            ],
            "correctAnswer": "18",
            "explanationEnglish": "2 times 9 equals 18!",
            "explanationHindi": "२ × ९ = १८ होता है!"
          },
          {
            "questionEnglish": "What is 4 × 6?",
            "questionHindi": "४ × ६ कितना होता है?",
            "visual": "4 × 6 = ?",
            "options": [
              "20",
              "24",
              "28",
              "18"
            ],
            "correctAnswer": "24",
            "explanationEnglish": "4 times 6 equals 24!",
            "explanationHindi": "४ × ६ = २४ होता है!"
          }
        ]
      },
      {
        "id": "c2-math-time",
        "titleEnglish": "Telling Time (Clock & Hours)",
        "titleHindi": "समय देखना (Telling Time - Clock)",
        "descriptionEnglish": "Read hour and half-hour on analog clocks (3:00, 6:30).",
        "descriptionHindi": "घड़ी में घंटे व मिनट की सुई पहचानना सीखें।",
        "icon": "⏰",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Short hand = Hours",
            "hindi": "छोटी सुई = घंटे बताती है"
          },
          {
            "english": "Long hand = Minutes",
            "hindi": "बड़ी सुई = मिनट बताती है"
          },
          {
            "english": "1 Hour = 60 Minutes",
            "hindi": "१ घंटा = ६० मिनट"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Short hand is at 3, long hand is at 12. What time is it? 🕒",
            "questionHindi": "छोटी सुई ३ पर और बड़ी सुई १२ पर है। कितना समय हुआ है? 🕒",
            "visual": "🕒 3:00",
            "options": [
              "3:00 (३ बजे)",
              "12:00 (१२ बजे)",
              "6:00 (६ बजे)",
              "9:00 (९ बजे)"
            ],
            "correctAnswer": "3:00 (३ बजे)",
            "explanationEnglish": "When the long hand points to 12, it is exactly 3 o'clock!",
            "explanationHindi": "बड़ी सुई १२ पर होने पर ठीक ३ बजते हैं!"
          },
          {
            "questionEnglish": "How many minutes are in 1 hour? ⏱️",
            "questionHindi": "१ घंटे में कितने मिनट होते हैं? ⏱️",
            "visual": "1 Hour = ? Min",
            "options": [
              "60 minutes",
              "30 minutes",
              "100 minutes",
              "24 minutes"
            ],
            "correctAnswer": "60 minutes",
            "explanationEnglish": "1 full hour has 60 minutes!",
            "explanationHindi": "१ घंटे में पूरे ६० मिनट होते हैं!"
          },
          {
            "questionEnglish": "Short hand is at 6, long hand is at 12. What time is it? 🕕",
            "questionHindi": "छोटी सुई ६ पर और बड़ी सुई १२ पर है। कितना समय हुआ है? 🕕",
            "visual": "🕕 6:00",
            "options": [
              "6:00 (६ बजे)",
              "12:00 (१२ बजे)",
              "3:00 (३ बजे)",
              "9:00 (९ बजे)"
            ],
            "correctAnswer": "6:00 (६ बजे)",
            "explanationEnglish": "It is 6 o'clock!",
            "explanationHindi": "ठीक ६ बजे हैं!"
          },
          {
            "questionEnglish": "How many hours are in 1 full day? 🌍",
            "questionHindi": "१ पूरे दिन में कितने घंटे होते हैं? 🌍",
            "visual": "1 Day = ? Hours",
            "options": [
              "24 hours",
              "12 hours",
              "60 hours",
              "10 hours"
            ],
            "correctAnswer": "24 hours",
            "explanationEnglish": "There are 24 hours in a complete day and night!",
            "explanationHindi": "१ दिन और रात मिलाकर कुल २४ घंटे होते हैं!"
          }
        ]
      }
    ],
    "englishTopics": [
      {
        "id": "c2-eng-past-tense",
        "titleEnglish": "Simple Past Tense",
        "titleHindi": "भूतकाल (Simple Past Tense)",
        "descriptionEnglish": "Talk about actions completed yesterday: played, jumped, cooked, was, were.",
        "descriptionHindi": "बीते हुए कल की क्रियाएँ: played, jumped, was, were।",
        "icon": "⏳",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Play ➔ Played",
            "hindi": "खेलना ➔ खेला (Played)"
          },
          {
            "english": "Jump ➔ Jumped",
            "hindi": "कूदना ➔ कूदा (Jumped)"
          },
          {
            "english": "Is ➔ Was",
            "hindi": "है ➔ था (Was)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Yesterday, I _____ football with friends. ⚽",
            "questionHindi": "कल मैंने दोस्तों के साथ फुटबॉल खेला: \"Yesterday, I _____ football with friends.\"",
            "visual": "⚽ ⏳",
            "options": [
              "played",
              "play",
              "playing",
              "plays"
            ],
            "correctAnswer": "played",
            "explanationEnglish": "For past action yesterday, we add -ed to play = played!",
            "explanationHindi": "बीते हुए समय के लिए \"played\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "She _____ a glass of milk in the morning. 🥛",
            "questionHindi": "उसने सुबह दूध पिया: \"She _____ a glass of milk in the morning.\"",
            "visual": "🥛",
            "options": [
              "drank",
              "drink",
              "drinking",
              "drinks"
            ],
            "correctAnswer": "drank",
            "explanationEnglish": "Past tense of \"drink\" is \"drank\"!",
            "explanationHindi": "Drink का भूतकाल \"drank\" होता है!"
          },
          {
            "questionEnglish": "They _____ at school yesterday.",
            "questionHindi": "\"They _____ at school yesterday.\" में सही क्रिया भरें:",
            "visual": "🏫 ⏳",
            "options": [
              "were",
              "was",
              "is",
              "are"
            ],
            "correctAnswer": "were",
            "explanationEnglish": "With \"They\" in the past tense, we use \"were\"!",
            "explanationHindi": "They के साथ भूतकाल में \"were\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "Rohan _____ a letter to his grandma.",
            "questionHindi": "रोहन ने पत्र लिखा: \"Rohan _____ a letter to his grandma.\"",
            "visual": "✉️",
            "options": [
              "wrote",
              "write",
              "writing",
              "writes"
            ],
            "correctAnswer": "wrote",
            "explanationEnglish": "Past tense of \"write\" is \"wrote\"!",
            "explanationHindi": "Write का भूतकाल \"wrote\" होता है!"
          }
        ]
      },
      {
        "id": "c2-eng-adjectives",
        "titleEnglish": "Describing Words (Adjectives)",
        "titleHindi": "विशेषण (Adjectives - Describing Words)",
        "descriptionEnglish": "Words that tell what kind, how many, or what color: Red apple, Tall boy.",
        "descriptionHindi": "संज्ञा की विशेषता बताने वाले शब्द: Big, Small, Red, Sweet.",
        "icon": "🎨",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "What color: Red apple 🍎",
            "hindi": "रंग: लाल सेब (Red)"
          },
          {
            "english": "What size: Big elephant 🐘",
            "hindi": "आकार: बड़ा हाथी (Big)"
          },
          {
            "english": "How many: Two dogs 🐶🐶",
            "hindi": "संख्या: दो कुत्ते (Two)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Find the Adjective: \"The elephant has big ears.\" 🐘",
            "questionHindi": "\"The elephant has big ears.\" में Adjective (विशेषण) क्या है?",
            "visual": "🐘 👂",
            "options": [
              "big",
              "elephant",
              "ears",
              "has"
            ],
            "correctAnswer": "big",
            "explanationEnglish": "\"Big\" describes the size of the ears!",
            "explanationHindi": "\"Big\" कानों के बड़े आकार की विशेषता बता रहा है!"
          },
          {
            "questionEnglish": "Which word describes ice-cream? 🍦",
            "questionHindi": "आइसक्रीम की विशेषता बताने वाला शब्द कौन सा है?",
            "visual": "🍦",
            "options": [
              "cold",
              "hot",
              "bark",
              "run"
            ],
            "correctAnswer": "cold",
            "explanationEnglish": "Ice cream is sweet and cold!",
            "explanationHindi": "आइसक्रीम ठंडी (cold) होती है!"
          },
          {
            "questionEnglish": "In \"A beautiful flower\", which word is the Adjective? 🌸",
            "questionHindi": "\"A beautiful flower\" में Adjective कौन सा है?",
            "visual": "🌸",
            "options": [
              "beautiful",
              "flower",
              "A",
              "is"
            ],
            "correctAnswer": "beautiful",
            "explanationEnglish": "\"Beautiful\" describes how pretty the flower looks!",
            "explanationHindi": "\"Beautiful\" फूल की सुंदरता बता रहा है!"
          },
          {
            "questionEnglish": "Find the opposite of \"Hot\": 🔥",
            "questionHindi": "\"Hot\" (गर्म) का विलोम शब्द कौन सा है?",
            "visual": "🔥 vs ❄️",
            "options": [
              "Cold",
              "Warm",
              "Big",
              "Fast"
            ],
            "correctAnswer": "Cold",
            "explanationEnglish": "The opposite of Hot is Cold ❄️!",
            "explanationHindi": "Hot का उल्टा Cold होता है!"
          }
        ]
      },
      {
        "id": "c2-eng-prepositions",
        "titleEnglish": "Prepositions (In, On, Under, Behind)",
        "titleHindi": "संबंधबोधक (Prepositions: In, On, Under, Behind)",
        "descriptionEnglish": "Tell where things are: Cat under the table, Ball on the chair.",
        "descriptionHindi": "स्थान बताने वाले शब्द: In (अंदर), On (पर), Under (नीचे), Behind (पीछे)।",
        "icon": "📍",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "On = ऊपर (The book is on the table)",
            "hindi": "On = मेज पर"
          },
          {
            "english": "In = अंदर (Fish in the bowl)",
            "hindi": "In = पानी के अंदर"
          },
          {
            "english": "Under = नीचे (Cat under bed)",
            "hindi": "Under = बिस्तर के नीचे"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "The cat is sleeping _____ the table. 🐈",
            "questionHindi": "बिल्ली मेज के नीचे सो रही है: \"The cat is sleeping _____ the table.\"",
            "visual": "🐈 🪑",
            "options": [
              "under",
              "on",
              "in",
              "at"
            ],
            "correctAnswer": "under",
            "explanationEnglish": "The cat is below the table, so we say \"under\"!",
            "explanationHindi": "मेज के नीचे होने पर \"under\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "The apple is _____ the desk. 🍎",
            "questionHindi": "सेब मेज के ऊपर रखा है: \"The apple is _____ the desk.\"",
            "visual": "🍎 📦",
            "options": [
              "on",
              "under",
              "into",
              "with"
            ],
            "correctAnswer": "on",
            "explanationEnglish": "The apple rests on top of the surface, so \"on\"!",
            "explanationHindi": "सतह के ऊपर होने पर \"on\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "Fish swim _____ the water. 🐟",
            "questionHindi": "मछली पानी के अंदर तैरती है: \"Fish swim _____ the water.\"",
            "visual": "🐟 🌊",
            "options": [
              "in",
              "on",
              "under",
              "behind"
            ],
            "correctAnswer": "in",
            "explanationEnglish": "Fish are inside the water, so \"in\"!",
            "explanationHindi": "पानी के अंदर होने पर \"in\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "The boy is hiding _____ the door.",
            "questionHindi": "लड़का दरवाजे के पीछे छुपा है: \"The boy is hiding _____ the door.\"",
            "visual": "🚪 👦",
            "options": [
              "behind",
              "in",
              "on",
              "under"
            ],
            "correctAnswer": "behind",
            "explanationEnglish": "Behind means at the back of the door!",
            "explanationHindi": "दरवाजे के पीछे होने पर \"behind\" का प्रयोग होता है!"
          }
        ]
      }
    ],
    "hindiTopics": [
      {
        "id": "c2-hin-u-matra",
        "titleEnglish": "U Ki Matra (ु, ू) Words",
        "titleHindi": "उ (ु) व ऊ (ू) की मात्रा के शब्द",
        "descriptionEnglish": "Differentiate between Chota U (ु) in Gulaab and Bada U (ू) in Sooraj.",
        "descriptionHindi": "गुलाब, चतुर (छोटा उ) और सूरज, भालू (बड़ा ऊ) की मात्रा का अंतर।",
        "icon": "🌹",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Chota U (ु): गुलाब (Rose)",
            "hindi": "छोटा उ (ु): गुलाब 🌹, चतुर"
          },
          {
            "english": "Bada U (ू): सूरज (Sun)",
            "hindi": "बड़ा ऊ (ू): सूरज ☀️, भालू 🐻"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"गुलाब\" में \"ग\" पर कौन सी मात्रा है? 🌹",
            "questionHindi": "\"गुलाब\" में \"ग\" पर कौन सी मात्रा है? 🌹",
            "visual": "गुलाब 🌹",
            "options": [
              "छोटा उ (ु)",
              "बड़ा ऊ (ू)",
              "छोटी इ (ि)",
              "ओ (ो)"
            ],
            "correctAnswer": "छोटा उ (ु)",
            "explanationEnglish": "गुलाब में ग पर छोटा उ (ु) की मात्रा है!",
            "explanationHindi": "गुलाब में ग पर छोटा उ (ु) की मात्रा है!"
          },
          {
            "questionEnglish": "\"सूरज\" में \"स\" पर कौन सी मात्रा है? ☀️",
            "questionHindi": "\"सूरज\" में \"स\" पर कौन सी मात्रा है? ☀️",
            "visual": "सूरज ☀️",
            "options": [
              "बड़ा ऊ (ू)",
              "छोटा उ (ु)",
              "औ (ौ)",
              "अं (ं)"
            ],
            "correctAnswer": "बड़ा ऊ (ू)",
            "explanationEnglish": "सूरज में स पर बड़ा ऊ (ू) की मात्रा है!",
            "explanationHindi": "सूरज में स पर बड़ा ऊ (ू) की मात्रा है!"
          },
          {
            "questionEnglish": "\"पुल\" (Bridge) में कौन सी मात्रा है? 🌉",
            "questionHindi": "\"पुल\" (Bridge) में कौन सी मात्रा है? 🌉",
            "visual": "पुल 🌉",
            "options": [
              "छोटा उ (ु)",
              "बड़ा ऊ (ू)",
              "ऋ (ृ)",
              "ए (े)"
            ],
            "correctAnswer": "छोटा उ (ु)",
            "explanationEnglish": "पुल में प पर छोटा उ (ु) की मात्रा है!",
            "explanationHindi": "पुल में प पर छोटा उ (ु) की मात्रा है!"
          },
          {
            "questionEnglish": "\"भालू\" में \"ल\" पर कौन सी मात्रा है? 🐻",
            "questionHindi": "\"भालू\" में \"ल\" पर कौन सी मात्रा है? 🐻",
            "visual": "भालू 🐻",
            "options": [
              "बड़ा ऊ (ू)",
              "छोटा उ (ु)",
              "ओ (ो)",
              "ऐ (ै)"
            ],
            "correctAnswer": "बड़ा ऊ (ू)",
            "explanationEnglish": "भालू में ल पर बड़ा ऊ (ू) की मात्रा है!",
            "explanationHindi": "भालू में ल पर बड़ा ऊ (ू) की मात्रा है!"
          }
        ]
      },
      {
        "id": "c2-hin-sanyukt",
        "titleEnglish": "Sanyuktakshar (क्ष, त्र, ज्ञ, श्र)",
        "titleHindi": "संयुक्ताक्षर (क्ष, त्र, ज्ञ, श्र)",
        "descriptionEnglish": "Understand combined letters: K+Sh = Ksha, T+R = Tra, J+Ny = Gya.",
        "descriptionHindi": "दो व्यंजनों के मेल से बने संयुक्त व्यंजन पहचानें।",
        "icon": "🛡️",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "क् + ष = क्ष (Kshatriya)",
            "hindi": "क् + ष = क्ष 🛡️"
          },
          {
            "english": "त् + र = त्र (Trishul)",
            "hindi": "त् + र = त्र 🔱"
          },
          {
            "english": "ज् + ञ = ज्ञ (Gyani)",
            "hindi": "ज् + ञ = ज्ञ 🧠"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"क् + ष\" मिलकर कौन सा अक्षर बनाते हैं?",
            "questionHindi": "\"क् + ष\" मिलकर कौन सा अक्षर बनाते हैं?",
            "visual": "क् + ष",
            "options": [
              "क्ष",
              "त्र",
              "ज्ञ",
              "श्र"
            ],
            "correctAnswer": "क्ष",
            "explanationEnglish": "क् और ष मिलकर \"क्ष\" बनाते हैं (जैसे क्षत्रिय)!",
            "explanationHindi": "क् और ष मिलकर \"क्ष\" बनाते हैं!"
          },
          {
            "questionEnglish": "\"त् + र\" मिलकर कौन सा अक्षर बनाते हैं?",
            "questionHindi": "\"त् + र\" मिलकर कौन सा अक्षर बनाते हैं?",
            "visual": "त् + र",
            "options": [
              "त्र",
              "क्ष",
              "श्र",
              "प्र"
            ],
            "correctAnswer": "त्र",
            "explanationEnglish": "त् और र मिलकर \"त्र\" बनाते हैं (जैसे त्रिशूल)!",
            "explanationHindi": "त् और र मिलकर \"त्र\" बनाते हैं!"
          },
          {
            "questionEnglish": "\"ज् + ञ\" मिलकर कौन सा अक्षर बनाते हैं?",
            "questionHindi": "\"ज् + ञ\" मिलकर कौन सा अक्षर बनाते हैं?",
            "visual": "ज् + ञ",
            "options": [
              "ज्ञ",
              "श्र",
              "ध्र",
              "द्व"
            ],
            "correctAnswer": "ज्ञ",
            "explanationEnglish": "ज् और ञ मिलकर \"ज्ञ\" बनाते हैं (जैसे ज्ञानी)!",
            "explanationHindi": "ज् और ञ मिलकर \"ज्ञ\" बनाते हैं!"
          },
          {
            "questionEnglish": "\"श् + र\" मिलकर कौन सा अक्षर बनाते हैं?",
            "questionHindi": "\"श् + र\" मिलकर कौन सा अक्षर बनाते हैं?",
            "visual": "श् + र",
            "options": [
              "श्र",
              "त्र",
              "क्र",
              "प्र"
            ],
            "correctAnswer": "श्र",
            "explanationEnglish": "श् और र मिलकर \"श्र\" बनाते हैं (जैसे श्रमिक)!",
            "explanationHindi": "श् और र मिलकर \"श्र\" बनाते हैं!"
          }
        ]
      },
      {
        "id": "c2-hin-sangya",
        "titleEnglish": "Sangya (संज्ञा - Noun Basics)",
        "titleHindi": "संज्ञा की पहचान (व्यक्ति, वस्तु, स्थान)",
        "descriptionEnglish": "Identify nouns in Hindi sentences: Ram, Kitab, Delhi, Ped.",
        "descriptionHindi": "वाक्यों में व्यक्ति, वस्तु, स्थान और भाव के नाम छाँटें।",
        "icon": "🏷️",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "व्यक्ति: राम, सीता",
            "hindi": "व्यक्ति: राम, सीता 👦👧"
          },
          {
            "english": "स्थान: दिल्ली, स्कूल",
            "hindi": "स्थान: दिल्ली, स्कूल 🏛️"
          },
          {
            "english": "वस्तु: मेज, कलम",
            "hindi": "वस्तु: मेज, कलम 🖊️"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"राम किताब पढ़ता है।\" में संज्ञा शब्द कौन से हैं?",
            "questionHindi": "\"राम किताब पढ़ता है।\" में संज्ञा शब्द कौन से हैं?",
            "visual": "👦 📖",
            "options": [
              "राम और किताब",
              "पढ़ता है",
              "किताब और पढ़ता",
              "केवल है"
            ],
            "correctAnswer": "राम और किताब",
            "explanationEnglish": "राम (व्यक्ति) और किताब (वस्तु) दोनों संज्ञा हैं!",
            "explanationHindi": "राम और किताब दोनों नाम वाले शब्द (संज्ञा) हैं!"
          },
          {
            "questionEnglish": "\"ताजमहल\" किस प्रकार की संज्ञा है? 🏛️",
            "questionHindi": "\"ताजमहल\" किस प्रकार की संज्ञा है? 🏛️",
            "visual": "🏛️ ताजमहल",
            "options": [
              "स्थान (Place)",
              "व्यक्ति (Person)",
              "जानवर (Animal)",
              "क्रिया (Action)"
            ],
            "correctAnswer": "स्थान (Place)",
            "explanationEnglish": "ताजमहल एक प्रसिद्ध स्थान (इमारत) का नाम है!",
            "explanationHindi": "ताजमहल एक जगह (स्थान) का नाम है!"
          },
          {
            "questionEnglish": "इनमें से जानवर का नाम (संज्ञा) कौन सा है?",
            "questionHindi": "इनमें से जानवर का नाम (संज्ञा) कौन सा है?",
            "visual": "🦁",
            "options": [
              "शेर",
              "दौड़ना",
              "मीठा",
              "ऊपर"
            ],
            "correctAnswer": "शेर",
            "explanationEnglish": "शेर एक जानवर का नाम है, इसलिए यह संज्ञा है!",
            "explanationHindi": "शेर एक जानवर का नाम है!"
          },
          {
            "questionEnglish": "इनमें से संज्ञा शब्द पहचानिए:",
            "questionHindi": "इनमें से संज्ञा शब्द पहचानिए:",
            "visual": "🌳",
            "options": [
              "बगीचा",
              "रोना",
              "सुंदर",
              "जल्दी"
            ],
            "correctAnswer": "बगीचा",
            "explanationEnglish": "बगीचा एक स्थान का नाम है!",
            "explanationHindi": "बगीचा एक जगह का नाम है, इसलिए संज्ञा है!"
          }
        ]
      }
    ],
    "scienceTopics": [
      {
            "id": "class2-sci-1",
            "titleEnglish": "Internal Organs of Human Body (मानव शरीर के अंग)",
            "titleHindi": "शरीर के महत्वपूर्ण आंतरिक अंग",
            "descriptionEnglish": "Learn about Heart, Lungs, Brain, Stomach and how they work.",
            "descriptionHindi": "हृदय, फेफड़े, मस्तिष्क और पेट के कार्य।",
            "icon": "🫀",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Heart: Pumps blood ❤️",
                        "hindi": "हृदय: रक्त संचार करता है"
                  },
                  {
                        "english": "Lungs: Breath oxygen 🫁",
                        "hindi": "फेफड़े: सांस लेने में मदद"
                  },
                  {
                        "english": "Brain: Master computer 🧠",
                        "hindi": "मस्तिष्क: सोचना व नियंत्रण"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which organ inside our chest continuously pumps blood to all body parts? ❤️",
                        "questionHindi": "हमारी छाती में कौन सा अंग दिन-रात रक्त (blood) पंप करता रहता है? ❤️",
                        "visual": "❤️ 🩸 🫀",
                        "options": [
                              "Heart (हृदय/दिल) 🫀",
                              "Stomach (आमाशय/पेट) 🫄",
                              "Lungs (फेफड़े) 🫁",
                              "Kidney (गुर्दा)"
                        ],
                        "correctAnswer": "Heart (हृदय/दिल) 🫀",
                        "explanationEnglish": "The heart beats over 100,000 times a day to circulate blood!",
                        "explanationHindi": "हृदय पूरे शरीर में निरंतर रक्त का संचार करता है।"
                  },
                  {
                        "questionEnglish": "Which pair of organs expand like balloons when we breathe in fresh air? 🫁",
                        "questionHindi": "जब हम ताजी हवा अंदर खींचते हैं, तो गुब्बारे की तरह कौन से अंग फूलते हैं? 🫁",
                        "visual": "🫁 🌬️ 🫁",
                        "options": [
                              "Lungs (फेफड़े) 🫁",
                              "Liver (यकृत)",
                              "Bones (हड्डियां) 🦴",
                              "Skin (त्वचा)"
                        ],
                        "correctAnswer": "Lungs (फेफड़े) 🫁",
                        "explanationEnglish": "Lungs take in oxygen from air and release carbon dioxide.",
                        "explanationHindi": "फेफड़े हवा से ऑक्सीजन लेकर खून में पहुंचाते हैं।"
                  },
                  {
                        "questionEnglish": "Which super organ is safely protected inside our hard skull and controls thinking? 🧠",
                        "questionHindi": "खोपड़ी के अंदर सुरक्षित कौन सा अंग सोचने, याद रखने और शरीर को निर्देश देने का काम करता है? 🧠",
                        "visual": "🧠 💡 💭",
                        "options": [
                              "Brain (मस्तिष्क/दिमाग) 🧠",
                              "Nose (नाक) 👃",
                              "Tongue (जीभ) 👅",
                              "Ear (कान) 👂"
                        ],
                        "correctAnswer": "Brain (मस्तिष्क/दिमाग) 🧠",
                        "explanationEnglish": "The brain is the master computer of our entire body!",
                        "explanationHindi": "दिमाग हमारे पूरे शरीर को नियंत्रित करता है।"
                  }
            ]
      },
      {
            "id": "class2-sci-2",
            "titleEnglish": "Animal Habitats & Eating Habits (जानवरों के भोजन व आवास)",
            "titleHindi": "जानवरों के आहार व उनके प्राकृतिक आवास",
            "descriptionEnglish": "Understand Herbivores, Carnivores, Omnivores, and where animals live.",
            "descriptionHindi": "शाकाहारी, मांसाहारी व सर्वाहारी जीवों की विशेषताएं।",
            "icon": "🦁",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Herbivore: Plants only (Deer, Cow) 🌿",
                        "hindi": "शाकाहारी: केवल पौधे"
                  },
                  {
                        "english": "Carnivore: Meat eaters (Lion, Tiger) 🥩",
                        "hindi": "मांसाहारी: केवल मांस"
                  },
                  {
                        "english": "Omnivore: Both plants & meat (Bear, Crow) 🍱",
                        "hindi": "सर्वाहारी: पौधे व मांस दोनों"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Animals that eat ONLY plants, fruits, and green grass are known as? 🌿",
                        "questionHindi": "जो जानवर केवल पेड़-पौधे, पत्तियां और हरी घास खाते हैं, वे क्या कहलाते हैं? 🌿",
                        "visual": "🦌 🌿 🐮",
                        "options": [
                              "Herbivores (शाकाहारी) 🌿",
                              "Carnivores (मांसाहारी) 🥩",
                              "Insectivores",
                              "Aquatic"
                        ],
                        "correctAnswer": "Herbivores (शाकाहारी) 🌿",
                        "explanationEnglish": "Cows, elephants, and deer are herbivores because they eat only plants.",
                        "explanationHindi": "पौधे खाने वाले जीव शाकाहारी (Herbivores) कहलाते हैं।"
                  },
                  {
                        "questionEnglish": "Which amphibian animal can breathe and live both in water and on land? 🐸",
                        "questionHindi": "कौन सा जीव जल और थल (जमीन) दोनों पर आसानी से रह सकता है? 🐸",
                        "visual": "🐸 💧 🍃",
                        "options": [
                              "Frog (मेंढक) 🐸",
                              "Fish (मछली) 🐟",
                              "Monkey (बंदर) 🐒",
                              "Eagle (चील) 🦅"
                        ],
                        "correctAnswer": "Frog (मेंढक) 🐸",
                        "explanationEnglish": "Frogs are amphibians—they swim in water and hop on land!",
                        "explanationHindi": "मेंढक उभयचर (Amphibian) है जो पानी और जमीन दोनों पर रहता है।"
                  }
            ]
      }
],
    "gkTopics": [
      {
            "id": "class2-gk-1",
            "titleEnglish": "India: Capital, Rivers & Famous Places (भारत दर्शन)",
            "titleHindi": "भारत की राजधानी, पवित्र नदियाँ व प्रसिद्ध स्थल",
            "descriptionEnglish": "Learn India's capital New Delhi, holy river Ganga, and famous monuments.",
            "descriptionHindi": "नई दिल्ली, गंगा नदी, हिमालय और ऐतिहासिक इमारतों का ज्ञान।",
            "icon": "🏛️",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Capital of India = New Delhi 🏛️",
                        "hindi": "भारत की राजधानी = नई दिल्ली"
                  },
                  {
                        "english": "Longest River = Ganga 🌊",
                        "hindi": "सबसे लंबी नदी = गंगा"
                  },
                  {
                        "english": "Highest Mountains = Himalayas 🏔️",
                        "hindi": "सर्वोच्च पर्वतमाला = हिमालय"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "What is the official capital city of our country India? 🏛️",
                        "questionHindi": "हमारे देश भारत की आधिकारिक राजधानी कौन सा शहर है? 🏛️",
                        "visual": "🏛️ 🇮🇳",
                        "options": [
                              "New Delhi (नई दिल्ली) 🏛️",
                              "Mumbai (मुंबई)",
                              "Kolkata (कोलकाता)",
                              "Bengaluru (बेंगलुरु)"
                        ],
                        "correctAnswer": "New Delhi (नई दिल्ली) 🏛️",
                        "explanationEnglish": "New Delhi is the national capital of India where Parliament is located.",
                        "explanationHindi": "नई दिल्ली भारत की राजधानी है।"
                  },
                  {
                        "questionEnglish": "Which is the longest and most revered holy river in India? 🌊",
                        "questionHindi": "भारत की सबसे लंबी और सबसे पवित्र मानी जाने वाली नदी कौन सी है? 🌊",
                        "visual": "🌊 🏔️",
                        "options": [
                              "River Ganga (गंगा नदी) 🌊",
                              "River Yamuna (यमुना)",
                              "River Kaveri (कावेरी)",
                              "River Narmada (नर्मदा)"
                        ],
                        "correctAnswer": "River Ganga (गंगा नदी) 🌊",
                        "explanationEnglish": "River Ganga originates from Gangotri glacier in Himalayas and flows over 2,525 km.",
                        "explanationHindi": "गंगा भारत की सबसे लंबी और प्रमुख नदी है।"
                  },
                  {
                        "questionEnglish": "In which historic city of Uttar Pradesh is the world-famous white marble Taj Mahal? 🏰",
                        "questionHindi": "सफेद संगमरमर से बना विश्वप्रसिद्ध ताजमहल उत्तर प्रदेश के किस शहर में है? 🏰",
                        "visual": "🏰 🕌",
                        "options": [
                              "Agra (आगरा) 🏰",
                              "Jaipur (जयपुर)",
                              "Varanasi (वाराणसी)",
                              "Lucknow (लखनऊ)"
                        ],
                        "correctAnswer": "Agra (आगरा) 🏰",
                        "explanationEnglish": "The Taj Mahal is located on the banks of river Yamuna in Agra.",
                        "explanationHindi": "ताजमहल आगरा शहर में यमुना नदी के तट पर स्थित है।"
                  }
            ]
      },
      {
            "id": "class2-gk-2",
            "titleEnglish": "Festivals of India (भारत के प्रमुख त्योहार)",
            "titleHindi": "भारत के रंग-बिरंगे त्योहार व उत्सव",
            "descriptionEnglish": "Celebrate Diwali, Eid, Christmas, Holi, and National festivals.",
            "descriptionHindi": "दीपावली, होली, ईद, क्रिसमस और राष्ट्रीय पर्व।",
            "icon": "🪔",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Diwali = Festival of Lights 🪔",
                        "hindi": "दीपावली = दीपों का पर्व"
                  },
                  {
                        "english": "Holi = Festival of Colors 🎨",
                        "hindi": "होली = रंगों का पर्व"
                  },
                  {
                        "english": "Independence Day = 15th August 🇮🇳",
                        "hindi": "स्वतंत्रता दिवस = १५ अगस्त"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which joyful festival is celebrated with glowing earthen lamps (diyas) and sweets? 🪔",
                        "questionHindi": "दीपक जलाने, घरों को सजाने और मिठाइयाँ बांटने का रोशनी वाला त्योहार कौन सा है? 🪔",
                        "visual": "🪔 ✨ 🎆",
                        "options": [
                              "Diwali (दीपावली) 🪔",
                              "Holi (होली) 🎨",
                              "Eid (ईद) 🌙",
                              "Christmas (क्रिसमस) 🎄"
                        ],
                        "correctAnswer": "Diwali (दीपावली) 🪔",
                        "explanationEnglish": "Diwali celebrates the victory of light over darkness and good over evil.",
                        "explanationHindi": "दीपावली दीपों और प्रकाश का पावन त्योहार है।"
                  },
                  {
                        "questionEnglish": "On which date does India proudly celebrate its Independence Day every year? 🇮🇳",
                        "questionHindi": "हर साल भारत किस तारीख को अपना स्वतंत्रता दिवस (Independence Day) मनाता है? 🇮🇳",
                        "visual": "🇮🇳 🕊️ 🎖️",
                        "options": [
                              "15th August (१५ अगस्त) 🇮🇳",
                              "26th January (२६ जनवरी)",
                              "2nd October (२ अक्टूबर)",
                              "14th November (१४ नवंबर)"
                        ],
                        "correctAnswer": "15th August (१५ अगस्त) 🇮🇳",
                        "explanationEnglish": "India gained independence on 15th August 1947.",
                        "explanationHindi": "भारत १५ अगस्त १९४७ को स्वतंत्र हुआ था।"
                  }
            ]
      }
]
  },
  "class-3": {
    "id": "class-3",
    "gradeLabelEnglish": "Class 3 (Grade 3)",
    "gradeLabelHindi": "कक्षा ३ (Class 3)",
    "ageRange": "Age 7-8 Yrs",
    "color": "from-purple-500 to-indigo-600",
    "mathsTopics": [
      {
        "id": "c3-math-multiplication",
        "titleEnglish": "2-Digit Multiplication",
        "titleHindi": "२-अंकीय गुणा (2-Digit Multiplication)",
        "descriptionEnglish": "Multiply 2-digit numbers by 1-digit numbers (15 × 6 = 90).",
        "descriptionHindi": "दो अंकों वाली संख्या का गुणा करना सीखें (१५ × ६ = ९०)।",
        "icon": "✖️",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "15 × 6 = (10 × 6) + (5 × 6) = 60 + 30 = 90",
            "hindi": "१५ × ६ = ९०"
          },
          {
            "english": "24 × 4 = 96",
            "hindi": "२४ × ४ = ९६"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 15 × 6?",
            "questionHindi": "१५ × ६ कितना होता है?",
            "visual": "15 × 6 = ?",
            "options": [
              "80",
              "90",
              "95",
              "100"
            ],
            "correctAnswer": "90",
            "explanationEnglish": "15 × 6 = 90!",
            "explanationHindi": "१५ का गुणा ६ से करने पर ९० आता है!"
          },
          {
            "questionEnglish": "What is 24 × 4?",
            "questionHindi": "२४ × ४ कितना होता है?",
            "visual": "24 × 4 = ?",
            "options": [
              "96",
              "86",
              "94",
              "104"
            ],
            "correctAnswer": "96",
            "explanationEnglish": "24 × 4 = 96!",
            "explanationHindi": "२४ × ४ = ९६ होता है!"
          },
          {
            "questionEnglish": "What is 18 × 5?",
            "questionHindi": "१८ × ५ कितना होता है?",
            "visual": "18 × 5 = ?",
            "options": [
              "90",
              "85",
              "95",
              "80"
            ],
            "correctAnswer": "90",
            "explanationEnglish": "18 × 5 = 90!",
            "explanationHindi": "१८ × ५ = ९० होता है!"
          },
          {
            "questionEnglish": "What is 25 × 4?",
            "questionHindi": "२५ × ४ कितना होता है?",
            "visual": "25 × 4 = ?",
            "options": [
              "100",
              "90",
              "110",
              "125"
            ],
            "correctAnswer": "100",
            "explanationEnglish": "25 × 4 = 100!",
            "explanationHindi": "२५ × ४ = १०० होता है!"
          },
          {
            "questionEnglish": "What is 12 × 8?",
            "questionHindi": "१२ × ८ कितना होता है?",
            "visual": "12 × 8 = ?",
            "options": [
              "96",
              "86",
              "98",
              "108"
            ],
            "correctAnswer": "96",
            "explanationEnglish": "12 × 8 = 96!",
            "explanationHindi": "१२ × ८ = ९६ होता है!"
          }
        ]
      },
      {
        "id": "c3-math-division",
        "titleEnglish": "Basic Division (Sharing Equally)",
        "titleHindi": "भाग की समझ (Division - Sharing Equally)",
        "descriptionEnglish": "Divide items equally among groups: 18 cookies divided by 3 friends = 6 each.",
        "descriptionHindi": "बराबर-बराबर बाँटना और भाग करना (१८ ÷ ३ = ६)।",
        "icon": "➗",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "18 ÷ 3 = 6 (Inverse of 6 × 3 = 18)",
            "hindi": "१८ ÷ ३ = ६"
          },
          {
            "english": "24 ÷ 4 = 6",
            "hindi": "२४ ÷ ४ = ६"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 18 ÷ 3?",
            "questionHindi": "१८ ÷ ३ कितना होता है?",
            "visual": "18 ÷ 3 = ?",
            "options": [
              "5",
              "6",
              "7",
              "8"
            ],
            "correctAnswer": "6",
            "explanationEnglish": "18 divided by 3 is 6, because 6 × 3 = 18!",
            "explanationHindi": "१८ को ३ से भाग देने पर ६ आता है!"
          },
          {
            "questionEnglish": "What is 24 ÷ 4?",
            "questionHindi": "२४ ÷ ४ कितना होता है?",
            "visual": "24 ÷ 4 = ?",
            "options": [
              "5",
              "6",
              "7",
              "8"
            ],
            "correctAnswer": "6",
            "explanationEnglish": "24 ÷ 4 = 6!",
            "explanationHindi": "२४ ÷ ४ = ६ होता है!"
          },
          {
            "questionEnglish": "What is 35 ÷ 5?",
            "questionHindi": "३५ ÷ ५ कितना होता है?",
            "visual": "35 ÷ 5 = ?",
            "options": [
              "6",
              "7",
              "8",
              "9"
            ],
            "correctAnswer": "7",
            "explanationEnglish": "35 ÷ 5 = 7!",
            "explanationHindi": "३५ ÷ ५ = ७ होता है!"
          },
          {
            "questionEnglish": "Share 20 cookies equally among 4 friends. Each gets? 🍪",
            "questionHindi": "२० बिस्कुट ४ दोस्तों में बराबर बाँटने पर हर एक को कितने मिलेंगे? 🍪",
            "visual": "20 🍪 ÷ 4 👦",
            "options": [
              "4",
              "5",
              "6",
              "10"
            ],
            "correctAnswer": "5",
            "explanationEnglish": "20 divided by 4 equals 5 cookies each!",
            "explanationHindi": "२० ÷ ४ = ५ बिस्कुट प्रत्येक को मिलेंगे!"
          },
          {
            "questionEnglish": "What is 42 ÷ 6?",
            "questionHindi": "४२ ÷ ६ कितना होता है?",
            "visual": "42 ÷ 6 = ?",
            "options": [
              "6",
              "7",
              "8",
              "9"
            ],
            "correctAnswer": "7",
            "explanationEnglish": "42 ÷ 6 = 7, because 7 × 6 = 42!",
            "explanationHindi": "४२ ÷ ६ = ७ होता है!"
          }
        ]
      },
      {
        "id": "c3-math-fractions",
        "titleEnglish": "Fractions Intro (Halves & Quarters)",
        "titleHindi": "भिन्न की समझ (Fractions - 1/2, 1/4, 3/4)",
        "descriptionEnglish": "Understand part of a whole: Half (1/2), Quarter (1/4), Three-quarters (3/4).",
        "descriptionHindi": "आधा (१/२), चौथाई (१/४) और तीन-चौथाई (३/४) की समझ।",
        "icon": "🥧",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "1/2 = Half (1 part out of 2)",
            "hindi": "१/२ = आधा"
          },
          {
            "english": "1/4 = Quarter (1 part out of 4)",
            "hindi": "१/४ = चौथाई"
          },
          {
            "english": "Numerator = Top, Denominator = Bottom",
            "hindi": "अंश = ऊपर की संख्या, हर = नीचे की संख्या"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is half (1/2) of 10?",
            "questionHindi": "१० का आधा (१/२) कितना होगा?",
            "visual": "10 ÷ 2 = ?",
            "options": [
              "4",
              "5",
              "6",
              "2"
            ],
            "correctAnswer": "5",
            "explanationEnglish": "Half of 10 is 5!",
            "explanationHindi": "१० का आधा ५ होता है!"
          },
          {
            "questionEnglish": "A pizza is cut into 4 equal slices. You eat 1. What fraction did you eat? 🍕",
            "questionHindi": "एक पिज्ज़ा के ४ टुकड़े हैं। आपने १ खाया। कौन सी भिन्न बनेगी? 🍕",
            "visual": "🍕 1/4",
            "options": [
              "1/4",
              "1/2",
              "3/4",
              "4/4"
            ],
            "correctAnswer": "1/4",
            "explanationEnglish": "1 slice out of 4 is 1/4 (one quarter)!",
            "explanationHindi": "४ में से १ भाग खाया, यानी १/४!"
          },
          {
            "questionEnglish": "Which fraction is equal to 1/2?",
            "questionHindi": "इनमें से कौन सी भिन्न १/२ (आधा) के बराबर है?",
            "visual": "1/2 = ?",
            "options": [
              "2/4",
              "1/3",
              "3/4",
              "1/5"
            ],
            "correctAnswer": "2/4",
            "explanationEnglish": "2/4 simplifies to 1/2!",
            "explanationHindi": "२/४ भी आधा (१/२) ही होता है!"
          },
          {
            "questionEnglish": "In fraction 3/4, what is the Top number (Numerator)?",
            "questionHindi": "भिन्न ३/४ में ऊपर की संख्या (अंश) क्या है?",
            "visual": "3/4",
            "options": [
              "3",
              "4",
              "7",
              "1"
            ],
            "correctAnswer": "3",
            "explanationEnglish": "In 3/4, 3 is the Numerator (top) and 4 is Denominator (bottom)!",
            "explanationHindi": "३/४ में ३ अंश (Numerator) है!"
          },
          {
            "questionEnglish": "What fraction represents three-fourths?",
            "questionHindi": "तीन-चौथाई को भिन्न में कैसे लिखते हैं?",
            "visual": "3 parts out of 4",
            "options": [
              "3/4",
              "1/4",
              "1/2",
              "2/3"
            ],
            "correctAnswer": "3/4",
            "explanationEnglish": "Three-fourths is written as 3/4!",
            "explanationHindi": "तीन-चौथाई को ३/४ लिखते हैं!"
          }
        ]
      },
      {
        "id": "c3-math-money",
        "titleEnglish": "Indian Currency & Word Problems (₹)",
        "titleHindi": "रुपये-पैसे व व्यावहारिक सवाल (Indian Currency)",
        "descriptionEnglish": "Solve money word problems with ₹10, ₹20, ₹50, ₹100 notes and change calculation.",
        "descriptionHindi": "दुकान से सामान खरीदना और छुट्टे पैसे वापस पाना सीखें।",
        "icon": "💵",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "₹1 = 100 Paise",
            "hindi": "१ रुपया = १०० पैसे"
          },
          {
            "english": "₹50 + ₹20 = ₹70",
            "hindi": "₹५० + ₹२० = ₹७०"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "₹50 note + ₹20 note = ? 💵",
            "questionHindi": "₹५० का नोट + ₹२० का नोट = कितने रुपये? 💵",
            "visual": "₹50 + ₹20 = ?",
            "options": [
              "₹70",
              "₹60",
              "₹80",
              "₹90"
            ],
            "correctAnswer": "₹70",
            "explanationEnglish": "50 + 20 = 70 Rupees!",
            "explanationHindi": "५० + २० = ७० रुपये होते हैं!"
          },
          {
            "questionEnglish": "You buy a notebook for ₹15 and pay ₹20. How much change will you get?",
            "questionHindi": "आपने ₹१५ की कॉपी खरीदी और ₹२० दिए। दुकानदार कितने रुपये वापस देगा?",
            "visual": "₹20 - ₹15 = ?",
            "options": [
              "₹5",
              "₹10",
              "₹3",
              "₹2"
            ],
            "correctAnswer": "₹5",
            "explanationEnglish": "20 - 15 = 5 Rupees change!",
            "explanationHindi": "२० - १५ = ५ रुपये वापस मिलेंगे!"
          },
          {
            "questionEnglish": "How many 50-paise coins make ₹1? 🪙",
            "questionHindi": "५० पैसे के कितने सिक्के मिलकर ₹१ बनाते हैं? 🪙",
            "visual": "50p + 50p = ₹1",
            "options": [
              "2",
              "4",
              "5",
              "10"
            ],
            "correctAnswer": "2",
            "explanationEnglish": "Two 50-paise coins make 100 paise = ₹1!",
            "explanationHindi": "५० पैसे के २ सिक्के मिलकर ₹१ बनाते हैं!"
          },
          {
            "questionEnglish": "₹100 - ₹35 = ?",
            "questionHindi": "₹१०० - ₹३५ कितना होता है?",
            "visual": "100 - 35 = ?",
            "options": [
              "₹65",
              "₹75",
              "₹55",
              "₹60"
            ],
            "correctAnswer": "₹65",
            "explanationEnglish": "100 - 35 = 65 Rupees!",
            "explanationHindi": "१०० में से ३५ घटाने पर ६५ रुपये बचते हैं!"
          },
          {
            "questionEnglish": "If 1 chocolate costs ₹5, how much will 6 chocolates cost? 🍫",
            "questionHindi": "यदि १ चॉकलेट ₹५ की है, तो ६ चॉकलेट कितने रुपये की होंगी? 🍫",
            "visual": "6 × ₹5 = ?",
            "options": [
              "₹30",
              "₹25",
              "₹35",
              "₹20"
            ],
            "correctAnswer": "₹30",
            "explanationEnglish": "6 × 5 = 30 Rupees!",
            "explanationHindi": "६ × ५ = ३० रुपये!"
          }
        ]
      }
    ],
    "englishTopics": [
      {
        "id": "c3-eng-continuous",
        "titleEnglish": "Present Continuous (is/are + verb-ing)",
        "titleHindi": "वर्तमान निरंतर काल (Present Continuous)",
        "descriptionEnglish": "Express what is happening right now: The birds are flying, Rohan is reading.",
        "descriptionHindi": "अभी हो रहे कार्यों के लिए: is/am/are + verb-ing (खेल रहा है, पढ़ रही है)।",
        "icon": "🏃",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "I am playing",
            "hindi": "मैं खेल रहा हूँ (I am playing)"
          },
          {
            "english": "He / She is running",
            "hindi": "वह दौड़ रहा है (is running)"
          },
          {
            "english": "They are singing",
            "hindi": "वे गा रहे हैं (are singing)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "The birds _____ high in the sky. 🕊️",
            "questionHindi": "\"The birds _____ high in the sky.\" में सही रूप भरें:",
            "visual": "🕊️ ☁️",
            "options": [
              "are flying",
              "is flying",
              "flies",
              "flew"
            ],
            "correctAnswer": "are flying",
            "explanationEnglish": "Birds is plural, so we use \"are flying\"!",
            "explanationHindi": "Birds बहुवचन है, इसलिए \"are flying\" आएगा!"
          },
          {
            "questionEnglish": "He _____ an interesting storybook right now. 📖",
            "questionHindi": "\"He _____ an interesting storybook right now.\" में सही क्रिया क्या है?",
            "visual": "👦 📖",
            "options": [
              "is reading",
              "are reading",
              "read",
              "reads"
            ],
            "correctAnswer": "is reading",
            "explanationEnglish": "With \"He\" in the present continuous, use \"is reading\"!",
            "explanationHindi": "He के साथ \"is reading\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "I _____ my school homework. ✏️",
            "questionHindi": "\"I _____ my school homework.\" में सही रूप भरें:",
            "visual": "📝",
            "options": [
              "am doing",
              "is doing",
              "are doing",
              "done"
            ],
            "correctAnswer": "am doing",
            "explanationEnglish": "With \"I\", we always use \"am\" = \"am doing\"!",
            "explanationHindi": "I के साथ \"am doing\" आएगा!"
          },
          {
            "questionEnglish": "The kids _____ football happily in the playground. ⚽",
            "questionHindi": "\"The kids _____ football happily in the playground.\"",
            "visual": "⚽ 👦👧",
            "options": [
              "are playing",
              "is playing",
              "plays",
              "played"
            ],
            "correctAnswer": "are playing",
            "explanationEnglish": "Kids is plural, so use \"are playing\"!",
            "explanationHindi": "Kids बहुवचन है, इसलिए \"are playing\" आएगा!"
          }
        ]
      },
      {
        "id": "c3-eng-conjunctions",
        "titleEnglish": "Conjunctions (And, But, Because)",
        "titleHindi": "संयोजक शब्द (Conjunctions: And, But, Because)",
        "descriptionEnglish": "Connect sentences smoothly: I ran fast BUT missed the bus. He likes milk AND cookies.",
        "descriptionHindi": "वाक्यों को जोड़ने वाले शब्द: And (और), But (लेकिन), Because (क्योंकि)।",
        "icon": "🔗",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "And = जोड़ना (Milk and cookies)",
            "hindi": "And = और"
          },
          {
            "english": "But = अंतर/परंतु (He tried but failed)",
            "hindi": "But = लेकिन / परंतु"
          },
          {
            "english": "Because = कारण (Stayed home because it rained)",
            "hindi": "Because = क्योंकि"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "I ran fast, _____ I missed the bus. 🚌",
            "questionHindi": "\"I ran fast, _____ I missed the bus.\" में कौन सा Conjunction आएगा?",
            "visual": "🏃 🚌",
            "options": [
              "but",
              "and",
              "or",
              "so"
            ],
            "correctAnswer": "but",
            "explanationEnglish": "\"But\" shows contrast between running fast and still missing the bus!",
            "explanationHindi": "\"But\" (लेकिन) दो विपरीत बातों को जोड़ता है!"
          },
          {
            "questionEnglish": "Rohan likes apples _____ mangoes. 🍎",
            "questionHindi": "\"Rohan likes apples _____ mangoes.\" में सही शब्द भरें:",
            "visual": "🍎 🥭",
            "options": [
              "and",
              "but",
              "because",
              "yet"
            ],
            "correctAnswer": "and",
            "explanationEnglish": "\"And\" joins two similar things he likes!",
            "explanationHindi": "\"And\" (और) दो पसंदीदा फलों को जोड़ता है!"
          },
          {
            "questionEnglish": "She stayed at home _____ it was raining heavily. 🌧️",
            "questionHindi": "\"She stayed at home _____ it was raining heavily.\"",
            "visual": "🌧️ 🏠",
            "options": [
              "because",
              "but",
              "and",
              "or"
            ],
            "correctAnswer": "because",
            "explanationEnglish": "\"Because\" gives the reason why she stayed home!",
            "explanationHindi": "\"Because\" (क्योंकि) कारण बताता है!"
          },
          {
            "questionEnglish": "Would you like milk _____ juice? 🥛",
            "questionHindi": "\"Would you like milk _____ juice?\" में विकल्प पूछने के लिए क्या आएगा?",
            "visual": "🥛 or 🧃",
            "options": [
              "or",
              "and",
              "but",
              "so"
            ],
            "correctAnswer": "or",
            "explanationEnglish": "\"Or\" gives a choice between two options!",
            "explanationHindi": "विकल्प चुनने के लिए \"or\" (या) का प्रयोग होता है!"
          }
        ]
      },
      {
        "id": "c3-eng-adverbs",
        "titleEnglish": "Adverbs of Manner (quickly, softly)",
        "titleHindi": "क्रियाविशेषण (Adverbs of Manner)",
        "descriptionEnglish": "Tell how an action is done: The turtle walked slowly. The baby slept peacefully.",
        "descriptionHindi": "काम कैसे किया गया: Quickly (जल्दी), Slowly (धीरे), Loudly (ज़ोर से)।",
        "icon": "⚡",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "Quick ➔ Quickly (जल्दी से)",
            "hindi": "Quick ➔ Quickly"
          },
          {
            "english": "Slow ➔ Slowly (धीरे से)",
            "hindi": "Slow ➔ Slowly"
          },
          {
            "english": "Loud ➔ Loudly (ज़ोर से)",
            "hindi": "Loud ➔ Loudly"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "The slow turtle walked _____. 🐢",
            "questionHindi": "\"The slow turtle walked _____.\"",
            "visual": "🐢",
            "options": [
              "slowly",
              "slow",
              "quick",
              "loud"
            ],
            "correctAnswer": "slowly",
            "explanationEnglish": "\"Slowly\" tells HOW the turtle walked!",
            "explanationHindi": "\"Slowly\" चाल का तरीका बता रहा है!"
          },
          {
            "questionEnglish": "The baby cried _____ in the room. 👶",
            "questionHindi": "\"The baby cried _____ in the room.\"",
            "visual": "👶 😭",
            "options": [
              "loudly",
              "loud",
              "soft",
              "slow"
            ],
            "correctAnswer": "loudly",
            "explanationEnglish": "\"Loudly\" describes how the baby was crying!",
            "explanationHindi": "\"Loudly\" (ज़ोर से) रोने की आवाज़ की विशेषता है!"
          },
          {
            "questionEnglish": "She solved the math riddle _____. 💡",
            "questionHindi": "\"She solved the math riddle _____.\"",
            "visual": "💡 ✨",
            "options": [
              "easily",
              "easy",
              "hardly",
              "slow"
            ],
            "correctAnswer": "easily",
            "explanationEnglish": "\"Easily\" is the adverb form describing how she solved it!",
            "explanationHindi": "\"Easily\" (सरलता से) क्रियाविशेषण है!"
          },
          {
            "questionEnglish": "The fierce dog barked _____ at the thief. 🐕",
            "questionHindi": "\"The fierce dog barked _____ at the thief.\"",
            "visual": "🐕",
            "options": [
              "loudly",
              "softly",
              "slow",
              "sweet"
            ],
            "correctAnswer": "loudly",
            "explanationEnglish": "\"Loudly\" tells how the dog barked!",
            "explanationHindi": "\"Loudly\" (तेज़ आवाज़ में) क्रियाविशेषण है!"
          }
        ]
      }
    ],
    "hindiTopics": [
      {
        "id": "c3-hin-kriya",
        "titleEnglish": "Kriya (क्रिया - Action Words)",
        "titleHindi": "क्रिया की पहचान (काम बताने वाले शब्द)",
        "descriptionEnglish": "Identify action words in sentences: Daudna, Padhna, Khelna, Hasna.",
        "descriptionHindi": "जिस शब्द से किसी काम के करने या होने का पता चले, उसे क्रिया कहते हैं।",
        "icon": "🏃",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "दौड़ना = Running",
            "hindi": "दौड़ना 🏃"
          },
          {
            "english": "पढ़ना = Reading",
            "hindi": "पढ़ना 📖"
          },
          {
            "english": "हँसना = Laughing",
            "hindi": "हँसना 😄"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"बच्चे मैदान में दौड़ रहे हैं।\" में क्रिया शब्द क्या है?",
            "questionHindi": "\"बच्चे मैदान में दौड़ रहे हैं।\" में क्रिया शब्द क्या है?",
            "visual": "🏃 👦👧",
            "options": [
              "दौड़ रहे हैं",
              "बच्चे",
              "मैदान",
              "में"
            ],
            "correctAnswer": "दौड़ रहे हैं",
            "explanationEnglish": "\"दौड़ रहे हैं\" काम (Action) को बता रहा है, इसलिए यह क्रिया है!",
            "explanationHindi": "\"दौड़ रहे हैं\" क्रिया है!"
          },
          {
            "questionEnglish": "इनमें से क्रिया शब्द पहचानिए:",
            "questionHindi": "इनमें से क्रिया शब्द पहचानिए:",
            "visual": "😄",
            "options": [
              "हँसना",
              "मेज",
              "लाल",
              "दिल्ली"
            ],
            "correctAnswer": "हँसना",
            "explanationEnglish": "हँसना एक काम (क्रिया) है!",
            "explanationHindi": "हँसना क्रिया शब्द है!"
          },
          {
            "questionEnglish": "\"गाय घास चरती है।\" में क्रिया क्या है? 🐄",
            "questionHindi": "\"गाय घास चरती है।\" में क्रिया क्या है? 🐄",
            "visual": "🐄 🌱",
            "options": [
              "चरती है",
              "गाय",
              "घास",
              "है"
            ],
            "correctAnswer": "चरती है",
            "explanationEnglish": "चरना एक कार्य है, इसलिए \"चरती है\" क्रिया है!",
            "explanationHindi": "\"चरती है\" क्रिया शब्द है!"
          },
          {
            "questionEnglish": "इनमें से कौन सा शब्द क्रिया नहीं है?",
            "questionHindi": "इनमें से कौन सा शब्द क्रिया नहीं है?",
            "visual": "🌳 vs 🏃",
            "options": [
              "पेड़",
              "सोना",
              "खाना",
              "गाना"
            ],
            "correctAnswer": "पेड़",
            "explanationEnglish": "पेड़ एक वस्तु/संज्ञा है, क्रिया नहीं!",
            "explanationHindi": "पेड़ संज्ञा है, क्रिया नहीं!"
          }
        ]
      },
      {
        "id": "c3-hin-visheshan",
        "titleEnglish": "Visheshan (विशेषण - Describing Words)",
        "titleHindi": "विशेषण (संज्ञा की विशेषता बताने वाले शब्द)",
        "descriptionEnglish": "Words describing quality, quantity, color: Meetha aam, Sundar phool.",
        "descriptionHindi": "संज्ञा या सर्वनाम की विशेषता (गुण, दोष, रंग, संख्या) बताने वाले शब्द।",
        "icon": "🌸",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "सफेद हंस (White swan)",
            "hindi": "सफेद हंस 🦢 (सफेद = विशेषण)"
          },
          {
            "english": "मीठा आम (Sweet mango)",
            "hindi": "मीठा आम 🥭 (मीठा = विशेषण)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"सफेद हंस तालाब में तैर रहा है।\" में विशेषण क्या है? 🦢",
            "questionHindi": "\"सफेद हंस तालाब में तैर रहा है।\" में विशेषण क्या है? 🦢",
            "visual": "🦢 🌊",
            "options": [
              "सफेद",
              "हंस",
              "तालाब",
              "तैर रहा"
            ],
            "correctAnswer": "सफेद",
            "explanationEnglish": "\"सफेद\" हंस के रंग की विशेषता बता रहा है, इसलिए यह विशेषण है!",
            "explanationHindi": "\"सफेद\" विशेषण है!"
          },
          {
            "questionEnglish": "\"मीठा आम सबको पसंद है।\" में विशेषण क्या है? 🥭",
            "questionHindi": "\"मीठा आम सबको पसंद है।\" में विशेषण क्या है? 🥭",
            "visual": "🥭",
            "options": [
              "मीठा",
              "आम",
              "पसंद",
              "सबको"
            ],
            "correctAnswer": "मीठा",
            "explanationEnglish": "\"मीठा\" आम के स्वाद की विशेषता बताता है!",
            "explanationHindi": "\"मीठा\" विशेषण शब्द है!"
          },
          {
            "questionEnglish": "\"लंबा पेड़\" में कौन सा शब्द विशेषण है? 🌲",
            "questionHindi": "\"लंबा पेड़\" में कौन सा शब्द विशेषण है? 🌲",
            "visual": "🌲",
            "options": [
              "लंबा",
              "पेड़",
              "दोनों",
              "कोई नहीं"
            ],
            "correctAnswer": "लंबा",
            "explanationEnglish": "\"लंबा\" पेड़ की लंबाई की विशेषता बताता है!",
            "explanationHindi": "\"लंबा\" विशेषण है!"
          },
          {
            "questionEnglish": "\"चालाक लोमड़ी\" में विशेषण शब्द छाँटिए: 🦊",
            "questionHindi": "\"चालाक लोमड़ी\" में विशेषण शब्द छाँटिए: 🦊",
            "visual": "🦊",
            "options": [
              "चालाक",
              "लोमड़ी",
              "जंगल",
              "दौड़"
            ],
            "correctAnswer": "चालाक",
            "explanationEnglish": "\"चालाक\" लोमड़ी का स्वभाव (विशेषता) बता रहा है!",
            "explanationHindi": "\"चालाक\" विशेषण है!"
          }
        ]
      },
      {
        "id": "c3-hin-vilom",
        "titleEnglish": "Vilom Shabd (विलोम शब्द - Antonyms)",
        "titleHindi": "विलोम शब्द (उल्टे अर्थ वाले शब्द)",
        "descriptionEnglish": "Opposite words in Hindi: Din-Raat, Garam-Thanda, Sach-Jhooth.",
        "descriptionHindi": "परस्पर विपरीत अर्थ देने वाले शब्दों को विलोम शब्द कहते हैं।",
        "icon": "🔄",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "दिन ↔️ रात (Day - Night)",
            "hindi": "दिन ↔️ रात ☀️🌙"
          },
          {
            "english": "गरम ↔️ ठंडा (Hot - Cold)",
            "hindi": "गरम ↔️ ठंडा ☕🍦"
          },
          {
            "english": "मित्र ↔️ शत्रु (Friend - Enemy)",
            "hindi": "मित्र ↔️ शत्रु 🤝⚔️"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"दिन\" का विलोम शब्द क्या है?",
            "questionHindi": "\"दिन\" का विलोम शब्द (उल्टा अर्थ) क्या है?",
            "visual": "☀️ ➔ 🌙",
            "options": [
              "रात",
              "सुबह",
              "दोपहर",
              "शाम"
            ],
            "correctAnswer": "रात",
            "explanationEnglish": "दिन का उल्टा \"रात\" होता है!",
            "explanationHindi": "दिन का विलोम \"रात\" है!"
          },
          {
            "questionEnglish": "\"गरम\" का विलोम शब्द क्या है? ☕",
            "questionHindi": "\"गरम\" का विलोम शब्द क्या है? ☕",
            "visual": "☕ ➔ 🍦",
            "options": [
              "ठंडा",
              "गीला",
              "सूखा",
              "मीठा"
            ],
            "correctAnswer": "ठंडा",
            "explanationEnglish": "गरम का विलोम \"ठंडा\" होता है!",
            "explanationHindi": "गरम का उल्टा ठंडा है!"
          },
          {
            "questionEnglish": "\"मित्र\" का विलोम शब्द क्या है? 🤝",
            "questionHindi": "\"मित्र\" का विलोम शब्द क्या है? 🤝",
            "visual": "🤝",
            "options": [
              "शत्रु",
              "दोस्त",
              "सखा",
              "भाई"
            ],
            "correctAnswer": "शत्रु",
            "explanationEnglish": "मित्र (दोस्त) का उल्टा \"शत्रु\" (दुश्मन) होता है!",
            "explanationHindi": "मित्र का विलोम \"शत्रु\" है!"
          },
          {
            "questionEnglish": "\"सच\" का विलोम शब्द क्या है?",
            "questionHindi": "\"सच\" का विलोम शब्द क्या है?",
            "visual": "सच ↔️ ?",
            "options": [
              "झूठ",
              "सही",
              "कपट",
              "सत्य"
            ],
            "correctAnswer": "झूठ",
            "explanationEnglish": "सच का विलोम \"झूठ\" होता है!",
            "explanationHindi": "सच का उल्टा झूठ है!"
          }
        ]
      },
      {
        "id": "c3-hin-vachan",
        "titleEnglish": "Vachan (वचन - Singular & Plural)",
        "titleHindi": "वचन (एकवचन और बहुवचन)",
        "descriptionEnglish": "Understand count: Ladka - Ladke, Kitab - Kitabein, Chidiya - Chidiyan.",
        "descriptionHindi": "एक का बोध कराने वाले एकवचन और अनेक का बोध कराने वाले बहुवचन कहलाते हैं।",
        "icon": "👥",
        "difficulty": "Intermediate",
        "keyConcepts": [
          {
            "english": "एकवचन: एक चीज़ (लड़का 👦)",
            "hindi": "एकवचन: लड़का 👦"
          },
          {
            "english": "बहुवचन: अनेक चीजें (लड़के 👦👦)",
            "hindi": "बहुवचन: लड़के 👦👦"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"लड़का\" का बहुवचन क्या होगा?",
            "questionHindi": "\"लड़का\" का बहुवचन (एक से अधिक) क्या होगा?",
            "visual": "👦 ➔ 👦👦",
            "options": [
              "लड़के",
              "लड़कों",
              "लड़कियाँ",
              "लड़काई"
            ],
            "correctAnswer": "लड़के",
            "explanationEnglish": "एक लड़का, अनेक लड़के!",
            "explanationHindi": "लड़का का बहुवचन \"लड़के\" होता है!"
          },
          {
            "questionEnglish": "\"किताब\" का बहुवचन क्या होगा? 📚",
            "questionHindi": "\"किताब\" का बहुवचन क्या होगा? 📚",
            "visual": "📖 ➔ 📚",
            "options": [
              "किताबें",
              "किताबों",
              "पुस्तिका",
              "किताबी"
            ],
            "correctAnswer": "किताबें",
            "explanationEnglish": "एक किताब, अनेक किताबें!",
            "explanationHindi": "किताब का बहुवचन \"किताबें\" होता है!"
          },
          {
            "questionEnglish": "\"चिड़िया\" का बहुवचन क्या होगा? 🐦",
            "questionHindi": "\"चिड़िया\" का बहुवचन क्या होगा? 🐦",
            "visual": "🐦 ➔ 🐦🐦",
            "options": [
              "चिड़ियाँ",
              "चिड़ियों",
              "पक्षी",
              "चिड़ियाएं"
            ],
            "correctAnswer": "चिड़ियाँ",
            "explanationEnglish": "चिड़िया का बहुवचन \"चिड़ियाँ\" (चन्द्रबिन्दु के साथ) होता है!",
            "explanationHindi": "चिड़िया का बहुवचन \"चिड़ियाँ\" है!"
          },
          {
            "questionEnglish": "\"नदी\" का बहुवचन क्या होगा? 🌊",
            "questionHindi": "\"नदी\" का बहुवचन क्या होगा? 🌊",
            "visual": "🌊",
            "options": [
              "नदियाँ",
              "नदियों",
              "नाले",
              "सरिता"
            ],
            "correctAnswer": "नदियाँ",
            "explanationEnglish": "नदी का बहुवचन \"नदियाँ\" (द पर छोटी इ की मात्रा) होता है!",
            "explanationHindi": "नदी का बहुवचन \"नदियाँ\" होता है!"
          }
        ]
      }
    ],
    "scienceTopics": [
      {
            "id": "class3-sci-1",
            "titleEnglish": "States of Matter: Solid, Liquid & Gas (पदार्थ की अवस्थाएँ)",
            "titleHindi": "ठोस, द्रव और गैस: पदार्थ के तीन रूप",
            "descriptionEnglish": "Understand how ice melts into water and boils into steam (matter states).",
            "descriptionHindi": "बर्फ (ठोस), जल (द्रव) और वाष्प (गैस) में रूपांतरण व गुण।",
            "icon": "🧊",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Solid: Fixed shape & volume (Ice) 🧊",
                        "hindi": "ठोस: निश्चित आकार व आयतन"
                  },
                  {
                        "english": "Liquid: Takes container shape (Water) 💧",
                        "hindi": "द्रव: बर्तन का आकार लेता है"
                  },
                  {
                        "english": "Gas: Fills all available space (Steam) ♨️",
                        "hindi": "गैस: हर जगह फैल जाती है"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Ice is water in which fundamental state of matter? 🧊",
                        "questionHindi": "बर्फ (Ice) पानी की किस भौतिक अवस्था का रूप है? 🧊",
                        "visual": "🧊 ❄️ 💧",
                        "options": [
                              "Solid (ठोस अवस्था) 🧊",
                              "Liquid (तरल/द्रव)",
                              "Gas (गैस अवस्था)",
                              "Plasma"
                        ],
                        "correctAnswer": "Solid (ठोस अवस्था) 🧊",
                        "explanationEnglish": "Ice has a fixed shape and fixed volume, making it a solid.",
                        "explanationHindi": "बर्फ एक ठोस (Solid) है जो 0°C पर पानी के जमने से बनती है।"
                  },
                  {
                        "questionEnglish": "When water is boiled and turns into invisible steam/vapor, what is this process called? ♨️",
                        "questionHindi": "जब पानी को उबालने पर वह भाप या वाष्प में बदल जाता है, तो इस प्रक्रिया को क्या कहते हैं? ♨️",
                        "visual": "♨️ 💧 💨",
                        "options": [
                              "Evaporation (वाष्पीकरण) ♨️",
                              "Freezing (जमना) ❄️",
                              "Melting (पिघलना)",
                              "Sublimation"
                        ],
                        "correctAnswer": "Evaporation (वाष्पीकरण) ♨️",
                        "explanationEnglish": "Evaporation is the change of liquid water into gaseous water vapor.",
                        "explanationHindi": "पानी का वाष्प में बदलना वाष्पीकरण (Evaporation) कहलाता है।"
                  },
                  {
                        "questionEnglish": "Which state of matter has NO fixed shape and flows to take the shape of any bottle? 💧",
                        "questionHindi": "पदार्थ की कौन सी अवस्था का कोई निश्चित आकार नहीं होता और जिस बर्तन में डालें उसी का आकार ले लेती है? 💧",
                        "visual": "🥛 🫗 💧",
                        "options": [
                              "Liquid (तरल/द्रव) 💧",
                              "Solid (ठोस) 🪵",
                              "Stone (पत्थर) 🪨",
                              "Iron Rod (लोहा)"
                        ],
                        "correctAnswer": "Liquid (तरल/द्रव) 💧",
                        "explanationEnglish": "Liquids like milk, juice, and water take the shape of their container.",
                        "explanationHindi": "द्रव (Liquid) का आयतन निश्चित होता है पर आकार बर्तन अनुसार बदलता है।"
                  }
            ]
      },
      {
            "id": "class3-sci-2",
            "titleEnglish": "Plant Life Cycle & Photosynthesis (प्रकाश संश्लेषण)",
            "titleHindi": "पौधों का जीवन चक्र व भोजन निर्माण",
            "descriptionEnglish": "How green leaves act as food factories using sunlight, water, and CO2.",
            "descriptionHindi": "पत्तियों में क्लोरोफिल और सूर्य के प्रकाश से भोजन बनना।",
            "icon": "🌿",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Chlorophyll = Green pigment 🍃",
                        "hindi": "क्लोरोफिल = हरा वर्णक"
                  },
                  {
                        "english": "Photosynthesis = Sunlight + Water + CO2 ☀️",
                        "hindi": "प्रकाश संश्लेषण = धूप + जल + कार्बन डाइऑक्साइड"
                  },
                  {
                        "english": "Output = Oxygen for humans to breathe 🌬️",
                        "hindi": "उत्पाद = सांस लेने योग्य ऑक्सीजन"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "What magical natural green pigment in leaves helps them capture sunlight for food? 🍃",
                        "questionHindi": "पत्तियों में कौन सा प्राकृतिक हरा वर्णक होता है जो धूप को सोखकर भोजन बनाने में मदद करता है? 🍃",
                        "visual": "🍃 ☀️ 🧪",
                        "options": [
                              "Chlorophyll (क्लोरोफिल) 🍃",
                              "Hemoglobin (हीमोग्लोबिन)",
                              "Melanin",
                              "Keratin"
                        ],
                        "correctAnswer": "Chlorophyll (क्लोरोफिल) 🍃",
                        "explanationEnglish": "Chlorophyll absorbs sunlight energy to produce glucose for the plant.",
                        "explanationHindi": "क्लोरोफिल के कारण ही पत्तियों का रंग हरा होता है।"
                  },
                  {
                        "questionEnglish": "What vital gas do plants release into the air during daytime that humans and animals breathe? 🌬️",
                        "questionHindi": "प्रकाश संश्लेषण के दौरान पौधे दिन में कौन सी जीवनदायिनी गैस छोड़ते हैं जो हम सांस में लेते हैं? 🌬️",
                        "visual": "🌱 ➡️ 🌬️ 🫁",
                        "options": [
                              "Oxygen (ऑक्सीजन) 🌬️",
                              "Carbon Dioxide (CO2)",
                              "Nitrogen Gas",
                              "Helium"
                        ],
                        "correctAnswer": "Oxygen (ऑक्सीजन) 🌬️",
                        "explanationEnglish": "Plants inhale carbon dioxide and exhale fresh oxygen for our survival!",
                        "explanationHindi": "पौधे हमें सांस लेने के लिए शुद्ध ऑक्सीजन देते हैं।"
                  }
            ]
      },
      {
            "id": "class3-sci-3",
            "titleEnglish": "Birds: Beaks, Feathers & Flight (पक्षियों की दुनिया)",
            "titleHindi": "पक्षियों की चोंच, पंख और घोंसले",
            "descriptionEnglish": "Discover how bird beaks differ based on food: hummingbirds, eagles, ducks.",
            "descriptionHindi": "विभिन्न पक्षियों की चोंच, पंजों और उनके जीवन के रहस्य।",
            "icon": "🦅",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Eagle = Hooked beak for meat 🦅",
                        "hindi": "चील = मांस चीरने वाली चोंच"
                  },
                  {
                        "english": "Duck = Broad flat beak with holes 🦆",
                        "hindi": "बतख = कीचड़ छानने वाली चौड़ी चोंच"
                  },
                  {
                        "english": "Penguin = Flightless bird & fast swimmer 🐧",
                        "hindi": "पेंगुइन = न उड़ने वाला जलीय पक्षी"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which unique bird cannot fly in the sky, but is an expert deep-water swimmer? 🐧",
                        "questionHindi": "कौन सा अनोखा पक्षी आसमान में नहीं उड़ सकता लेकिन ठंडे बर्फीले पानी में सबसे तेज तैरता है? 🐧",
                        "visual": "🐧 ❄️ 🌊",
                        "options": [
                              "Penguin (पेंगुइन) 🐧",
                              "Pigeon (कबूतर) 🕊️",
                              "Sparrow (गौरैया) 🐦",
                              "Crow (कौआ) 🦅"
                        ],
                        "correctAnswer": "Penguin (पेंगुइन) 🐧",
                        "explanationEnglish": "Penguins use their flipper wings to swim underwater at incredible speeds!",
                        "explanationHindi": "पेंगुइन उड़ नहीं सकता, पर पानी में गजब की तैराकी करता है।"
                  },
                  {
                        "questionEnglish": "Which nocturnal bird can rotate its head almost 270 degrees and hunts silently at night? 🦉",
                        "questionHindi": "कौन सा बुद्धिमान निशाचर पक्षी अपनी गर्दन को २७० डिग्री तक घुमा सकता है और रात में शिकार करता है? 🦉",
                        "visual": "🦉 🌙 🌲",
                        "options": [
                              "Owl (उल्लू) 🦉",
                              "Duck (बतख) 🦆",
                              "Parrot (तोता) 🦜",
                              "Hen (मुर्गी) 🐔"
                        ],
                        "correctAnswer": "Owl (उल्लू) 🦉",
                        "explanationEnglish": "Owls have large eyes with night vision and can swivel their necks far around!",
                        "explanationHindi": "उल्लू रात में बहुत साफ देख सकता है और अपनी गर्दन घुमा सकता है।"
                  }
            ]
      }
],
    "gkTopics": [
      {
            "id": "class3-gk-1",
            "titleEnglish": "The Solar System & 8 Planets (हमारा सौरमंडल)",
            "titleHindi": "सौरमंडल और अंतरिक्ष के ८ ग्रह",
            "descriptionEnglish": "Tour Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
            "descriptionHindi": "सूर्य और आठों ग्रहों के नाम, उपग्रह व अंतरिक्ष रहस्य।",
            "icon": "🪐",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Earth = The Blue Planet 🌍",
                        "hindi": "पृथ्वी = नीला ग्रह (जीवन)"
                  },
                  {
                        "english": "Mars = The Red Planet 🔴",
                        "hindi": "मंगल = लाल ग्रह"
                  },
                  {
                        "english": "Jupiter = Largest Planet 🪐",
                        "hindi": "बृहस्पति = सबसे विशाल ग्रह"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which neighboring planet is known as the 'Red Planet' due to rusty iron soil? 🪐",
                        "questionHindi": "मिट्टी में जंग लगे लोहे के कारण किस पड़ोसी ग्रह को 'लाल ग्रह' (Red Planet) कहा जाता है? 🪐",
                        "visual": "🔴 🪐 🚀",
                        "options": [
                              "Mars (मंगल ग्रह) 🪐",
                              "Venus (शुक्र)",
                              "Mercury (बुध)",
                              "Jupiter (बृहस्पति)"
                        ],
                        "correctAnswer": "Mars (मंगल ग्रह) 🪐",
                        "explanationEnglish": "Mars looks reddish in the night sky because its surface is covered in iron oxide.",
                        "explanationHindi": "मंगल ग्रह को 'लाल ग्रह' कहा जाता है।"
                  },
                  {
                        "questionEnglish": "Which is the largest giant planet in our entire solar system? 🪐",
                        "questionHindi": "हमारे पूरे सौरमंडल का सबसे बड़ा और विशालकाय ग्रह कौन सा है? 🪐",
                        "visual": "🪐 ☀️ 🌍",
                        "options": [
                              "Jupiter (बृहस्पति) 🪐",
                              "Saturn (शनि)",
                              "Earth (पृथ्वी) 🌍",
                              "Neptune (वरुण)"
                        ],
                        "correctAnswer": "Jupiter (बृहस्पति) 🪐",
                        "explanationEnglish": "Jupiter is so massive that more than 1,300 Earths could fit inside it!",
                        "explanationHindi": "बृहस्पति (Jupiter) सौरमंडल का सबसे बड़ा ग्रह है।"
                  },
                  {
                        "questionEnglish": "How many officially recognized planets orbit around our central star, the Sun? ☀️",
                        "questionHindi": "हमारे सौरमंडल में सूर्य की परिक्रमा करने वाले कितने मुख्य ग्रह हैं? ☀️",
                        "visual": "☀️ 🪐 🌍",
                        "options": [
                              "8 Planets (८ ग्रह)",
                              "9 Planets",
                              "7 Planets",
                              "12 Planets"
                        ],
                        "correctAnswer": "8 Planets (८ ग्रह)",
                        "explanationEnglish": "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
                        "explanationHindi": "सौरमंडल में कुल ८ ग्रह हैं।"
                  }
            ]
      },
      {
            "id": "class3-gk-2",
            "titleEnglish": "Great Inventions & Discoveries (महान आविष्कार)",
            "titleHindi": "मानव इतिहास के महान आविष्कारक",
            "descriptionEnglish": "Learn who invented the Light Bulb, Telephone, Airplane, and Computer.",
            "descriptionHindi": "बल्ब, टेलीफोन, हवाई जहाज और कंप्यूटर के जनक।",
            "icon": "💡",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Light Bulb = Thomas Edison 💡",
                        "hindi": "विद्युत बल्ब = थॉमस एडिसन"
                  },
                  {
                        "english": "Telephone = Alexander Graham Bell ☎️",
                        "hindi": "टेलीफोन = ग्राहम बेल"
                  },
                  {
                        "english": "Airplane = Wright Brothers ✈️",
                        "hindi": "हवाई जहाज = राइट ब्रदर्स"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which persistent inventor created the practical long-lasting electric light bulb? 💡",
                        "questionHindi": "किस महान वैज्ञानिक ने दुनिया को रोशन करने वाले बिजली के बल्ब का आविष्कार किया था? 💡",
                        "visual": "💡 ⚡ 🧑‍🔬",
                        "options": [
                              "Thomas Edison 💡",
                              "Albert Einstein",
                              "Isaac Newton",
                              "Charles Darwin"
                        ],
                        "correctAnswer": "Thomas Edison 💡",
                        "explanationEnglish": "Thomas Alva Edison tested thousands of materials before perfecting the carbon filament bulb!",
                        "explanationHindi": "थॉमस अल्वा एडिसन ने इलेक्ट्रिक बल्ब का आविष्कार किया था।"
                  },
                  {
                        "questionEnglish": "Who invented the first practical telephone that allowed people to talk across distances? ☎️",
                        "questionHindi": "दूर बैठे लोगों से आवाज में बात करने वाले पहले टेलीफोन का आविष्कार किसने किया था? ☎️",
                        "visual": "☎️ 📞 🧑‍🔬",
                        "options": [
                              "Alexander Graham Bell ☎️",
                              "Wright Brothers ✈️",
                              "Galileo Galilei 🔭",
                              "Guglielmo Marconi 📻"
                        ],
                        "correctAnswer": "Alexander Graham Bell ☎️",
                        "explanationEnglish": "Alexander Graham Bell patented the telephone in 1876!",
                        "explanationHindi": "ग्राहम बेल ने १८७६ में टेलीफोन का आविष्कार किया था।"
                  }
            ]
      },
      {
            "id": "class3-gk-3",
            "titleEnglish": "Monuments & Wonders of World (विश्व धरोहर व स्मारक)",
            "titleHindi": "भारत और विश्व के प्रसिद्ध आश्चर्य",
            "descriptionEnglish": "Explore Taj Mahal, Qutub Minar, Statue of Unity, and Great Wall of China.",
            "descriptionHindi": "ताजमहल, कुतुबमीनार, स्टैच्यू ऑफ यूनिटी और चीन की दीवार।",
            "icon": "🗽",
            "difficulty": "Intermediate",
            "keyConcepts": [
                  {
                        "english": "Statue of Unity = 182 meters tall (Gujarat) 🗽",
                        "hindi": "स्टैच्यू ऑफ यूनिटी = विश्व की सबसे ऊंची प्रतिमा"
                  },
                  {
                        "english": "Qutub Minar = Tallest brick minaret (Delhi) 🗼",
                        "hindi": "कुतुब मीनार = दिल्ली की ऐतिहासिक मीनार"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which breathtaking monument in Gujarat is the TALLEST statue in the world (182m)? 🗽",
                        "questionHindi": "गुजरात में स्थित सरदार पटेल जी की कौन सी प्रतिमा विश्व की सबसे ऊंची प्रतिमा (१८२ मीटर) है? 🗽",
                        "visual": "🗽 🇮🇳 ⛰️",
                        "options": [
                              "Statue of Unity (स्टैच्यू ऑफ यूनिटी) 🗽",
                              "Statue of Liberty (अमेरिका)",
                              "Spring Temple Buddha",
                              "Eiffel Tower"
                        ],
                        "correctAnswer": "Statue of Unity (स्टैच्यू ऑफ यूनिटी) 🗽",
                        "explanationEnglish": "The Statue of Unity honors Sardar Vallabhbhai Patel and is 182 meters high!",
                        "explanationHindi": "स्टैच्यू ऑफ यूनिटी विश्व की सबसे ऊंची प्रतिमा है।"
                  },
                  {
                        "questionEnglish": "Which massive ancient stone wall stretches thousands of miles across mountains in Asia? 🧱",
                        "questionHindi": "हजारों किलोमीटर लंबी कौन सी ऐतिहासिक दीवार पहाड़ियों पर बनी है और अंतरिक्ष से भी पहचानी जाती है? 🧱",
                        "visual": "🧱 🏔️ 🇨🇳",
                        "options": [
                              "Great Wall of China (चीन की विशाल दीवार) 🧱",
                              "Berlin Wall",
                              "Western Wall",
                              "Hadrian's Wall"
                        ],
                        "correctAnswer": "Great Wall of China (चीन की विशाल दीवार) 🧱",
                        "explanationEnglish": "The Great Wall of China is over 13,000 miles long and built across centuries.",
                        "explanationHindi": "चीन की महान दीवार प्राचीन काल में सीमाओं की रक्षा के लिए बनाई गई थी।"
                  }
            ]
      }
]
  },
  "class-4-5": {
    "id": "class-4-5",
    "gradeLabelEnglish": "Class 4 & 5 (Senior)",
    "gradeLabelHindi": "कक्षा ४ और ५ (सीनियर)",
    "ageRange": "Age 9-11+ Yrs",
    "color": "from-rose-500 to-red-600",
    "mathsTopics": [
      {
        "id": "c4-math-large-numbers",
        "titleEnglish": "Large Numbers & Place Value",
        "titleHindi": "बड़ी संख्याएँ व स्थानीय मान (Large Numbers)",
        "descriptionEnglish": "Read and write 4 and 5-digit numbers, Indian place value chart (Units, Tens, Hundreds, Thousands, Ten Thousands).",
        "descriptionHindi": "इकाई, दहाई, सैकड़ा, हजार, दस हजार और स्थानीय मान।",
        "icon": "🏛️",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Place values: Units, Tens, Hundreds, Thousands",
            "hindi": "स्थानीय मान: इकाई, दहाई, सैकड़ा, हज़ार"
          },
          {
            "english": "In 4,520: 5 is at hundreds place (500)",
            "hindi": "४,५२० में ५ का स्थानीय मान = ५००"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "In 4,520, what is the place value of digit 5?",
            "questionHindi": "संख्या ४,५२० में अंक ५ का स्थानीय मान क्या है?",
            "visual": "4,[5]20",
            "options": [
              "500 (५००)",
              "50 (५०)",
              "5,000 (५०००)",
              "5 (५)"
            ],
            "correctAnswer": "500 (५००)",
            "explanationEnglish": "Digit 5 is at hundreds place, so its value is 500!",
            "explanationHindi": "५ सैकड़े के स्थान पर है, इसलिए इसका मान ५०० है!"
          },
          {
            "questionEnglish": "Which number is GREATER: 9,875 or 9,885?",
            "questionHindi": "कौन सी संख्या बड़ी है: ९,८७५ या ९,८८५?",
            "visual": "9,875 vs 9,885",
            "options": [
              "9,885",
              "9,875",
              "Both are equal",
              "None"
            ],
            "correctAnswer": "9,885",
            "explanationEnglish": "9,885 has 8 tens which is greater than 7 tens in 9,875!",
            "explanationHindi": "९,८८५ में ८ दहाई हैं, इसलिए यह बड़ी संख्या है!"
          },
          {
            "questionEnglish": "How many hundreds make 1,000?",
            "questionHindi": "कितने सैकड़े (१००) मिलकर १,००० बनाते हैं?",
            "visual": "? × 100 = 1,000",
            "options": [
              "10",
              "100",
              "5",
              "20"
            ],
            "correctAnswer": "10",
            "explanationEnglish": "10 hundreds (10 × 100) = 1,000!",
            "explanationHindi": "१० सैकड़े मिलकर १,००० बनाते हैं!"
          },
          {
            "questionEnglish": "What is 100 × 100?",
            "questionHindi": "१०० × १०० कितना होता है?",
            "visual": "100 × 100 = ?",
            "options": [
              "10,000",
              "1,000",
              "100,000",
              "200"
            ],
            "correctAnswer": "10,000",
            "explanationEnglish": "100 × 100 = 10,000 (Ten Thousand)!",
            "explanationHindi": "१०० × १०० = १०,००० (दस हज़ार) होता है!"
          },
          {
            "questionEnglish": "Round 47 to the nearest 10:",
            "questionHindi": "संख्या ४७ को निकटतम १० (दहाई) में बदलें:",
            "visual": "47 ➔ ?",
            "options": [
              "50",
              "40",
              "45",
              "60"
            ],
            "correctAnswer": "50",
            "explanationEnglish": "Since 7 is greater than or equal to 5, 47 rounds up to 50!",
            "explanationHindi": "७ पाँच से बड़ा है, इसलिए ४७ का निकटतम मान ५० होगा!"
          }
        ]
      },
      {
        "id": "c4-math-long-division",
        "titleEnglish": "Long Division & Remainders",
        "titleHindi": "लंबी भाग विधि व शेषफल (Long Division & Remainders)",
        "descriptionEnglish": "Divide 2 and 3-digit numbers with remainders: 100 ÷ 4 = 25. 25 ÷ 4 = 6 R 1.",
        "descriptionHindi": "भागफल और शेषफल निकालना सीखें।",
        "icon": "➗",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Dividend = (Divisor × Quotient) + Remainder",
            "hindi": "भाज्य = (भाजक × भागफल) + शेषफल"
          },
          {
            "english": "100 ÷ 4 = 25 (Remainder 0)",
            "hindi": "१०० ÷ ४ = २५"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 100 ÷ 4?",
            "questionHindi": "१०० ÷ ४ कितना होता है?",
            "visual": "100 ÷ 4 = ?",
            "options": [
              "20",
              "25",
              "30",
              "40"
            ],
            "correctAnswer": "25",
            "explanationEnglish": "100 divided by 4 equals 25!",
            "explanationHindi": "१०० को ४ से भाग देने पर २५ आता है!"
          },
          {
            "questionEnglish": "What is the remainder when 25 is divided by 4?",
            "questionHindi": "२५ को ४ से भाग देने पर शेषफल (Remainder) क्या बचेगा?",
            "visual": "25 ÷ 4 = ? R ?",
            "options": [
              "1",
              "2",
              "3",
              "0"
            ],
            "correctAnswer": "1",
            "explanationEnglish": "4 × 6 = 24. 25 - 24 = 1 remainder!",
            "explanationHindi": "४ × ६ = २४। २५ - २४ = १ शेषफल बचेगा!"
          },
          {
            "questionEnglish": "What is 144 ÷ 12?",
            "questionHindi": "१४४ ÷ १२ कितना होता है?",
            "visual": "144 ÷ 12 = ?",
            "options": [
              "12",
              "11",
              "14",
              "10"
            ],
            "correctAnswer": "12",
            "explanationEnglish": "12 × 12 = 144, so 144 ÷ 12 = 12!",
            "explanationHindi": "१२ × १२ = १४४ होता है!"
          },
          {
            "questionEnglish": "What is 75 ÷ 5?",
            "questionHindi": "७५ ÷ ५ कितना होता है?",
            "visual": "75 ÷ 5 = ?",
            "options": [
              "15",
              "12",
              "14",
              "20"
            ],
            "correctAnswer": "15",
            "explanationEnglish": "75 divided by 5 equals 15!",
            "explanationHindi": "७५ ÷ ५ = १५ होता है!"
          },
          {
            "questionEnglish": "When 83 is divided by 9, what is the quotient and remainder?",
            "questionHindi": "८३ को ९ से भाग देने पर भागफल और शेषफल क्या होगा?",
            "visual": "83 ÷ 9",
            "options": [
              "9 Remainder 2",
              "8 Remainder 11",
              "9 Remainder 1",
              "8 Remainder 5"
            ],
            "correctAnswer": "9 Remainder 2",
            "explanationEnglish": "9 × 9 = 81. 83 - 81 = 2 remainder. Quotient is 9, remainder is 2!",
            "explanationHindi": "९ × ९ = ८१। ८३ - ८१ = २ शेषफल। भागफल ९ और शेषफल २ होगा!"
          }
        ]
      },
      {
        "id": "c4-math-perimeter-area",
        "titleEnglish": "Perimeter & Area Basics",
        "titleHindi": "परिमाप और क्षेत्रफल (Perimeter & Area)",
        "descriptionEnglish": "Calculate distance around shapes (Perimeter) and space inside (Area = L × W).",
        "descriptionHindi": "वर्ग व आयत का परिमाप और क्षेत्रफल निकालना।",
        "icon": "📐",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Perimeter of Square = 4 × Side",
            "hindi": "वर्ग का परिमाप = ४ × भुजा"
          },
          {
            "english": "Area of Rectangle = Length × Width",
            "hindi": "आयत का क्षेत्रफल = लंबाई × चौड़ाई"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "A square has a side of 5 cm. What is its Perimeter? 🔲",
            "questionHindi": "एक वर्ग की भुजा ५ सेमी है। उसका परिमाप (Perimeter) क्या होगा? 🔲",
            "visual": "🔲 5cm",
            "options": [
              "20 cm",
              "25 cm",
              "15 cm",
              "10 cm"
            ],
            "correctAnswer": "20 cm",
            "explanationEnglish": "Perimeter = 4 × 5 cm = 20 cm!",
            "explanationHindi": "वर्ग का परिमाप = ४ × ५ = २० सेमी!"
          },
          {
            "questionEnglish": "A rectangle has length 6 cm and width 4 cm. What is its Area? ▭",
            "questionHindi": "एक आयत की लंबाई ६ सेमी और चौड़ाई ४ सेमी है। उसका क्षेत्रफल क्या होगा? ▭",
            "visual": "▭ 6cm × 4cm",
            "options": [
              "24 sq cm",
              "20 sq cm",
              "10 sq cm",
              "12 sq cm"
            ],
            "correctAnswer": "24 sq cm",
            "explanationEnglish": "Area = Length × Width = 6 × 4 = 24 sq cm!",
            "explanationHindi": "क्षेत्रफल = लंबाई × चौड़ाई = ६ × ४ = २४ वर्ग सेमी!"
          },
          {
            "questionEnglish": "What is the perimeter of an equilateral triangle with side 7 cm? 🔺",
            "questionHindi": "एक समबाहु त्रिभुज की भुजा ७ सेमी है। उसका परिमाप क्या होगा? 🔺",
            "visual": "🔺 7cm",
            "options": [
              "21 cm",
              "14 cm",
              "28 cm",
              "49 cm"
            ],
            "correctAnswer": "21 cm",
            "explanationEnglish": "Perimeter = 3 × 7 cm = 21 cm!",
            "explanationHindi": "त्रिभुज का परिमाप = ७ + ७ + ७ = २१ सेमी!"
          },
          {
            "questionEnglish": "What is the area of a square with side 6 cm?",
            "questionHindi": "६ सेमी भुजा वाले वर्ग का क्षेत्रफल क्या होगा?",
            "visual": "🔲 6cm × 6cm",
            "options": [
              "36 sq cm",
              "24 sq cm",
              "12 sq cm",
              "30 sq cm"
            ],
            "correctAnswer": "36 sq cm",
            "explanationEnglish": "Area of Square = Side × Side = 6 × 6 = 36 sq cm!",
            "explanationHindi": "वर्ग का क्षेत्रफल = भुजा × भुजा = ६ × ६ = ३६ वर्ग सेमी!"
          },
          {
            "questionEnglish": "What is the formula for the Perimeter of a Rectangle?",
            "questionHindi": "आयत के परिमाप का सही सूत्र क्या है?",
            "visual": "Perimeter of Rectangle",
            "options": [
              "2 × (Length + Width)",
              "Length × Width",
              "4 × Side",
              "Length + Width"
            ],
            "correctAnswer": "2 × (Length + Width)",
            "explanationEnglish": "Perimeter of rectangle = 2 × (Length + Width)!",
            "explanationHindi": "आयत का परिमाप = २ × (लंबाई + चौड़ाई) होता है!"
          }
        ]
      },
      {
        "id": "c4-math-decimals",
        "titleEnglish": "Decimals & Fractions",
        "titleHindi": "दशमलव व भिन्न संबंध (Decimals & Fractions)",
        "descriptionEnglish": "Understand 1/2 = 0.5, 1/4 = 0.25, decimal addition, and real world measurements.",
        "descriptionHindi": "१/२ = ०.५, १/४ = ०.२५ और दशमलव संख्याओं की तुलना।",
        "icon": "🪙",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "1/2 = 0.5",
            "hindi": "१/२ = ०.५"
          },
          {
            "english": "1/4 = 0.25",
            "hindi": "१/४ = ०.२५"
          },
          {
            "english": "3/4 = 0.75",
            "hindi": "३/४ = ०.७५"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "What is 1/2 written as a decimal?",
            "questionHindi": "१/२ को दशमलव में क्या लिखेंगे?",
            "visual": "1/2 = ?",
            "options": [
              "0.5",
              "0.2",
              "0.05",
              "0.25"
            ],
            "correctAnswer": "0.5",
            "explanationEnglish": "1 divided by 2 = 0.5!",
            "explanationHindi": "१/२ को दशमलव में ०.५ लिखते हैं!"
          },
          {
            "questionEnglish": "What is 1/4 written as a decimal?",
            "questionHindi": "१/४ को दशमलव में क्या लिखेंगे?",
            "visual": "1/4 = ?",
            "options": [
              "0.25",
              "0.4",
              "0.5",
              "0.75"
            ],
            "correctAnswer": "0.25",
            "explanationEnglish": "1 divided by 4 = 0.25 (one quarter)!",
            "explanationHindi": "१/४ को दशमलव में ०.२५ लिखते हैं!"
          },
          {
            "questionEnglish": "What is 0.75 written as a common fraction?",
            "questionHindi": "०.७५ को भिन्न में क्या लिखेंगे?",
            "visual": "0.75 = ?",
            "options": [
              "3/4",
              "1/2",
              "1/4",
              "7/5"
            ],
            "correctAnswer": "3/4",
            "explanationEnglish": "0.75 equals 3/4 (three-quarters)!",
            "explanationHindi": "०.७५ तीन-चौथाई (३/४) के बराबर होता है!"
          },
          {
            "questionEnglish": "What is 2.5 + 1.5?",
            "questionHindi": "२.५ + १.५ कितना होता है?",
            "visual": "2.5 + 1.5 = ?",
            "options": [
              "4.0",
              "3.5",
              "4.5",
              "3.0"
            ],
            "correctAnswer": "4.0",
            "explanationEnglish": "2.5 + 1.5 = 4.0!",
            "explanationHindi": "२.५ + १.५ = ४.० होता है!"
          },
          {
            "questionEnglish": "Which decimal is greater: 0.6 or 0.45?",
            "questionHindi": "कौन सी दशमलव संख्या बड़ी है: ०.६ या ०.४५?",
            "visual": "0.6 vs 0.45",
            "options": [
              "0.6",
              "0.45",
              "Both are equal",
              "None"
            ],
            "correctAnswer": "0.6",
            "explanationEnglish": "0.6 = 0.60, which is greater than 0.45!",
            "explanationHindi": "०.६ (यानी ०.६०) ०.४५ से बड़ा है!"
          }
        ]
      }
    ],
    "englishTopics": [
      {
        "id": "c4-eng-future-tense",
        "titleEnglish": "Simple Future Tense (Will / Shall)",
        "titleHindi": "भविष्य काल (Future Tense - Will / Shall)",
        "descriptionEnglish": "Express plans, predictions, and upcoming events: Tomorrow we will go to Delhi.",
        "descriptionHindi": "आने वाले समय के लिए: Will / Shall + verb (जाएगा, खाएगी, खेलेंगे)।",
        "icon": "🚀",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "I will help you",
            "hindi": "मैं तुम्हारी मदद करूँगा (I will help)"
          },
          {
            "english": "Tomorrow it will rain",
            "hindi": "कल बारिश होगी (It will rain)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Tomorrow, we _____ visit the science museum. 🚀",
            "questionHindi": "\"Tomorrow, we _____ visit the science museum.\"",
            "visual": "🚀 🗓️",
            "options": [
              "will",
              "was",
              "did",
              "had"
            ],
            "correctAnswer": "will",
            "explanationEnglish": "\"Tomorrow\" signals future action, so we use \"will\"!",
            "explanationHindi": "\"Tomorrow\" भविष्य का समय है, इसलिए \"will\" का प्रयोग होगा!"
          },
          {
            "questionEnglish": "I promise I _____ help you clean the room.",
            "questionHindi": "\"I promise I _____ help you clean the room.\"",
            "visual": "🤝",
            "options": [
              "will",
              "did",
              "am",
              "was"
            ],
            "correctAnswer": "will",
            "explanationEnglish": "For a future promise, we use \"will\"!",
            "explanationHindi": "भविष्य के वादे के लिए \"will\" का प्रयोग होता है!"
          },
          {
            "questionEnglish": "Next year, she _____ be in Class 5.",
            "questionHindi": "\"Next year, she _____ be in Class 5.\"",
            "visual": "🎓",
            "options": [
              "will",
              "was",
              "is",
              "did"
            ],
            "correctAnswer": "will",
            "explanationEnglish": "\"Next year\" refers to the future = \"will be\"!",
            "explanationHindi": "अगले वर्ष के लिए \"will\" का प्रयोग होगा!"
          },
          {
            "questionEnglish": "They _____ celebrate the annual day next week. 🎉",
            "questionHindi": "\"They _____ celebrate the annual day next week.\"",
            "visual": "🎉",
            "options": [
              "will",
              "were",
              "have",
              "did"
            ],
            "correctAnswer": "will",
            "explanationEnglish": "Future event next week uses \"will\"!",
            "explanationHindi": "अगले हफ्ते के कार्यक्रम के लिए \"will\" आएगा!"
          }
        ]
      },
      {
        "id": "c4-eng-adverbs-comp",
        "titleEnglish": "Types of Adverbs",
        "titleHindi": "क्रियाविशेषण के प्रकार (Adverb Types)",
        "descriptionEnglish": "Classify adverbs of Time (yesterday, now), Place (here, outside), and Frequency (always, never).",
        "descriptionHindi": "समय, स्थान और बारंबारता बताने वाले क्रियाविशेषण।",
        "icon": "🔍",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Adverb of Time: Yesterday, Tomorrow",
            "hindi": "कालवाचक: Yesterday, Today"
          },
          {
            "english": "Adverb of Place: Inside, Outside",
            "hindi": "स्थानवाचक: Here, Outside"
          },
          {
            "english": "Adverb of Frequency: Always, Often",
            "hindi": "बारंबारता: Always, Sometimes"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Identify the Adverb of Time: \"He arrived yesterday.\"",
            "questionHindi": "\"He arrived yesterday.\" में समय बताने वाला Adverb क्या है?",
            "visual": "⏰ 📅",
            "options": [
              "yesterday",
              "arrived",
              "He",
              "none"
            ],
            "correctAnswer": "yesterday",
            "explanationEnglish": "\"Yesterday\" tells WHEN he arrived, so it is an Adverb of Time!",
            "explanationHindi": "\"Yesterday\" समय बता रहा है, इसलिए Adverb of Time है!"
          },
          {
            "questionEnglish": "Identify the Adverb of Place: \"Please sit outside.\"",
            "questionHindi": "\"Please sit outside.\" में स्थान बताने वाला Adverb क्या है?",
            "visual": "🏞️",
            "options": [
              "outside",
              "sit",
              "Please",
              "in"
            ],
            "correctAnswer": "outside",
            "explanationEnglish": "\"Outside\" tells WHERE to sit, so it is an Adverb of Place!",
            "explanationHindi": "\"Outside\" (बाहर) स्थान बता रहा है!"
          },
          {
            "questionEnglish": "Identify the Adverb of Frequency: \"I always brush my teeth.\"",
            "questionHindi": "\"I always brush my teeth.\" में कितनी बार काम होता है, यह कौन सा शब्द बताता है?",
            "visual": "🪥",
            "options": [
              "always",
              "brush",
              "teeth",
              "my"
            ],
            "correctAnswer": "always",
            "explanationEnglish": "\"Always\" tells how often (frequency) the action happens!",
            "explanationHindi": "\"Always\" (हमेशा) काम की बारंबारता बताता है!"
          },
          {
            "questionEnglish": "In \"She sang sweetly\", what type of adverb is \"sweetly\"?",
            "questionHindi": "\"She sang sweetly\" में \"sweetly\" किस प्रकार का क्रियाविशेषण है?",
            "visual": "🎤 🎶",
            "options": [
              "Adverb of Manner",
              "Adverb of Time",
              "Adverb of Place",
              "Adverb of Frequency"
            ],
            "correctAnswer": "Adverb of Manner",
            "explanationEnglish": "\"Sweetly\" tells HOW she sang, so it is an Adverb of Manner!",
            "explanationHindi": "\"Sweetly\" गाने का तरीका (Manner) बताता है!"
          }
        ]
      },
      {
        "id": "c4-eng-active-passive",
        "titleEnglish": "Active and Passive Voice Concepts",
        "titleHindi": "कर्तृवाच्य व कर्मवाच्य (Active vs Passive Voice)",
        "descriptionEnglish": "Understand the difference: The cat caught the mouse (Active) vs The mouse was caught by the cat (Passive).",
        "descriptionHindi": "कर्ता प्रधान (Active) और कर्म प्रधान (Passive) वाक्यों की समझ।",
        "icon": "🔄",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Active: Subject does the action (Rai ate an apple)",
            "hindi": "Active: कर्ता काम करता है"
          },
          {
            "english": "Passive: Subject receives action (The apple was eaten by Rai)",
            "hindi": "Passive: कर्म पर फल पड़ता है"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "In \"The cat caught the mouse\", who performed the action? 🐱",
            "questionHindi": "\"The cat caught the mouse\" में कार्य किसने किया? 🐱",
            "visual": "🐱 🐭",
            "options": [
              "The cat (बिल्ली)",
              "The mouse (चूहा)",
              "Both",
              "Nobody"
            ],
            "correctAnswer": "The cat (बिल्ली)",
            "explanationEnglish": "The cat is the doer (subject) of the action!",
            "explanationHindi": "बिल्ली (The cat) ने काम किया, इसलिए यह Active वाक्य है!"
          },
          {
            "questionEnglish": "In \"The ball was kicked by Rohan\", what received the action? ⚽",
            "questionHindi": "\"The ball was kicked by Rohan\" में किस पर क्रिया का असर हुआ?",
            "visual": "⚽ 👦",
            "options": [
              "The ball (गेंद)",
              "Rohan (रोहन)",
              "The ground",
              "The shoe"
            ],
            "correctAnswer": "The ball (गेंद)",
            "explanationEnglish": "The ball received the kick, so it is the object in Passive voice!",
            "explanationHindi": "गेंद (The ball) पर क्रिया हुई, यह Passive वाक्य है!"
          },
          {
            "questionEnglish": "Which sentence is in Active Voice?",
            "questionHindi": "इनमें से Active Voice (कर्तृवाच्य) का वाक्य कौन सा है?",
            "visual": "Active Voice",
            "options": [
              "Rai ate an apple.",
              "An apple was eaten by Rai.",
              "The car was driven by Dad.",
              "A song was sung by Rita."
            ],
            "correctAnswer": "Rai ate an apple.",
            "explanationEnglish": "\"Rai ate an apple\" has subject Rai doing the action directly!",
            "explanationHindi": "यहाँ राय खुद क्रिया कर रहा है, इसलिए Active Voice है!"
          },
          {
            "questionEnglish": "Which sentence is in Passive Voice?",
            "questionHindi": "इनमें से Passive Voice (कर्मवाच्य) का वाक्य कौन सा है?",
            "visual": "Passive Voice",
            "options": [
              "The cake was baked by Mom.",
              "Mom baked a delicious cake.",
              "Rohan kicked the ball.",
              "Birds build nests."
            ],
            "correctAnswer": "The cake was baked by Mom.",
            "explanationEnglish": "\"The cake was baked by Mom\" is in Passive voice because the cake received the action!",
            "explanationHindi": "यहाँ केक पर क्रिया हुई है (\"was baked by\"), इसलिए Passive Voice है!"
          }
        ]
      },
      {
        "id": "c4-eng-punctuation",
        "titleEnglish": "Punctuation & Quotation Marks",
        "titleHindi": "विराम चिह्न (Punctuation & Quotes)",
        "descriptionEnglish": "Master question marks, exclamation marks, commas, and direct speech quotation marks.",
        "descriptionHindi": "पूर्णविराम, प्रश्नवाचक, विस्मयादिबोधक व उद्धरण चिह्नों (\"...\") का सही उपयोग।",
        "icon": "✍️",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "Question Mark: Where are you going?",
            "hindi": "प्रश्नवाचक चिन्ह: ?"
          },
          {
            "english": "Quotation Marks: \"I am ready,\" said Rai.",
            "hindi": "उद्धरण चिन्ह: \"...\""
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "Which punctuation mark is used at the end of a question?",
            "questionHindi": "प्रश्न पूछने वाले वाक्य के अंत में कौन सा चिन्ह लगता है?",
            "visual": "❓",
            "options": [
              "Question mark (?)",
              "Period / Full stop (.)",
              "Comma (,)",
              "Exclamation (!)"
            ],
            "correctAnswer": "Question mark (?)",
            "explanationEnglish": "A question always ends with a question mark (?)!",
            "explanationHindi": "प्रश्न के अंत में हमेशा Question mark (?) लगता है!"
          },
          {
            "questionEnglish": "Where should quotation marks be placed?",
            "questionHindi": "किसी के कहे गए शब्दों के लिए कौन सा वाक्य सही है?",
            "visual": "\"...\"",
            "options": [
              "\"Hello!\", said teacher.",
              "Hello! said teacher.",
              "Hello, said \"teacher.\"",
              "\"Hello said\" teacher."
            ],
            "correctAnswer": "\"Hello!\", said teacher.",
            "explanationEnglish": "Exact spoken words must be wrapped in quotation marks (\"...\")!",
            "explanationHindi": "बोले गए शब्दों को उद्धरण चिन्ह (\"...\") में रखा जाता है!"
          },
          {
            "questionEnglish": "Which sentence has correct capitalization?",
            "questionHindi": "सही बड़े अक्षरों (Capitalization) वाला वाक्य कौन सा है?",
            "visual": "ABC",
            "options": [
              "Rai lives in India.",
              "rai lives in india.",
              "Rai lives in india.",
              "rai lives in India."
            ],
            "correctAnswer": "Rai lives in India.",
            "explanationEnglish": "Names (Rai) and Countries (India) always begin with a Capital letter!",
            "explanationHindi": "नाम (Rai) और देश (India) का पहला अक्षर बड़ा (Capital) होता है!"
          },
          {
            "questionEnglish": "The apostrophe in \"Rohan's book\" shows:",
            "questionHindi": "\"Rohan's book\" में एपॉस्ट्रोफी ('s) क्या दर्शाता है?",
            "visual": "Rohan's 📚",
            "options": [
              "Ownership / Possession (स्वामित्व)",
              "Plural (बहुवचन)",
              "Past tense",
              "Action"
            ],
            "correctAnswer": "Ownership / Possession (स्वामित्व)",
            "explanationEnglish": "Apostrophe-s ('s) shows that the book belongs to Rohan!",
            "explanationHindi": "'s यह दर्शाता है कि किताब रोहन की है!"
          }
        ]
      }
    ],
    "hindiTopics": [
      {
        "id": "c4-hin-kaal",
        "titleEnglish": "Kaal Ke Bhed (काल के भेद - Tenses)",
        "titleHindi": "काल के भेद (भूतकाल, वर्तमानकाल, भविष्यकाल)",
        "descriptionEnglish": "Differentiate between Past (Bhootkaal), Present (Vartamaankaal), and Future (Bhavishyatkaal).",
        "descriptionHindi": "क्रिया के जिस रूप से कार्य के समय का बोध हो: भूत, वर्तमान, भविष्य।",
        "icon": "⏳",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "भूतकाल: काम हो चुका (था / थी / थे)",
            "hindi": "भूतकाल: काम बीत चुका ⏳"
          },
          {
            "english": "वर्तमानकाल: काम हो रहा है (है / हैं)",
            "hindi": "वर्तमानकाल: अभी हो रहा कार्य ⏱️"
          },
          {
            "english": "भविष्यकाल: काम आगे होगा (गा / गी / गे)",
            "hindi": "भविष्यकाल: आने वाले समय में 🔮"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"कल हम दिल्ली जाएँगे।\" यह वाक्य किस काल का है?",
            "questionHindi": "\"कल हम दिल्ली जाएँगे।\" यह वाक्य किस काल का है?",
            "visual": "🏛️ 🔮",
            "options": [
              "भविष्यत काल (Future)",
              "भूतकाल (Past)",
              "वर्तमान काल (Present)",
              "कोई नहीं"
            ],
            "correctAnswer": "भविष्यत काल (Future)",
            "explanationEnglish": "जाएँगे indicates future action (भविष्यत काल).",
            "explanationHindi": "\"जाएँगे\" आने वाले समय को बताता है, इसलिए यह \"भविष्यत काल\" है!"
          },
          {
            "questionEnglish": "\"बच्चे मैदान में खेल रहे हैं।\" यह किस काल का वाक्य है?",
            "questionHindi": "\"बच्चे मैदान में खेल रहे हैं।\" यह किस काल का वाक्य है?",
            "visual": "⚽ ⏱️",
            "options": [
              "वर्तमान काल (Present)",
              "भूतकाल (Past)",
              "भविष्यत काल (Future)",
              "अपूर्ण काल"
            ],
            "correctAnswer": "वर्तमान काल (Present)",
            "explanationEnglish": "\"खेल रहे हैं\" indicates present action happening right now!",
            "explanationHindi": "\"खेल रहे हैं\" अभी चल रहे समय (वर्तमान काल) को बताता है!"
          },
          {
            "questionEnglish": "\"हमने कल सर्कस देखा था।\" यह किस काल का वाक्य है? 🎪",
            "questionHindi": "\"हमने कल सर्कस देखा था।\" यह किस काल का वाक्य है? 🎪",
            "visual": "🎪 ⏳",
            "options": [
              "भूतकाल (Past)",
              "वर्तमान काल (Present)",
              "भविष्यत काल (Future)",
              "सामान्य काल"
            ],
            "correctAnswer": "भूतकाल (Past)",
            "explanationEnglish": "\"देखा था\" indicates an action already completed in the past!",
            "explanationHindi": "\"देखा था\" बीते हुए समय (भूतकाल) को दर्शाता है!"
          },
          {
            "questionEnglish": "भूतकाल का सही वाक्य पहचानिए:",
            "questionHindi": "भूतकाल का सही वाक्य पहचानिए:",
            "visual": "भूतकाल ⏳",
            "options": [
              "मैंने खाना खा लिया था।",
              "मैं खाना खा रहा हूँ।",
              "मैं खाना खाऊँगा।",
              "हम खाना खाते हैं।"
            ],
            "correctAnswer": "मैंने खाना खा लिया था।",
            "explanationEnglish": "\"खा लिया था\" indicates past tense (भूतकाल)!",
            "explanationHindi": "\"खा लिया था\" भूतकाल का सही वाक्य है!"
          }
        ]
      },
      {
        "id": "c4-hin-muhavare",
        "titleEnglish": "Lokpriya Muhavare (लोकप्रिय मुहावरे)",
        "titleHindi": "हिंदी मुहावरे व उनके सही अर्थ (Muhavare)",
        "descriptionEnglish": "Understand famous idioms: 9-2-Gyarah hona, Aankhon ka tara, Daant khatte karna.",
        "descriptionHindi": "विशेष अर्थ प्रकट करने वाले मुहावरों का अर्थ व वाक्य प्रयोग।",
        "icon": "🎭",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "नौ दो ग्यारह होना = भाग जाना",
            "hindi": "नौ दो ग्यारह होना = भाग जाना 🏃‍♂️"
          },
          {
            "english": "आँखों का तारा = बहुत प्यारा",
            "hindi": "आँखों का तारा = बहुत प्यारा ⭐"
          },
          {
            "english": "दाँत खट्टे करना = पराजित करना",
            "hindi": "दाँत खट्टे करना = हरा देना ⚔️"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"नौ दो ग्यारह होना\" मुहावरे का सही अर्थ क्या है?",
            "questionHindi": "\"नौ दो ग्यारह होना\" मुहावरे का सही अर्थ क्या है?",
            "visual": "🏃‍♂️ 💨",
            "options": [
              "भाग जाना",
              "गिनती सीखना",
              "डर जाना",
              "लड़ना"
            ],
            "correctAnswer": "भाग जाना",
            "explanationEnglish": "नौ दो ग्यारह होना का अर्थ तुरंत भाग जाना होता है!",
            "explanationHindi": "नौ दो ग्यारह होना का अर्थ तुरंत भाग जाना है!"
          },
          {
            "questionEnglish": "\"आँखों का तारा\" मुहावरे का क्या अर्थ है? ⭐",
            "questionHindi": "\"आँखों का तारा\" मुहावरे का क्या अर्थ है? ⭐",
            "visual": "⭐ 👀",
            "options": [
              "बहुत प्यारा",
              "आँखों में दर्द",
              "रात को दिखना",
              "तारा देखना"
            ],
            "correctAnswer": "बहुत प्यारा",
            "explanationEnglish": "आँखों का तारा का अर्थ सबका बहुत प्यारा व लाड़ला होना है!",
            "explanationHindi": "आँखों का तारा का अर्थ बहुत प्यारा होना है!"
          },
          {
            "questionEnglish": "\"दाँत खट्टे करना\" मुहावरे का अर्थ बताइए:",
            "questionHindi": "\"दाँत खट्टे करना\" मुहावरे का अर्थ बताइए:",
            "visual": "⚔️ 🍋",
            "options": [
              "हरा देना / पराजित करना",
              "नींबू खाना",
              "दाँत साफ करना",
              "गुस्सा होना"
            ],
            "correctAnswer": "हरा देना / पराजित करना",
            "explanationEnglish": "दाँत खट्टे करने का अर्थ दुश्मन को बुरी तरह हरा देना है!",
            "explanationHindi": "दाँत खट्टे करना का अर्थ पराजित करना (हराना) है!"
          },
          {
            "questionEnglish": "\"अंगूठा दिखाना\" मुहावरे का अर्थ क्या है? 👍",
            "questionHindi": "\"अंगूठा दिखाना\" मुहावरे का अर्थ क्या है? 👍",
            "visual": "👍 ❌",
            "options": [
              "साफ़ इनकार करना",
              "अंगूठा चूसना",
              "मदद करना",
              "ताली बजाना"
            ],
            "correctAnswer": "साफ़ इनकार करना",
            "explanationEnglish": "अंगूठा दिखाना का अर्थ समय पर साफ़ मना कर देना होता है!",
            "explanationHindi": "अंगूठा दिखाना यानी साफ़ इनकार करना!"
          }
        ]
      },
      {
        "id": "c4-hin-karak",
        "titleEnglish": "Karak Ke Bhed (कारक के भेद)",
        "titleHindi": "कारक व उनकी विभक्तियाँ (Karak)",
        "descriptionEnglish": "Identify case markers: Karta ne, Karm ko, Karan se, Sampradan ke liye, Apadan se alag.",
        "descriptionHindi": "संज्ञा या सर्वनाम का क्रिया के साथ संबंध बताने वाले कारक चिन्ह पहचानें।",
        "icon": "🎯",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "कर्ता ने (Karta ne - Doer)",
            "hindi": "कर्ता ने (राम ने)"
          },
          {
            "english": "कर्म को (Karm ko - Receiver)",
            "hindi": "कर्म को (रावण को)"
          },
          {
            "english": "करण से (Karan se - By means of)",
            "hindi": "करण से (कलम से)"
          },
          {
            "english": "अपादान से अलग (Apadan se - Separation)",
            "hindi": "अपादान से (पेड़ से पत्ता गिरा)"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "\"राम ने रावण को बाण से मारा।\" में 'ने' कौन सा कारक है?",
            "questionHindi": "\"राम ने रावण को बाण से मारा।\" में 'ने' कौन सा कारक है?",
            "visual": "राम [ने]...",
            "options": [
              "कर्ता कारक (Karta)",
              "कर्म कारक (Karm)",
              "करण कारक (Karan)",
              "अपादान कारक"
            ],
            "correctAnswer": "कर्ता कारक (Karta)",
            "explanationEnglish": "'ने' विभक्ति कर्ता कारक की पहचान है (काम करने वाला)!",
            "explanationHindi": "'ने' कर्ता कारक का चिन्ह है!"
          },
          {
            "questionEnglish": "\"पेड़ से पत्ता गिरा।\" में 'से' कौन सा कारक है? 🍂",
            "questionHindi": "\"पेड़ से पत्ता गिरा।\" में 'से' कौन सा कारक है? 🍂",
            "visual": "🌳 🍂",
            "options": [
              "अपादान कारक (Separation)",
              "करण कारक",
              "कर्ता कारक",
              "संबोधन कारक"
            ],
            "correctAnswer": "अपादान कारक (Separation)",
            "explanationEnglish": "जब कोई वस्तु किसी स्थान से अलग होती है, तो अपादान कारक (से) होता है!",
            "explanationHindi": "अलग होने के अर्थ में 'से' अपादान कारक होता है!"
          },
          {
            "questionEnglish": "\"वह कलम से लिखता है।\" में 'से' कौन सा कारक है? ✍️",
            "questionHindi": "\"वह कलम से लिखता है।\" में 'से' कौन सा कारक है? ✍️",
            "visual": "✍️",
            "options": [
              "करण कारक (Means)",
              "अपादान कारक",
              "कर्म कारक",
              "सम्बन्ध कारक"
            ],
            "correctAnswer": "करण कारक (Means)",
            "explanationEnglish": "जिस साधन से काम किया जाए (कलम द्वारा), वह करण कारक होता है!",
            "explanationHindi": "साधन के अर्थ में 'से' करण कारक होता है!"
          },
          {
            "questionEnglish": "\"माँ ने बच्चों को मिठाई दी।\" में 'को' कौन सा कारक है? 🍬",
            "questionHindi": "\"माँ ने बच्चों को मिठाई दी।\" में 'को' कौन सा कारक है? 🍬",
            "visual": "🍬 👦👧",
            "options": [
              "कर्म कारक (Karm)",
              "कर्ता कारक",
              "अपादान कारक",
              "अधिकरण कारक"
            ],
            "correctAnswer": "कर्म कारक (Karm)",
            "explanationEnglish": "क्रिया का फल जिस पर पड़ता है (बच्चों को), वह कर्म कारक होता है!",
            "explanationHindi": "'को' कर्म कारक का विभक्ति चिन्ह है!"
          }
        ]
      },
      {
        "id": "c4-hin-vakya",
        "titleEnglish": "Vakya Shuddhi (वाक्य शुद्धि)",
        "titleHindi": "वाक्य शुद्धि व सही वर्तनी (Correct Sentences)",
        "descriptionEnglish": "Fix grammatical errors in sentences, gender agreement, and word order.",
        "descriptionHindi": "लिंग, वचन, कारक और पदक्रम की अशुद्धियों को पहचानकर शुद्ध वाक्य बनाना।",
        "icon": "✅",
        "difficulty": "Advanced",
        "keyConcepts": [
          {
            "english": "अशुद्ध: मेरे को जाना है ➔ शुद्ध: मुझे जाना है",
            "hindi": "अशुद्ध: मेरे को ➔ शुद्ध: मुझे"
          },
          {
            "english": "अशुद्ध: गाय पानी पीता है ➔ शुद्ध: गाय पानी पीती है",
            "hindi": "स्त्रीलिंग के साथ पीती है"
          }
        ],
        "quizQuestions": [
          {
            "questionEnglish": "शुद्ध वाक्य पहचानिए:",
            "questionHindi": "इनमें से व्याकरण की दृष्टि से शुद्ध वाक्य पहचानिए:",
            "visual": "✅ vs ❌",
            "options": [
              "मेरे पास एक गाय है।",
              "मेरे को एक गाय है।",
              "मेरे पास एक गाय हैं।",
              "मुझको एक गाय होती है।"
            ],
            "correctAnswer": "मेरे पास एक गाय है।",
            "explanationEnglish": "\"मेरे पास एक गाय है।\" सही और शुद्ध वाक्य है!",
            "explanationHindi": "\"मेरे पास एक गाय है।\" पूरी तरह शुद्ध वाक्य है!"
          },
          {
            "questionEnglish": "अशुद्ध वाक्य कौन सा है?",
            "questionHindi": "इनमें से अशुद्ध (गलत) वाक्य कौन सा है?",
            "visual": "❌",
            "options": [
              "मेरे को घर जाना है।",
              "मुझे घर जाना है।",
              "हम घर जा रहे हैं।",
              "वे घर जाएँगे।"
            ],
            "correctAnswer": "मेरे को घर जाना है।",
            "explanationEnglish": "\"मेरे को\" अशुद्ध प्रयोग है, सही रूप \"मुझे घर जाना है\" होता है!",
            "explanationHindi": "\"मेरे को\" अशुद्ध है, शुद्ध \"मुझे\" होता है!"
          },
          {
            "questionEnglish": "\"बच्चे को काटकर सेब खिलाओ\" का शुद्ध वाक्य क्या होगा? 🍎",
            "questionHindi": "\"बच्चे को काटकर सेब खिलाओ\" का शुद्ध वाक्य क्या होगा? 🍎",
            "visual": "🍎 👦",
            "options": [
              "सेब काटकर बच्चे को खिलाओ।",
              "काटकर सेब बच्चे को दो।",
              "बच्चे को सेब खिलाओ काटकर।",
              "सेब बच्चे को काटो।"
            ],
            "correctAnswer": "सेब काटकर बच्चे को खिलाओ।",
            "explanationEnglish": "पदक्रम की गलती: सेब काटा जाता है, बच्चा नहीं! सही: \"सेब काटकर बच्चे को खिलाओ।\"",
            "explanationHindi": "सही पदक्रम: \"सेब काटकर बच्चे को खिलाओ।\""
          },
          {
            "questionEnglish": "\"खरगोश को काटकर गाजर खिलाओ\" का शुद्ध वाक्य बताइए: 🥕🐇",
            "questionHindi": "\"खरगोश को काटकर गाजर खिलाओ\" का शुद्ध वाक्य बताइए: 🥕🐇",
            "visual": "🥕 🐇",
            "options": [
              "गाजर काटकर खरगोश को खिलाओ।",
              "खरगोश गाजर काटो।",
              "काटकर गाजर खरगोश दो।",
              "खरगोश को गाजर खिलाओ काटकर।"
            ],
            "correctAnswer": "गाजर काटकर खरगोश को खिलाओ।",
            "explanationEnglish": "गाजर को काटा जाता है, खरगोश को नहीं! सही वाक्य: \"गाजर काटकर खरगोश को खिलाओ।\"",
            "explanationHindi": "शुद्ध वाक्य: \"गाजर काटकर खरगोश को खिलाओ।\""
          }
        ]
      }
    ],
    "scienceTopics": [
      {
            "id": "class45-sci-1",
            "titleEnglish": "Force, Gravity & Simple Machines (बल, गुरुत्वाकर्षण व मशीनें)",
            "titleHindi": "गुरुत्वाकर्षण बल, घर्षण व सरल यांत्रिकी",
            "descriptionEnglish": "Understand gravity pulling objects down, friction stopping motion, and levers.",
            "descriptionHindi": "पृथ्वी का खिंचाव, घर्षण बल और उत्तोलक व घिरनी के नियम।",
            "icon": "⚙️",
            "difficulty": "Advanced",
            "keyConcepts": [
                  {
                        "english": "Gravity: Earth pulls all masses downwards 🌍",
                        "hindi": "गुरुत्वाकर्षण: पृथ्वी हर वस्तु को नीचे खींचती है"
                  },
                  {
                        "english": "Friction: Opposes relative motion ⛸️",
                        "hindi": "घर्षण: गति का विरोध करने वाला बल"
                  },
                  {
                        "english": "Simple Machines: Levers, Pulleys, Inclined Planes 🪓",
                        "hindi": "सरल मशीनें: कार्य आसान बनाती हैं"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "When an apple falls off a tree branch, which invisible force pulls it straight to the ground? 🍎",
                        "questionHindi": "जब पेड़ से सेब टूटता है, तो किस अदृश्य बल के कारण वह सीधे जमीन पर नीचे गिरता है? 🍎",
                        "visual": "🍎 ⬇️ 🌍",
                        "options": [
                              "Gravitational Force (गुरुत्वाकर्षण बल) 🌍",
                              "Magnetic Attraction",
                              "Electrostatic Force",
                              "Wind Resistance"
                        ],
                        "correctAnswer": "Gravitational Force (गुरुत्वाकर्षण बल) 🌍",
                        "explanationEnglish": "Sir Isaac Newton discovered gravity, which pulls everything toward Earth's center.",
                        "explanationHindi": "गुरुत्वाकर्षण बल (Gravity) हर वस्तु को पृथ्वी के केंद्र की ओर खींचता है।"
                  },
                  {
                        "questionEnglish": "Why is it very difficult to walk on wet polished ice without slipping? ⛸️",
                        "questionHindi": "गीली चिकनी बर्फ पर बिना फिसले चलना इतना कठिन क्यों होता है? ⛸️",
                        "visual": "⛸️ ❄️ 🦶",
                        "options": [
                              "Very low frictional force (घर्षण बल बहुत कम होता है)",
                              "High air density",
                              "High gravitational pull",
                              "Extreme magnetism"
                        ],
                        "correctAnswer": "Very low frictional force (घर्षण बल बहुत कम होता है)",
                        "explanationEnglish": "Friction provides the grip between shoes and ground; smooth ice has almost zero friction!",
                        "explanationHindi": "बर्फ पर घर्षण (Friction) बहुत कम होने से पैर फिसल जाते हैं।"
                  },
                  {
                        "questionEnglish": "Which simple machine uses a grooved wheel and a rope to lift heavy water buckets from a well? 🪣",
                        "questionHindi": "कुएं से पानी की भारी बाल्टी खींचने के लिए पहिए और रस्सी वाली कौन सी सरल मशीन काम आती है? 🪣",
                        "visual": "🪢 🛞 🪣",
                        "options": [
                              "Pulley (घिरनी) 🛞",
                              "Wedge (कुल्हाड़ी की धार)",
                              "Screw (पेंच)",
                              "Lever Type 3"
                        ],
                        "correctAnswer": "Pulley (घिरनी) 🛞",
                        "explanationEnglish": "A pulley changes the direction of force, making lifting heavy loads much easier.",
                        "explanationHindi": "घिरनी (Pulley) से दिशा बदलकर भारी वजन आसानी से ऊपर खींचा जाता है।"
                  }
            ]
      },
      {
            "id": "class45-sci-2",
            "titleEnglish": "Ecosystems, Food Webs & Blood (पारिस्थितिकी व रक्त परिसंचरण)",
            "titleHindi": "खाद्य श्रृंखला व मानव रक्त कोशिकाएं",
            "descriptionEnglish": "Understand food chains, producers, consumers, and how WBCs fight diseases.",
            "descriptionHindi": "उत्पादक, उपभोक्ता, अपघटक और श्वेत रक्त कणिकाओं की रक्षा प्रणाली।",
            "icon": "🔬",
            "difficulty": "Advanced",
            "keyConcepts": [
                  {
                        "english": "Producers = Green plants making food 🌿",
                        "hindi": "उत्पादक = हरे पौधे जो भोजन बनाते हैं"
                  },
                  {
                        "english": "Consumers = Animals eating plants/meat 🦁",
                        "hindi": "उपभोक्ता = जीव जो अन्य पर निर्भर हैं"
                  },
                  {
                        "english": "White Blood Cells = Body's soldier army 🛡️",
                        "hindi": "श्वेत रक्त कणिकाएं = रोगों से लड़ने वाले सैनिक"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which cells in our bloodstream act like brave soldiers to fight bacteria and viruses? 🛡️",
                        "questionHindi": "हमारे खून में कौन सी कोशिकाएं वीर सैनिकों की तरह बैक्टीरिया और बीमारियों से लड़ती हैं? 🛡️",
                        "visual": "🛡️ 🩸 🦠",
                        "options": [
                              "White Blood Cells / WBC (श्वेत रक्त कणिकाएं) 🛡️",
                              "Red Blood Cells / RBC 🔴",
                              "Platelets (प्लेटलेट्स)",
                              "Skin Cells"
                        ],
                        "correctAnswer": "White Blood Cells / WBC (श्वेत रक्त कणिकाएं) 🛡️",
                        "explanationEnglish": "WBCs produce antibodies to destroy harmful germs and protect our immunity!",
                        "explanationHindi": "WBC शरीर की रोग प्रतिरोधक क्षमता (Immunity) की रक्षा करती हैं।"
                  },
                  {
                        "questionEnglish": "In an ecological food chain: Grass ➔ Deer ➔ Tiger, what is the role of the Grass? 🌾",
                        "questionHindi": "खाद्य श्रृंखला: घास ➔ हिरण ➔ बाघ में हरी घास की क्या भूमिका है? 🌾",
                        "visual": "🌾 🦌 🐅",
                        "options": [
                              "Producer (उत्पादक) 🌾",
                              "Secondary Consumer",
                              "Carnivore Predator",
                              "Decomposer"
                        ],
                        "correctAnswer": "Producer (उत्पादक) 🌾",
                        "explanationEnglish": "Plants are Producers because they manufacture energy directly from sunlight.",
                        "explanationHindi": "हरे पौधे स्वयं भोजन बनाते हैं इसलिए उन्हें 'उत्पादक' (Producer) कहते हैं।"
                  }
            ]
      }
],
    "gkTopics": [
      {
            "id": "class45-gk-1",
            "titleEnglish": "World Geography: Continents & Oceans (विश्व भूगोल)",
            "titleHindi": "महाद्वीप, महासागर व विश्व के भौगोलिक अजूबे",
            "descriptionEnglish": "Explore 7 continents, 5 oceans, Pacific deep trench, and Sahara desert.",
            "descriptionHindi": "७ महाद्वीप, ५ महासागर, प्रशांत महासागर और सहारा रेगिस्तान।",
            "icon": "🌏",
            "difficulty": "Advanced",
            "keyConcepts": [
                  {
                        "english": "Largest Continent = Asia 🌏",
                        "hindi": "सबसे बड़ा महाद्वीप = एशिया"
                  },
                  {
                        "english": "Largest Ocean = Pacific Ocean 🌊",
                        "hindi": "सबसे बड़ा महासागर = प्रशांत"
                  },
                  {
                        "english": "Largest Desert = Sahara Desert 🐪",
                        "hindi": "सबसे बड़ा गर्म मरुस्थल = सहारा"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Which is the largest continent in the world, covering 30% of Earth's land area? 🌏",
                        "questionHindi": "क्षेत्रफल और जनसंख्या दोनों में विश्व का सबसे बड़ा महाद्वीप कौन सा है जिसमें भारत भी स्थित है? 🌏",
                        "visual": "🌏 🗺️ 🇮🇳",
                        "options": [
                              "Asia (एशिया) 🌏",
                              "Africa (अफ्रीका)",
                              "Europe (यूरोप)",
                              "North America (उत्तरी अमेरिका)"
                        ],
                        "correctAnswer": "Asia (एशिया) 🌏",
                        "explanationEnglish": "Asia is the largest continent with over 4.7 billion people and 48 countries.",
                        "explanationHindi": "एशिया पृथ्वी का सबसे बड़ा महाद्वीप है।"
                  },
                  {
                        "questionEnglish": "Which is the deepest and largest ocean on planet Earth, covering more area than all land? 🌊",
                        "questionHindi": "पृथ्वी का सबसे बड़ा और सबसे गहरा महासागर कौन सा है जिसमें मारियाना ट्रेंच स्थित है? 🌊",
                        "visual": "🌊 🐋 🏝️",
                        "options": [
                              "Pacific Ocean (प्रशांत महासागर) 🌊",
                              "Atlantic Ocean (अटलांटिक)",
                              "Indian Ocean (हिंद महासागर)",
                              "Arctic Ocean (आर्कटिक)"
                        ],
                        "correctAnswer": "Pacific Ocean (प्रशांत महासागर) 🌊",
                        "explanationEnglish": "The Pacific Ocean covers over 30% of Earth's surface and contains the Mariana Trench.",
                        "explanationHindi": "प्रशांत महासागर विश्व का सबसे विशाल और गहरा महासागर है।"
                  },
                  {
                        "questionEnglish": "Which enormous hot desert in Northern Africa is the largest subtropical desert on Earth? 🐪",
                        "questionHindi": "उत्तरी अफ्रीका में फैला विश्व का सबसे बड़ा और विशाल गर्म रेगिस्तान कौन सा है? 🐪",
                        "visual": "🐪 🏜️ ☀️",
                        "options": [
                              "Sahara Desert (सहारा मरुस्थल) 🐪",
                              "Thar Desert (थार मरुस्थल)",
                              "Gobi Desert (गोबी)",
                              "Kalahari Desert"
                        ],
                        "correctAnswer": "Sahara Desert (सहारा मरुस्थल) 🐪",
                        "explanationEnglish": "The Sahara Desert is nearly as large as the entire United States or China!",
                        "explanationHindi": "सहारा रेगिस्तान विश्व का सबसे बड़ा गर्म मरुस्थल है।"
                  }
            ]
      },
      {
            "id": "class45-gk-2",
            "titleEnglish": "Indian Constitution & Space Exploration (संविधान व अंतरिक्ष)",
            "titleHindi": "भारतीय संविधान, महान हस्तियां व इसरो मिशन",
            "descriptionEnglish": "Learn Dr. B.R. Ambedkar, Indian Constitution, ISRO, and Chandrayaan missions.",
            "descriptionHindi": "बाबासाहेब अम्बेडकर, संविधान और चंद्रयान-३ का ऐतिहासिक मिशन।",
            "icon": "🚀",
            "difficulty": "Advanced",
            "keyConcepts": [
                  {
                        "english": "Constitution Father = Dr. B.R. Ambedkar 📜",
                        "hindi": "संविधान के जनक = डॉ. बी.आर. अम्बेडकर"
                  },
                  {
                        "english": "Space Agency = ISRO 🚀",
                        "hindi": "भारतीय अंतरिक्ष संस्था = इसरो"
                  },
                  {
                        "english": "Historic Moon Landing = Chandrayaan-3 🌕",
                        "hindi": "चंद्रमा के दक्षिणी ध्रुव पर = चंद्रयान-३"
                  }
            ],
            "quizQuestions": [
                  {
                        "questionEnglish": "Who is respectfully honored as the 'Chief Architect & Father of the Indian Constitution'? 📜",
                        "questionHindi": "भारतीय संविधान की ड्राफ्टिंग कमेटी के अध्यक्ष और संविधान के जनक किन्हें कहा जाता है? 📜",
                        "visual": "📜 🏛️ 🇮🇳",
                        "options": [
                              "Dr. B.R. Ambedkar (बाबासाहेब अम्बेडकर) 📜",
                              "Mahatma Gandhi (गांधी जी)",
                              "Jawaharlal Nehru (नेहरू जी)",
                              "Sardar Vallabhbhai Patel"
                        ],
                        "correctAnswer": "Dr. B.R. Ambedkar (बाबासाहेब अम्बेडकर) 📜",
                        "explanationEnglish": "Dr. Bhimrao Ramji Ambedkar led the drafting of the world's longest written constitution for India.",
                        "explanationHindi": "डॉ. भीमराव अम्बेडकर भारतीय संविधान के मुख्य शिल्पी व जनक हैं।"
                  },
                  {
                        "questionEnglish": "What is the name of India's world-renowned space agency located in Bengaluru? 🚀",
                        "questionHindi": "भारत की विश्वप्रसिद्ध अंतरिक्ष अनुसंधान संस्था का नाम क्या है जिसका मुख्यालय बेंगलुरु में है? 🚀",
                        "visual": "🚀 🛰️ 🇮🇳",
                        "options": [
                              "ISRO (इसरो - Indian Space Research Organisation) 🚀",
                              "NASA (नासा)",
                              "ESA (यूरोपीय अंतरिक्ष एजेंसी)",
                              "JAXA (जाक्सा)"
                        ],
                        "correctAnswer": "ISRO (इसरो - Indian Space Research Organisation) 🚀",
                        "explanationEnglish": "ISRO was founded in 1969 and has launched historic lunar and Mars orbital missions.",
                        "explanationHindi": "ISRO भारत की राष्ट्रीय अंतरिक्ष एजेंसी है।"
                  },
                  {
                        "questionEnglish": "Which proud Indian spacecraft made history in August 2023 by landing near the Moon's South Pole? 🌕",
                        "questionHindi": "अगस्त २०२३ में चंद्रमा के अज्ञात दक्षिणी ध्रुव पर तिरंगा फहराने वाले भारत के ऐतिहासिक मिशन का क्या नाम है? 🌕",
                        "visual": "🌕 🇮🇳 🚀",
                        "options": [
                              "Chandrayaan-3 (चंद्रयान-३) 🌕",
                              "Mangalyaan (मंगलयान)",
                              "Aditya-L1 (आदित्य-एल१)",
                              "Gaganyaan (गगनयान)"
                        ],
                        "correctAnswer": "Chandrayaan-3 (चंद्रयान-३) 🌕",
                        "explanationEnglish": "Chandrayaan-3 made India the first nation in human history to land near the lunar south pole!",
                        "explanationHindi": "चंद्रयान-३ ने चांद के दक्षिणी ध्रुव पर सफल लैंडिंग करके इतिहास रचा।"
                  }
            ]
      }
]
  }
};

// Helper to determine default GradeLevel from child's profile grade string
export function mapGradeStringToLevel(gradeString?: string, age?: number): GradeLevel {
  const g = (gradeString || '').toLowerCase();
  if (g.includes('nursery') || g.includes('lkg') || (age && age <= 4)) return 'nursery';
  if (g.includes('ukg') || g.includes('class 1') || (age && age <= 6)) return 'class-1';
  if (g.includes('class 2') || (age && age === 7)) return 'class-2';
  if (g.includes('class 3') || (age && age >= 8 && age <= 9)) return 'class-3';
  if (g.includes('class 4') || g.includes('class 5') || (age && age >= 10)) return 'class-4-5';
  return 'class-3'; // Default rich level
}

// Helper to count total available questions in curriculum bank
export function getTotalCurriculumQuestionsCount(): number {
  let count = 0;
  for (const key of Object.keys(CLASS_WISE_CURRICULUM) as GradeLevel[]) {
    const g = CLASS_WISE_CURRICULUM[key];
    for (const t of [...g.mathsTopics, ...g.englishTopics, ...g.hindiTopics, ...(g.scienceTopics || []), ...(g.gkTopics || [])]) {
      count += t.quizQuestions.length;
    }
  }
  return count;
}
