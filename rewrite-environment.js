const fs = require('fs');

const now = new Date();
const buildDate = now.toISOString();

let environment = fs.readFileSync('./src/environments/environment.prod.ts', 'utf8');

environment = environment.replace(/buildDate: '.*'/, `buildDate: '${buildDate}'`);

fs.writeFileSync('./src/environments/environment.prod.ts', environment, 'utf8');

console.log(`Build date set to ${buildDate}`);
