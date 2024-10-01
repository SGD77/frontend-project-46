import fs from 'fs';

const readFile = (filepath) => fs.readFileSync(filepath, 'UTF-8');

export default readFile;