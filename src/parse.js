import * as fs from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFullPath = (input) => path.resolve(__dirname, '..', input);

const parseFile = (filepath) => {
    const fullPath = getFullPath(filepath);
    if (path.extname(fullPath) === '.json') {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(fileContent);
    }
}

export default parseFile;

// console.log(parseFile('./fixtures/file1.json'))