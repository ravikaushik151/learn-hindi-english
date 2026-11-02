const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Ensure output directories exist
const publicDownloadsDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(publicDownloadsDir)) {
  fs.mkdirSync(publicDownloadsDir, { recursive: true });
}

// 1. Comprehensive Question Set with Icons & Bilingual Content
const sampleQuestions = [
  {
    'Icon': '🌱',
    'Class': 'Class 3',
    'Subject': 'Science',
    'Question': 'Which part of a plant grows under the soil and absorbs water and minerals?',
    'Option A': 'Roots',
    'Option B': 'Leaves',
    'Option C': 'Flowers',
    'Option D': 'Stem',
    'Correct Answer': 'Roots',
    'Explanation': 'Roots anchor the plant into soil and absorb water and minerals from the ground.',
    'Hindi Question': 'पौधे का कौन सा भाग मिट्टी के अंदर रहकर पानी और खनिज सोखता है?'
  },
  {
    'Icon': '☀️',
    'Class': 'Class 3',
    'Subject': 'Science',
    'Question': 'Which gas do green plants release into the air during daytime photosynthesis?',
    'Option A': 'Oxygen',
    'Option B': 'Carbon Dioxide',
    'Option C': 'Nitrogen',
    'Option D': 'Helium',
    'Correct Answer': 'Oxygen',
    'Explanation': 'Green plants take in CO2 and release oxygen, which humans and animals breathe.',
    'Hindi Question': 'दिन में प्रकाश संश्लेषण (Photosynthesis) के दौरान पौधे कौन सी गैस छोड़ते हैं?'
  },
  {
    'Icon': '🦴',
    'Class': 'Class 3',
    'Subject': 'Science',
    'Question': 'How many bones are there in an adult human skeleton?',
    'Option A': '206',
    'Option B': '150',
    'Option C': '300',
    'Option D': '250',
    'Correct Answer': '206',
    'Explanation': 'An adult human body has 206 bones, while newborns have about 270–300 bones.',
    'Hindi Question': 'एक वयस्क मानव शरीर में कुल कितनी हड्डियां होती हैं?'
  },
  {
    'Icon': '🐯',
    'Class': 'Class 3',
    'Subject': 'GK',
    'Question': 'What is the National Animal of India?',
    'Option A': 'Bengal Tiger',
    'Option B': 'Asiatic Lion',
    'Option C': 'Indian Elephant',
    'Option D': 'Snow Leopard',
    'Correct Answer': 'Bengal Tiger',
    'Explanation': 'The magnificent Royal Bengal Tiger is the national animal of India.',
    'Hindi Question': 'भारत का राष्ट्रीय पशु कौन सा है?'
  },
  {
    'Icon': '🌊',
    'Class': 'Class 3',
    'Subject': 'GK',
    'Question': 'Which is the largest and deepest ocean on planet Earth?',
    'Option A': 'Pacific Ocean',
    'Option B': 'Atlantic Ocean',
    'Option C': 'Indian Ocean',
    'Option D': 'Arctic Ocean',
    'Correct Answer': 'Pacific Ocean',
    'Explanation': 'The Pacific Ocean is the largest ocean, covering more than 30% of the Earth.',
    'Hindi Question': 'पृथ्वी पर सबसे बड़ा और सबसे गहरा महासागर कौन सा है?'
  },
  {
    'Icon': '🚀',
    'Class': 'Class 3',
    'Subject': 'GK',
    'Question': 'Which Indian lunar mission successfully landed near the South Pole of the Moon?',
    'Option A': 'Chandrayaan-3',
    'Option B': 'Mangalyaan',
    'Option C': 'Aditya-L1',
    'Option D': 'Gaganyaan',
    'Correct Answer': 'Chandrayaan-3',
    'Explanation': 'ISRO’s Chandrayaan-3 landed on 23 August 2023, now marked as National Space Day.',
    'Hindi Question': 'चंद्रमा के दक्षिणी ध्रुव पर किस भारतीय अंतरिक्ष मिशन ने सफल लैंडिंग की?'
  },
  {
    'Icon': '🔢',
    'Class': 'Class 3',
    'Subject': 'Maths',
    'Question': 'A fruit vendor has 45 apples and buys 35 more. How many apples does he have now?',
    'Option A': '80',
    'Option B': '75',
    'Option C': '85',
    'Option D': '90',
    'Correct Answer': '80',
    'Explanation': '45 + 35 = 80 apples in total.',
    'Hindi Question': 'एक फल विक्रेता के पास 45 सेब हैं और उसने 35 और खरीदे। कुल कितने सेब हैं?'
  },
  {
    'Icon': '📐',
    'Class': 'Class 3',
    'Subject': 'Maths',
    'Question': 'How many sides and corners does a triangle have?',
    'Option A': '3 sides and 3 corners',
    'Option B': '4 sides and 4 corners',
    'Option C': '3 sides and 4 corners',
    'Option D': '5 sides and 5 corners',
    'Correct Answer': '3 sides and 3 corners',
    'Explanation': 'A triangle (त्रिभुज) has exactly 3 straight sides and 3 vertices (corners).',
    'Hindi Question': 'एक त्रिभुज (Triangle) में कितनी भुजाएं (Sides) और कोने (Corners) होते हैं?'
  },
  {
    'Icon': '🇬🇧',
    'Class': 'Class 3',
    'Subject': 'English',
    'Question': 'Identify the Noun in this sentence: "The happy children played in the park."',
    'Option A': 'children & park',
    'Option B': 'happy',
    'Option C': 'played',
    'Option D': 'in',
    'Correct Answer': 'children & park',
    'Explanation': 'Nouns name people, places, or things. "Children" (people) and "park" (place) are nouns.',
    'Hindi Question': 'वाक्य में संज्ञा (Noun) पहचानें: "The happy children played in the park."'
  },
  {
    'Icon': '🦋',
    'Class': 'Class 3',
    'Subject': 'English',
    'Question': 'What is the correct plural form of the word "Butterfly"?',
    'Option A': 'Butterflies',
    'Option B': 'Butterflys',
    'Option C': 'Butterfles',
    'Option D': 'Butterfliez',
    'Correct Answer': 'Butterflies',
    'Explanation': 'When a word ends in a consonant + y, replace "y" with "ies" to form the plural.',
    'Hindi Question': 'शब्द "Butterfly" का सही बहुवचन (Plural) रूप क्या होगा?'
  }
];

// Create Workbook
const ws = XLSX.utils.json_to_sheet(sampleQuestions);

// Set column widths for readable viewing
ws['!cols'] = [
  { wch: 8 },  // Icon
  { wch: 12 }, // Class
  { wch: 12 }, // Subject
  { wch: 60 }, // Question
  { wch: 22 }, // Option A
  { wch: 22 }, // Option B
  { wch: 22 }, // Option C
  { wch: 22 }, // Option D
  { wch: 22 }, // Correct Answer
  { wch: 65 }, // Explanation
  { wch: 60 }  // Hindi Question
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sample_Questions');

// Save Excel file to public and root
const publicExcelPath = path.join(publicDownloadsDir, 'Sample_Questions_Template.xlsx');
const rootExcelPath = path.join(__dirname, '..', 'Sample_Questions_Template.xlsx');

XLSX.writeFile(wb, publicExcelPath);
XLSX.writeFile(wb, rootExcelPath);
console.log('✅ Excel sample created at:', publicExcelPath, 'and', rootExcelPath);

