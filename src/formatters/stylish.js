const stylish = (diff) => {
  const iter = (data, level) => {
    const printValue = (value, currentLevel) => {
      if (typeof value !== 'object' || value === null) {
        return String(value);
      }
      const entries = Object.entries(value)
        .map(([key, val]) => `${' '.repeat((currentLevel + 1) * 4)}${key}: ${printValue(val, currentLevel + 1)}`);
      return `{\n${entries.join('\n')}\n${' '.repeat(currentLevel * 4)}}`;
    };
    const indent = ' '.repeat(level * 4 - 2);
    const result = data.map((item) => {
      if (item.type === 'added') {
        return `${indent}+ ${item.key}: ${printValue(item.value, level)}`;
      }
      if (item.type === 'deleted') {
        return `${indent}- ${item.key}: ${printValue(item.value, level)}`;
      }
      if (item.type === 'changed') {
        return [
          `${indent}- ${item.key}: ${printValue(item.value1, level)}`,
          `${indent}+ ${item.key}: ${printValue(item.value2, level)}`,
        ].join('\n');
      }
      if (item.type === 'nested') {
        return [
          `${indent}  ${item.key}: {`,
          iter(item.children, level + 1),
          `${' '.repeat(level * 4)}}`,
        ].join('\n');
      }
      if (item.type === 'unchanged') {
        return `${indent}  ${item.key}: ${printValue(item.value, level)}`;
      }
      return '';
    });

    return result.join('\n');
  };
  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
