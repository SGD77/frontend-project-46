// import * as path from 'path';
import readFile from "./readFile.js";

const parseFile = (file) => {
    // if (path.extname(file) === '.json') {
        return JSON.parse(readFile(file));
    // }
}

export default parseFile;