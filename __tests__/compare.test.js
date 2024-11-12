import compare from '../src/compareContent.js';
// import fs from 'fs';
import path from 'path'

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const fileContent = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

describe('compare function yaml', () => {
    test('flat yaml comparison', () => {
        const filepath1 = getPath('file1.yml');
        const filepath2 = getPath('file2.yml');

        const result = `{
          - follow: false
              host: hexlet.io
          - proxy: 123.234.53.22
          - timeout: 50
          + timeout: 20
          + verbose: true
        }`;

        expect(compare(filepath1, filepath2)).toBe(result);
    });
});

describe('compare function', () => {
    test('should return unchanged properties when both objects are identical', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n  b: 2`;

        expect(result).toBe(expected);
    });

    test('should handle added properties in obj2', () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 1, b: 2 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n+ b: 2`;

        expect(result).toBe(expected);
    });

    test('should handle deleted properties from obj1', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n+ b: 2`;

        expect(result).toBe(expected);
    });

    test('should handle changed properties between obj1 and obj2', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 3 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n- b: 2\n+ b: 3`;

        expect(result).toBe(expected);
    });

    test('should handle a mix of added, deleted, and changed properties', () => {
        const obj1 = { a: 1, b: 2, c: 3 };
        const obj2 = { a: 1, b: 3, d: 4 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n- b: 2\n+ b: 3\n+ c: 3\n+ d: 4`;

        expect(result).toBe(expected);
    });

});