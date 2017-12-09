const updateQuery = queries => {
  const query = {};
  for (const {field, operator, value} of queries) {
    switch (operator) {
    case 'set':
      if (!query.$set) {
        query.$set = {};
      }
      query.$set[field] = value;
      break;
    case 'add':
      if (!query.$inc) {
        query.$inc = {};
      }
      query.$inc[field] = value;
      break;
    case 'subtract':
      if (!query.$inc) {
        query.$inc = {};
      }
      query.$inc[field] = -value;
      break;
    case 'multiply':
      if (!query.$mul) {
        query.$mul = {};
      }
      query.$mul[field] = value;
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
