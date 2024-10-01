import * as path from 'path';

const parseFile = (file) => {
    if (path.extname(file) === '.json') {
        return JSON.parse(file);
    }
}

export default parseFile;

// console.log(parseFile('./fixtures/file1.json'))