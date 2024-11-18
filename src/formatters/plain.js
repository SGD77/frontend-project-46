const plain = (diff) => {

    const printValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return '[complex value]';
        };
        if (typeof value === 'string') {
            return `'${String(value)}'`;
        }
        return String(value);
    };

    const iter = (data, path = '') => {
        const result = data
            .filter((item) => item.type !== 'unchanged')
            .map((item) => {
                const currentProp = path ? `${path}.${item.key}` : item.key;
                switch (item.type) {
                    case 'added':
                        return `Property '${currentProp}' was added with value: ${printValue(item.value)}`;
                    case 'deleted':
                        return `Property '${currentProp}' was removed`;
                    case 'changed':
                        return `Property '${currentProp}' was updated. From ${printValue(item.oldValue)} to ${printValue(item.newValue)}`;
                    case 'nested':
                        return iter(item.children, currentProp);
                };
            })
        return result.join('\n')
    };
    return `\n${iter(diff)}\n`;
};

export default plain;