import _ from 'lodash';

// RETURNS A LIST (OBJ) FOR EACH KEY IN TWO OBJECTS:
// {
//  key:
//  value:
//  type:
//  *children:
//  *oldValue:
//  *newValue:
// }

const buildDiffList = (obj1, obj2) => {
  // get all keys, sorted
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!(key in obj1)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!(key in obj2)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: buildDiffList(obj1[key], obj2[key]), type: 'nested' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], type: 'changed',
      };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: 'unchanged' };
    }
    throw new Error();
  });
};

export default buildDiffList;
