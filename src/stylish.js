const stylish = (diff) => {
    const iter = (data, level) => {
        const printValue = (value, currentLevel) => {
            if (typeof value !== 'object' || value === null) {
                return String(value);
            }
            const entries = Object.entries(value)
                .map(([key, val]) => {
                    return `${' '.repeat(currentLevel * 4)}${key}: ${printValue(val, currentLevel + 1)}`;
                });
            return `{\n${entries.join('\n')}\n${' '.repeat((currentLevel - 1) * 4)}}`;
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
                    `${indent}- ${item.key}: ${printValue(item.oldValue, level)}`,
                    `${indent}+ ${item.key}: ${printValue(item.newValue, level)}`,
                ].join('\n');
            }
            if (item.type === 'nested') {
                return [
                    `${indent}  ${item.key}: {`,
                    iter(item.children, level + 1),
                    `${' '.repeat(level * 4)}}`,
                ].join('\n');
            }
        });

        return result.join('\n');
    };

    return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;

// const list = [
//     {
//       "key": "group1",
//       "value": "unchanged",
//       "type": "deleted"
//     },
//     {
//       "key": "setting1",
//       "value": "Value 1",
//       "type": "added"
//     },
//     {
//       "key": "setting2",
//       "value": 200,
//       "type": "deleted"
//     },
//     {
//       "key": "setting3",
//       "oldValue": true,
//       "newValue": false,
//       "type": "changed"
//     },
//     {
//       "key": "setting6",
//       "children": [
//         {
//           "key": "doge",
//           "children": [
//             {
//               "key": "wow",
//               "oldValue": "",
//               "newValue": "wow",
//               "type": "changed"
//             }
//           ],
//           "type": "nested"
//         },
//         {
//           "key": "key",
//           "value": "value",
//           "type": "added"
//         }
//       ],
//       "type": "nested"
//     }
//   ]

// console.log(stylish(list))