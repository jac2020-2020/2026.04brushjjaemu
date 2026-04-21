const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const startStr = 'const translations = {';
const startIndex = html.indexOf(startStr);

if (startIndex !== -1) {
    const scriptEndIndex = html.indexOf('</script>', startIndex);
    if (scriptEndIndex !== -1) {
        const newHtml = html.substring(0, startIndex) + html.substring(scriptEndIndex);
        fs.writeFileSync('index.html', newHtml);
        console.log("Removed JS translation logic");
    } else {
        console.log("Could not find script end");
    }
} else {
    console.log("Could not find start index");
}