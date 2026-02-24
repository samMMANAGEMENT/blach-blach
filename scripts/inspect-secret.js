const fs = require('fs');
const content = fs.readFileSync('.env', 'utf8');
const lines = content.split('\n');
const secretLine = lines.find(l => l.includes('WOMPI_INTEGRITY_SECRET'));
if (secretLine) {
    const value = secretLine.split('=')[1];
    console.log(`Value: "${value}"`);
    console.log(`Length: ${value.length}`);
    for (let i = 0; i < value.length; i++) {
        console.log(`Char at ${i}: ${value.charCodeAt(i)} ('${value[i]}')`);
    }
} else {
    console.log("Secret line not found");
}
