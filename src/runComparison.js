import buildDiffList from './buildDiffList.js';
import { getFullPath, readFile, getFileFormat } from './utils.js';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

const runComparison = (filepath1, filepath2, type) => {
  const format1 = getFileFormat(filepath1);
  const format2 = getFileFormat(filepath2);

  const content1 = readFile(getFullPath(filepath1));
  const content2 = readFile(getFullPath(filepath2));

  const parsedContent1 = parse(content1, format1);
  const parsedContent2 = parse(content2, format2);
  const diff = buildDiffList(parsedContent1, parsedContent2);
  const formatter = getFormatter(type);
  return formatter(diff);
};

export default runComparison;
