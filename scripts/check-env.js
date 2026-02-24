const fs = require('fs');
const content = fs.readFileSync('.env', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.trim() !== line) {
        console.log(`Line ${i + 1} has whitespace: "${line}"`);
    }
});
