import * as path from 'path';
import fs from 'fs';

// GET PATH
const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

// READ CONTENT
const readFile = (filepath) => fs.readFileSync(filepath, 'UTF-8');

// GET FORMAT
const getFileFormat = (filepath) => path.extname(filepath);

export { getFullPath, readFile, getFileFormat };
