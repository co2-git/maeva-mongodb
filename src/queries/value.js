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

const convertMixed = (value, types) => {
  let type;
  for (type of types) {
    if (
      (type === 'string' && typeof value === 'string') ||
      (type === 'number' && typeof value === 'number') ||
      (type === 'boolean' && typeof value === 'boolean')
    ) {
      return convertValue(value, type);
    }
  }
  return convertValue(value, type);
};

const convertValue = (value, type) => {
  if (typeof type === 'string') {
    switch (type) {
    case 'string':
    case 'boolean':
    case 'number':
    case 'any':
    case 'null':
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
  if (type.mixed) {
    return convertMixed(value, type.mixed);
  }
};

export default convertValue;
