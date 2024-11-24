import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (type) => {
  switch (type) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      return stylish;
  }
};

export default getFormatter;
