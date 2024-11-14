import _ from 'lodash';

// RETURNS AN OBJECT FOR EACH KEY IN TWO OBJECTS:
//{
//  key:
//  value:
//  type:
//  *children:
//  *oldValue:
//  *newValue:
// } 

const buildDiffList = (obj1, obj2) => {
    // get all keys, sorted
    const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
    // console.log(`${keys} - all keys sorted`);
    return keys.map((key) => {
        // added
        if (!(key in obj1)) {
          return { key, value: obj2[key], type: 'added' };
        }
        // deleted
        if (!(key in obj2)) {
          return { key, value: obj1[key], type: 'deleted' };
        }
        // nested
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
          return { key, children: buildDiffList(obj1[key], obj2[key]), type: 'nested' };
        }
        // changed
        if (obj1[key] !== obj2[key]) {
          const oldValue = JSON.stringify(obj1[key]);
          const newValue = JSON.stringify(obj2[key]);
          return { key, oldValue, newValue, type: 'changed' };
        }
        // unchanged
        return { key, value: obj1[key], type: 'unchanged' };
      });
    };
    
export default buildDiffList;