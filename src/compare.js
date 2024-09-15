import _ from 'lodash';

const compare = (obj1, obj2) => {
    // get all keys, sorted
    const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
    // console.log(`${keys} - all keys sorted`);
    const result = [];
    for (const key of keys) {
        // added
        if (!Object.hasOwn(obj1, key)) {
            result.push(`+ ${key}: ${obj2[key]}`);
            // deleted
        } else if (!Object.hasOwn(obj2, key)) {
            result.push(`+ ${key}: ${obj1[key]}`);
            // unchanged
        } else if (obj1[key] === obj2[key]) {
            result.push(`  ${key}: ${obj1[key]}`);
            // changed
        } else if (obj1[key] !== obj2[key]) {
            result.push(`- ${key}: ${obj1[key]}`);
            result.push(`+ ${key}: ${obj2[key]}`);
        } else {
            return "Error";
        }
    }
    return result.join('\n');
};

export default compare;