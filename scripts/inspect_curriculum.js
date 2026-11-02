const fs = require('fs');

// We can compile or read classWiseCurriculumData.ts directly using tsx or a simple regex
const content = fs.readFileSync('src/data/classWiseCurriculumData.ts', 'utf8');

// Count total questions
const questions = content.match(/"questionEnglish":/g) || [];
console.log('Total questionEnglish in file:', questions.length);

// Let's count by grade and subject by checking occurrences
const grades = ['nursery', 'class-1', 'class-2', 'class-3', 'class-4-5'];
for (const grade of grades) {
  const gradeIdx = content.indexOf(`"${grade}":`);
  const nextGradeIdx = grades.indexOf(grade) < grades.length - 1 ? content.indexOf(`"${grades[grades.indexOf(grade) + 1]}":`) : content.length;
  const gradeChunk = content.substring(gradeIdx, nextGradeIdx);
  
  console.log(`\nGrade: ${grade}`);
  const subs = ['mathsTopics', 'englishTopics', 'hindiTopics', 'scienceTopics', 'gkTopics'];
  for (const sub of subs) {
    const sIdx = gradeChunk.indexOf(`"${sub}":`);
    if (sIdx === -1) {
      console.log(`  ${sub}: 0 questions`);
      continue;
    }
    // find next sub
    let nextSIdx = gradeChunk.length;
    for (const other of subs) {
      if (other !== sub) {
        const oIdx = gradeChunk.indexOf(`"${other}":`, sIdx + 1);
        if (oIdx !== -1 && oIdx < nextSIdx) {
          nextSIdx = oIdx;
        }
      }
    }
    const subChunk = gradeChunk.substring(sIdx, nextSIdx);
    const count = (subChunk.match(/"questionEnglish":/g) || []).length;
    console.log(`  ${sub}: ${count} questions`);
  }
}

