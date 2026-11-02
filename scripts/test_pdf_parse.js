const fs = require('fs');
const path = require('path');

async function testPdfParse() {
  const filePath = path.join(__dirname, '..', 'Sample_Questions_Guide.pdf');
  const buffer = fs.readFileSync(filePath);
  const blob = new Blob([buffer], { type: 'application/pdf' });

  const formData = new FormData();
  formData.append('file', blob, 'Sample_Questions_Guide.pdf');
  formData.append('grade', 'class-3');
  formData.append('subject', 'science');

  try {
    const res = await fetch('http://localhost:3000/api/questions/parse-pdf', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('PDF Parse Response:', data.success, 'Count:', data.count, 'Message:', data.message);
    if (data.questions && data.questions.length > 0) {
      console.log('Sample parsed Q1:', JSON.stringify(data.questions[0], null, 2));
    }
  } catch (err) {
    console.error('Error testing PDF parse:', err);
  }
}

testPdfParse();

