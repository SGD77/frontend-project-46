import buildDiffList from "./buildDiffList.js";
import { getFullPath, readFile, getFileFormat } from "./utils.js";
import parseFile from "./parseFile.js";

const runComparison = (filepath1, filepath2) => {
    const format1 = getFileFormat(filepath1);
    const format2 = getFileFormat(filepath2);

    const content1 = readFile(getFullPath(filepath1));
    const content2 = readFile(getFullPath(filepath2));

    const parsedContent1 = parseFile(content1, format1);
    const parsedContent2 = parseFile(content2, format2);
    return buildDiffList(parsedContent1, parsedContent2);
};

export default runComparison;

// console.log(runComparison('../__fixtures__/file1.json', '../__fixtures__/file2.json'))
console.log(runComparison('../__fixtures__/file1.yml', '../__fixtures__/file2.yml'))