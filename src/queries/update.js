import convertValue from './value';

const updateQuery = queries => {
  const query = {};
  for (const {field, operator, value, type} of queries) {
    const convertedValue = convertValue(value, type);
    switch (operator) {
    case 'set':
      if (!query.$set) {
        query.$set = {};
      }
      query.$set[field] = convertedValue;
      break;
    case 'add':
      if (!query.$inc) {
        query.$inc = {};
      }
      query.$inc[field] = convertedValue;
      break;
    case 'subtract':
      if (!query.$inc) {
        query.$inc = {};
      }
      query.$inc[field] = -convertedValue;
      break;
    case 'multiply':
      if (!query.$mul) {
        query.$mul = {};
      }
      query.$mul[field] = convertedValue;
      break;
    case 'divide':
      throw new Error(
        'Divide updater not yet available in this version of maeva-mongodb.' +
        ' Support coming soon!'
      );
    }
  }
  return query;
};

export default updateQuery;
