import * as path from 'path';

const getFullPath = (input) => path.resolve(process.cwd(), input);

export default getFullPath;