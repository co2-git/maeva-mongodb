import {ObjectID} from 'mongodb';

const convertShape = (value, type) => {
  const shape = {};
  for (const key in value) {
    shape[key] = convertValue(value[key], type[key]);
  }
  return shape;
};

const convertArray = (value, type) =>
  value.map(item => convertValue(item, type));

const convertValue = (value, type) => {
  if (typeof type === 'string') {
    switch (type) {
    case 'string':
    case 'boolean':
    case 'number':
    case 'any':
      return value;
    case 'date':
      return new Date(value);
    case 'link':
      return new ObjectID(value);
    default:
      throw new Error(
        `maeva/mongodb/formatInsertQuery: unknown value type ${type}`
      );
    }
  }
  if (type.shape) {
    return convertShape(value, type.shape);
  }
  if (type.array) {
    return convertArray(value, type.array);
  }
};

export default convertValue;
