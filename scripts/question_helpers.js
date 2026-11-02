const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'customQuestionsDb.json');

function makeQ(id, grade, subject, qEng, qHin, visual, correct, wrong1, wrong2, wrong3, expEng, expHin) {
  const opts = [correct, wrong1, wrong2, wrong3];
  const shuffled = [...opts].sort(() => 0.5 - Math.random());
  return {
    id,
    grade,
    subject,
    questionEnglish: qEng,
    questionHindi: qHin,
    visual,
    options: shuffled,
    correctAnswer: correct,
    explanationEnglish: expEng || `Awesome! The correct answer is ${correct}.`,
    explanationHindi: expHin || `शाबाश! सही उत्तर है: ${correct}।`,
    source: 'Curriculum Master Bank',
    createdAt: Date.now(),
  };
}

const allQuestions = [];

// ==========================================
// BUILDER FUNCTION FOR CURRICULUM QUESTIONS
// ==========================================
function buildTrack(grade, subject, rawList) {
  rawList.forEach((item, index) => {
    const id = `q-${grade}-${subject}-${index + 1}`;
    const [qEng, qHin, visual, correct, w1, w2, w3, expEng, expHin] = item;
    allQuestions.push(makeQ(id, grade, subject, qEng, qHin, visual, correct, w1, w2, w3, expEng, expHin));
  });
}

// Module export or main runner
module.exports = { makeQ, buildTrack, allQuestions, DB_PATH };

