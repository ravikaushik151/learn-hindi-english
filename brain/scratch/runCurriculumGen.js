const fs = require('fs');
const path = require('path');

const targetFilePath = path.resolve('src/data/classWiseCurriculumData.ts');

// We will construct the complete TypeScript module code
// Let's create an external generator that writes the file cleanly.
const script = `
const fs = require('fs');
const path = require('path');

const target = path.resolve('src/data/classWiseCurriculumData.ts');

const tsHeader = \`export type GradeLevel = 'nursery' | 'class-1' | 'class-2' | 'class-3' | 'class-4-5';

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
\`;
`;

fs.writeFileSync(path.resolve('brain/scratch/buildAll.js'), script);

