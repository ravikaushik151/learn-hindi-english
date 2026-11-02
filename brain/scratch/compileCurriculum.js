const fs = require('fs');
const path = require('path');

const { nursery } = require('./dataNursery');
const { class1 } = require('./dataClass1');
const { class2 } = require('./dataClass2');
const { class3 } = require('./dataClass3');
const { class45 } = require('./dataClass45');

const curriculum = {
  nursery,
  'class-1': class1,
  'class-2': class2,
  'class-3': class3,
  'class-4-5': class45,
};

let totalQuestions = 0;
for (const gradeKey of Object.keys(curriculum)) {
  const g = curriculum[gradeKey];
  let gradeQs = 0;
  for (const t of [...g.mathsTopics, ...g.englishTopics, ...g.hindiTopics]) {
    gradeQs += t.quizQuestions.length;
  }
  console.log(`Grade: ${gradeKey} has ${gradeQs} questions`);
  totalQuestions += gradeQs;
}

console.log(`\n========================================`);
console.log(`TOTAL QUESTIONS ACROSS ALL GRADES: ${totalQuestions}`);
console.log(`========================================\n`);

const tsContent = `// Auto-generated 200+ Class-Wise Curriculum & Practice Questions
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
}

export const CLASS_WISE_CURRICULUM: Record<GradeLevel, GradeCurriculum> = ${JSON.stringify(curriculum, null, 2)};

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
    for (const t of [...g.mathsTopics, ...g.englishTopics, ...g.hindiTopics]) {
      count += t.quizQuestions.length;
    }
  }
  return count;
}
`;

const targetPath = path.resolve('src/data/classWiseCurriculumData.ts');
fs.writeFileSync(targetPath, tsContent, 'utf-8');
console.log(`Successfully written ${totalQuestions} questions to ${targetPath}`);

