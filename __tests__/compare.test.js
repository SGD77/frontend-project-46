// import _ from 'lodash';
import compare from '../src/compare.js';

describe('compare function', () => {
    test('unchanged', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n  b: 2`;

        expect(result).toBe(expected);
    });

    test('added in obj2', () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 1, b: 2 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n+ b: 2`;

        expect(result).toBe(expected);
    });

    test('deleted from obj2', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n+ b: 2`;

        expect(result).toBe(expected);
    });

    test('changed in obj2', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 3 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n- b: 2\n+ b: 3`;

        expect(result).toBe(expected);
    });

    test('unchanged, changed, added, deleted', () => {
        const obj1 = { a: 1, b: 2, c: 3 };
        const obj2 = { a: 1, b: 3, d: 4 };

        const result = compare(obj1, obj2);
        const expected = `  a: 1\n- b: 2\n+ b: 3\n+ c: 3\n+ d: 4`;

        expect(result).toBe(expected);
    });
});
