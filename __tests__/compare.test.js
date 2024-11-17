import compare from '../src/runComparison.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// const fileContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

describe('output tests', () => {
    const getPath = (filename) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        return path.join(__dirname, '..', '__fixtures__', filename);
    };


    const json1Path = getPath('file1.json');
    const json2Path = getPath('file2.json');
    const yaml1Path = getPath('file1.yaml');
    const yaml2Path = getPath('file2.yaml');
    const path1 = getPath('1.json');
    const path2 = getPath('2.json');

    const stylish = `
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

const short = `
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
}`

    test('stylish output', () => {
        expect(compare(json1Path, json2Path)).toBe(stylish)
        expect(compare(yaml1Path, yaml2Path)).toBe(stylish)
    })
    // test('short output', () => {
    //     expect(compare(path1, path2)).toBe(short)
    // })
});