import compareContent from "./compareContent.js";
import getFullPath from "./getFullPath.js";
// import readFile from "./readFile.js";
import parseFile from "./parseFile.js";

const runComparison = (file1, file2) => {
    const parsedContent1 = parseFile(getFullPath(file1));
    const parsedContent2 = parseFile(getFullPath(file2));
    // const parsedContent2 = parseFile(fileContent2);
    return compareContent(parsedContent1, parsedContent2);
};

// const f1 = {
//     "host": "hexlet.io",
//     "timeout": 50,
//     "proxy": "123.234.53.22",
//     "follow": false
// };

// const f2 = {
//     "timeout": 20,
//     "verbose": true,
//     "host": "hexlet.io"
// }

// console.log(runComparison('../fixtures/file1.json','../fixtures/file2.json'))

export default runComparison;