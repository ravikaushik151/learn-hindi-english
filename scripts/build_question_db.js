const fs = require('fs');
const path = require('path');
const { allQuestions, DB_PATH } = require('./question_helpers');

const { loadNursery } = require('./questions_nursery');
const { loadClass1 } = require('./questions_class1');
const { loadClass2 } = require('./questions_class2');
const { loadClass3 } = require('./questions_class3');
const { loadClass45 } = require('./questions_class45');

console.log('Loading all class and subject tracks...');
loadNursery();
loadClass1();
loadClass2();
loadClass3();
loadClass45();

console.log(`Total questions loaded: ${allQuestions.length}`);

// Write to customQuestionsDb.json
const outputData = {
  totalQuestions: allQuestions.length,
  updatedAt: new Date().toISOString(),
  questions: allQuestions
};

fs.writeFileSync(DB_PATH, JSON.stringify(outputData, null, 2), 'utf8');
console.log(`Successfully wrote ${allQuestions.length} questions to ${DB_PATH}!`);

// Verify counts per grade and subject
const counts = {};
allQuestions.forEach(q => {
  const key = `${q.grade} | ${q.subject}`;
  counts[key] = (counts[key] || 0) + 1;
});

console.log('\nVerification of 50 questions per class & subject:');
Object.entries(counts).forEach(([track, count]) => {
  console.log(`  ${track}: ${count} questions`);
});

