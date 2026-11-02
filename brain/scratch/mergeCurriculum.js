const fs = require('fs');
const path = require('path');

const curriculumPath = path.resolve('src/data/classWiseCurriculumData.ts');
let code = fs.readFileSync(curriculumPath, 'utf8');

const sciGkData = JSON.parse(fs.readFileSync(path.resolve('brain/scratch/scienceAndGkData.json'), 'utf8'));

// 1. Update interface GradeCurriculum to include scienceTopics and gkTopics
code = code.replace(
  `export interface GradeCurriculum {
  id: GradeLevel;
  gradeLabelEnglish: string;
  gradeLabelHindi: string;
  ageRange: string;
  color: string;
  englishTopics: CurriculumTopic[];
  hindiTopics: CurriculumTopic[];
  mathsTopics: CurriculumTopic[];
}`,
  `export interface GradeCurriculum {
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
}`
);

// 2. We can insert scienceTopics and gkTopics into each grade block
// In nursery, class-1, class-2, class-3, class-4-5:
// Notice each grade block ends before the next grade or before the closing `};` of CLASS_WISE_CURRICULUM.
const grades = ['nursery', 'class-1', 'class-2', 'class-3', 'class-4-5'];

for (let i = 0; i < grades.length; i++) {
  const g = grades[i];
  const nextG = grades[i + 1];
  const sciGk = sciGkData[g];

  const markerBefore = nextG ? `  "${nextG}": {` : `};\n\n// Helper to determine default GradeLevel`;

  // We want to insert `scienceTopics: ..., gkTopics: ...,` before the closing of grade g
  // In `classWiseCurriculumData.ts`, each grade ends with `    ]\n  },` (or `    ]\n  }\n};`)
  // Let's locate `"${g}": {` and then find the ending bracket before markerBefore.
  const startIdx = code.indexOf(`"${g}": {`);
  if (startIdx === -1) {
    console.error(`Could not find "${g}": {`);
    process.exit(1);
  }
  const nextIdx = code.indexOf(markerBefore, startIdx);
  if (nextIdx === -1) {
    console.error(`Could not find markerBefore for ${g}: ${markerBefore}`);
    process.exit(1);
  }

  // Look for the last `]` before nextIdx (which closes hindiTopics array)
  const lastBracket = code.lastIndexOf(']', nextIdx);
  const jsonSci = JSON.stringify(sciGk.scienceTopics, null, 6);
  const jsonGk = JSON.stringify(sciGk.gkTopics, null, 6);

  const insertText = `,\n    "scienceTopics": ${jsonSci},\n    "gkTopics": ${jsonGk}`;

  code = code.slice(0, lastBracket + 1) + insertText + code.slice(lastBracket + 1);
}

// 3. Update getTotalCurriculumQuestionsCount
code = code.replace(
  `for (const t of [...g.mathsTopics, ...g.englishTopics, ...g.hindiTopics]) {`,
  `for (const t of [...g.mathsTopics, ...g.englishTopics, ...g.hindiTopics, ...(g.scienceTopics || []), ...(g.gkTopics || [])]) {`
);

fs.writeFileSync(curriculumPath, code, 'utf8');
console.log('Successfully updated classWiseCurriculumData.ts with Science & GK topics!');

