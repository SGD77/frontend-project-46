import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compare from '../src/runComparison.js';
import { readFile } from '../src/utils.js';

const getPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

describe('output tests', () => {
  const json1Path = getPath('file1.json');
  const json2Path = getPath('file2.json');
  const yaml1Path = getPath('file1.yaml');
  const yaml2Path = getPath('file2.yaml');
  const stylishPath = getPath('stylish.ini');
  const plainPath = getPath('plain.ini');
  const jsonPath = getPath('json.ini');
  const stylish = readFile(stylishPath);
  const plain = readFile(plainPath);
  const json = readFile(jsonPath);

  test.each([
    ['stylish', stylish, json1Path, json2Path],
    ['stylish', stylish, yaml1Path, yaml2Path],
    [undefined, stylish, json1Path, json2Path],
    [undefined, stylish, yaml1Path, yaml2Path],
    ['plain', plain, json1Path, json2Path],
    ['plain', plain, yaml1Path, yaml2Path],
    ['json', json, json1Path, json2Path],
    ['json', json, yaml1Path, yaml2Path],
  ])('outputs corresponding format for each option', (format, expected, path1, path2) => {
    expect(compare(path1, path2, format)).toBe(expected);
  });
});
