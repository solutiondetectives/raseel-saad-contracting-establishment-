const fs = require('fs');

try {
  console.log("Reading XML file...");
  const xml = fs.readFileSync('temp_docx/word/document.xml', 'utf8');
  console.log("XML file read length:", xml.length);
  const blocks = xml.split('</w:p>');
  const txt = blocks.map(b => {
    const m = b.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
    return m.map(t => t.replace(/<[^>]+>/g, '')).join('');
  }).filter(t => t.trim().length > 0)
    .join('\n');
  
  const decoded = txt
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

  console.log("Extracted text length:", decoded.length);
  fs.writeFileSync('seo_strategy.txt', decoded);
  console.log("Successfully wrote seo_strategy.txt");
} catch (e) {
  console.error("Error running script:", e);
}
