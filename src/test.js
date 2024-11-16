const output = (diff, level = 1) => {
    
    const printValue = (value) => {
        if (typeof value !== 'object') {
            return String(value);
        }
        const entries = Object.entries(value)
            .map(([key, value]) => {
                return `${key.toUpperCase()}: ${printValue(value)}`
            })
        return `{\n${entries.join('\n')}\n}`
    };
    
    const indent =(' ').repeat(level * 4 - 2);
    const closingBraceIndent =(' ').repeat(level * 4);

    const result = diff.map((item) => {
        if (item.type === 'added') {
            return `${indent}+ ${item.key}: ${printValue(item.value)}`
        }
        if (item.type === 'deleted') {
            return `${indent}- ${item.key}: ${printValue(item.value)}`
        }
        if (item.type === 'changed') {
            return [
                `${indent}- ${item.key}: ${printValue(item.oldValue)}`,
                `${indent}+ ${item.key}: ${printValue(item.newValue)}`
            ].join('\n');
        }
        if (item.type === 'nested') {
            return [
                `${indent}  ${item.key}: {`,
                `${output(item.children, level + 1)}`,
                `${closingBraceIndent}}`
            ]
            .join('\n');
        }
    })
    return result.join('\n');
};
//=====================================================


const list = [
    {
        "key": "setting1",
        "value": "unchanged",
        "type": "deleted"
    },
    {
        "key": "setting2",
        "value": "Value 1",
        "type": "added"
    },
    {
        "key": "setting3",
        "value": 200,
        "type": "deleted"
    },
    {
        "key": "setting4",
        "oldValue": true,
        "newValue": false,
        "type": "changed"
    },
    {
        "key": "setting5",
        "children": [
            {
                "key": "child1",
                "children": [
                    {
                        "key": "grandchild1",
                        "oldValue": "",
                        "newValue": "wow",
                        "type": "changed"
                    }
                ],
                "type": "nested"
            },
            {
                "key": "child2",
                "value": "value",
                "type": "added"
            }
        ],
        "type": "nested"
    }
]

const a = {
    "setting2": 200,
    "setting3": true,
    "setting6": {
        "doge": {
            "wow": ""
        }
    },
    "group1": "unchanged"
};

const b = [{
    "key": "group1",
    "value": "unchanged",
    "type": "deleted"
},
{
    "key": "setting1",
    "value": "Value 1",
    "type": "added"
},
{
    "key": "setting2",
    "value": 200,
    "type": "deleted"
},
{
    "key": "setting3",
    "oldValue": true,
    "newValue": false,
    "type": "changed"
},
{
    "key": "setting6",
    "children": [
        {
            "key": "doge",
            "children": [
                {
                    "key": "wow",
                    "oldValue": "",
                    "newValue": "wow",
                    "type": "changed"
                }
            ],
            "type": "nested"
        },
        {
            "key": "key",
            "value": "value",
            "type": "added"
        }
    ],
    "type": "nested"
}];

const s = '"setting2": 200,'
const o = {
    "setting2": 200,
    "setting3": true,
    "setting6": {
        "doge": {
            "wow": "x"
        }
    },
}

// console.log(printValue(Object.entries(o)))
console.log(output(list));
// console.log(indent(3))