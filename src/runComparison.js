import compareContent from "./compareContent.js";
import getFullPath from "./getFullPath.js";
import readFile from "./readFile.js";
import parseFile from "./parseFile.js";

const runComparison = (file1, file2) => {
const fileContent1 = readFile(getFullPath(file1));
const fileContent2 = readFile(getFullPath(file2));
const parsedContent1 = parseFile(fileContent1);
const parsedContent2 = parseFile(fileContent2);
return compareContent(parsedContent1, parsedContent2);
};

export default runComparison;