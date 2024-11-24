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

  test('stylish output', () => {
    expect(compare(json1Path, json2Path, 'stylish')).toBe(stylish);
    expect(compare(yaml1Path, yaml2Path, 'stylish')).toBe(stylish);
  });

  test('default output', () => {
    expect(compare(json1Path, json2Path)).toBe(stylish);
    expect(compare(yaml1Path, yaml2Path)).toBe(stylish);
  });

  test('plain output', () => {
    expect(compare(json1Path, json2Path, 'plain')).toBe(plain);
    expect(compare(yaml1Path, yaml2Path, 'plain')).toBe(plain);
  });

  test('json output', () => {
    expect(compare(json1Path, json2Path, 'json')).toBe(json);
    expect(compare(yaml1Path, yaml2Path, 'json')).toBe(json);
  });
});
