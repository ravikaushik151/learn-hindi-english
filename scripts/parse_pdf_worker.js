const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function extractText(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buffer });
    await parser.load();
    const result = await parser.getText();
    const text = typeof result === 'string' ? result : (result && result.text) ? result.text : '';
    process.stdout.write(JSON.stringify({ success: true, text }));
  } catch (err) {
    process.stdout.write(JSON.stringify({ success: false, error: err.message }));
  }
}

const targetFile = process.argv[2];
if (targetFile) {
  extractText(targetFile);
} else {
  process.stdout.write(JSON.stringify({ success: false, error: 'No file path provided' }));
}

