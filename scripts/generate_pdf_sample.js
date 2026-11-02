const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const publicDownloadsDir = path.join(__dirname, '..', 'public', 'downloads');
if (!fs.existsSync(publicDownloadsDir)) {
  fs.mkdirSync(publicDownloadsDir, { recursive: true });
}

const doc = new jsPDF({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
});

// Primary styling colors
const primaryColor = [245, 158, 11]; // Amber-500
const darkColor = [30, 41, 59];      // Slate-800
const mutedColor = [100, 116, 139];  // Slate-500
const greenColor = [16, 185, 129];   // Emerald-500

// Header banner
doc.setFillColor(254, 243, 199); // Amber-100
doc.rect(0, 0, 210, 32, 'F');

doc.setTextColor(180, 83, 9); // Amber-700
doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.text('KIDS ACADEMY - SAMPLE QUESTION BANK (PDF)', 14, 14);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(120, 53, 15);
doc.text('Standard Format for Automatic Admin PDF Importer | Class 3 Curriculum', 14, 22);
doc.text('Compatible with Science, GK, Maths & English | Supported in Learn Portal', 14, 27);

// Guide Box
doc.setFillColor(248, 250, 252);
doc.setDrawColor(203, 213, 225);
doc.roundedRect(14, 36, 182, 22, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(15, 23, 42);
doc.text('HOW TO UPLOAD THIS PDF IN ADMIN CONSOLE:', 18, 42);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(71, 85, 105);
doc.text('1. Open http://localhost:3000/admin (PIN: 9999) -> Click "Question Bank" -> "Upload PDF".', 18, 48);
doc.text('2. Select Class (e.g. Class 3) and Subject (e.g. Science or GK) -> Upload this file.', 18, 53);

// Sample Questions
const pdfQuestions = [
  {
    num: 1,
    subject: 'Science',
    icon: '[Icon: Plant/Roots]',
    q: 'Which part of a plant grows under the soil and absorbs water and minerals?',
    opts: ['A) Roots', 'B) Leaves', 'C) Flowers', 'D) Stem'],
    ans: 'Answer: A',
    exp: 'Explanation: Roots anchor the plant in soil and absorb moisture and essential minerals.'
  },
  {
    num: 2,
    subject: 'Science',
    icon: '[Icon: Sun/Photosynthesis]',
    q: 'Which life-giving gas do green plants release during daytime photosynthesis?',
    opts: ['A) Oxygen', 'B) Carbon Dioxide', 'C) Nitrogen', 'D) Helium'],
    ans: 'Answer: A',
    exp: 'Explanation: Plants take in CO2 from sunlight and release pure Oxygen for living beings.'
  },
  {
    num: 3,
    subject: 'Science',
    icon: '[Icon: Human Skeleton]',
    q: 'How many total bones are present in an adult human skeletal system?',
    opts: ['A) 206 bones', 'B) 150 bones', 'C) 300 bones', 'D) 250 bones'],
    ans: 'Answer: A',
    exp: 'Explanation: An adult human body has 206 bones in total.'
  },
  {
    num: 4,
    subject: 'General Knowledge (GK)',
    icon: '[Icon: Bengal Tiger]',
    q: 'What is the National Animal of India known for its grace, strength and agility?',
    opts: ['A) Bengal Tiger', 'B) Asiatic Lion', 'C) Indian Elephant', 'D) Snow Leopard'],
    ans: 'Answer: A',
    exp: 'Explanation: The Royal Bengal Tiger (Panthera tigris tigris) is the national animal of India.'
  },
  {
    num: 5,
    subject: 'General Knowledge (GK)',
    icon: '[Icon: Ocean/Globe]',
    q: 'Which is the largest and deepest ocean on planet Earth covering over 30% of its surface?',
    opts: ['A) Pacific Ocean', 'B) Atlantic Ocean', 'C) Indian Ocean', 'D) Arctic Ocean'],
    ans: 'Answer: A',
    exp: 'Explanation: The Pacific Ocean is the largest ocean on Earth and borders Asia, Australia and the Americas.'
  },
  {
    num: 6,
    subject: 'General Knowledge (GK)',
    icon: '[Icon: Moon Rocket]',
    q: 'Which Indian space mission successfully made history on the South Pole of the Moon?',
    opts: ['A) Chandrayaan-3', 'B) Mangalyaan', 'C) Aditya-L1', 'D) Gaganyaan'],
    ans: 'Answer: A',
    exp: 'Explanation: ISRO Chandrayaan-3 landed on August 23, 2023, celebrated as National Space Day.'
  },
  {
    num: 7,
    subject: 'Mathematics',
    icon: '[Icon: Calculator/Apples]',
    q: 'A fruit shop has 45 red apples. The shopkeeper buys 35 more apples. How many in total?',
    opts: ['A) 80 apples', 'B) 75 apples', 'C) 85 apples', 'D) 90 apples'],
    ans: 'Answer: A',
    exp: 'Explanation: Total = 45 + 35 = 80 apples.'
  },
  {
    num: 8,
    subject: 'Mathematics',
    icon: '[Icon: Triangle Geometry]',
    q: 'How many straight sides and corners (vertices) does a geometric triangle have?',
    opts: ['A) 3 sides and 3 corners', 'B) 4 sides and 4 corners', 'C) 3 sides and 4 corners', 'D) 5 sides and 5 corners'],
    ans: 'Answer: A',
    exp: 'Explanation: A triangle has exactly 3 straight edges and 3 corners.'
  },
  {
    num: 9,
    subject: 'English Grammar',
    icon: '[Icon: Children Playing]',
    q: 'Identify the Nouns in this sentence: "The happy children played joyfully in the park."',
    opts: ['A) children & park', 'B) happy & joyfully', 'C) played', 'D) the & in'],
    ans: 'Answer: A',
    exp: 'Explanation: Nouns are naming words. Children (people) and park (place) are nouns.'
  },
  {
    num: 10,
    subject: 'English Grammar',
    icon: '[Icon: Butterfly Wings]',
    q: 'What is the correct English plural spelling for the word "Butterfly"?',
    opts: ['A) Butterflies', 'B) Butterflys', 'C) Butterfles', 'D) Butterfliez'],
    ans: 'Answer: A',
    exp: 'Explanation: Change ending consonant + y to -ies: butterfly -> butterflies.'
  }
];

let y = 64;

pdfQuestions.forEach((item) => {
  // Check page overflow
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  // Question header (Number + Subject badge)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);

  const qTitle = `${item.num}. ${item.q}`;
  const splitTitle = doc.splitTextToSize(qTitle, 175);
  doc.text(splitTitle, 14, y);
  y += splitTitle.length * 4.5 + 1;

  // Options grid (A, B, C, D)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  item.opts.forEach((opt) => {
    doc.text(`   ${opt}`, 16, y);
    y += 4;
  });

  // Correct answer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(16, 149, 107); // Emerald green
  doc.text(`   ${item.ans}`, 16, y);
  y += 4;

  // Explanation
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const splitExp = doc.splitTextToSize(`   ${item.exp}`, 175);
  doc.text(splitExp, 16, y);
  y += splitExp.length * 3.8 + 4;
});

// Save PDF to public and root
const publicPdfPath = path.join(publicDownloadsDir, 'Sample_Questions_Guide.pdf');
const rootPdfPath = path.join(__dirname, '..', 'Sample_Questions_Guide.pdf');

const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync(publicPdfPath, Buffer.from(pdfOutput));
fs.writeFileSync(rootPdfPath, Buffer.from(pdfOutput));

console.log('✅ PDF sample created at:', publicPdfPath, 'and', rootPdfPath);

