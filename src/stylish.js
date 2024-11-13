const stylish = (diff, depth = 1) => {
    //CALCULATE INDENT DEPTH
  const defaultIndent = 4;
  const typeTagOffset = 2;
  const indent = ' '.repeat(depth * defaultIndent - typeTagOffset);
  const childIndent = ' '.repeat((depth + 1) * defaultIndent - typeTagOffset);
    // PRINT VALUES
  const printValue = (value, depth) => {
    // FLAT VALUE
    if (typeof value !== 'object' || value === null) {
      return String(value);
    }
    // INLAID VALUE
    const entries = Object.entries(value).map(([key, val]) => `${childIndent}  ${key}: ${printValue(val, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${indent}  }`;
  };
    // FORM LINES
  const result = diff.map(node => {
    const { key, type, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'nested':
        return `${indent}  ${key}: {\n${stylish(children, depth + 1)}\n${indent}  }`;

      case 'added':
        return `${indent}+ ${key}: ${printValue(value, depth)}`;

      case 'deleted':
        return `${indent}- ${key}: ${printValue(value, depth)}`;

      case 'changed':
        return [
          `${indent}- ${key}: ${printValue(oldValue, depth)}`,
          `${indent}+ ${key}: ${printValue(newValue, depth)}`
        ].join('\n');

      case 'unchanged':
        return `${indent}  ${key}: ${printValue(value, depth)}`;

      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return result.join('\n');
};

export default stylish;