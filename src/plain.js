const plain = (diff) => {
    const result = [];
    // PRINT VALUES
    const formatValue = (value) => {
        // INLAID VALUE
        if (typeof value === 'object' && value !== null) {
            return '[complex value]';
        }
        // FLAT VALUE
        return `${value}`;
    };
    // FORM LINES
    const process = (diff, path) => {
        diff.forEach((node) => {
            const { key, type, value, oldValue, newValue, children } = node;
            const fullPath = path ? `${path}.${key}` : key;
            switch (type) {
                case 'added':
                    result.push(`Property '${fullPath}' was added with value: ${formatValue(value)}`);
                    break;
                case 'removed':
                    result.push(`Property '${fullPath}' was removed`);
                    break;
                case 'changed':
                    result.push(`Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`);
                    break;
                case 'nested':
                    process(children, fullPath);
                    break;
                default:
                    break;
            }
        });
    };
    process(diff, '');
    return result.join('\n');
};

export default plain;