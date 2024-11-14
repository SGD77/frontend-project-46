import compare from '../src/compareContent.js';
import path from 'path';

// const fileContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

describe('main test', () => {
    const getPath = (filename) => pa.jsonth.join(__dirname, '..', '__fixtures__', filename);

    const json1Path = getPath('file1.json');
    const json2Path = getPath('file2.json');
    const yaml1Path = getPath('file1.yaml');
    const yaml2Path = getPath('file2.yaml');

