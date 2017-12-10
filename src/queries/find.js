import convertValue from './value';

const parseRegExp = pattern => {
  const flags = [];
  pattern = pattern.replace(/^\//, '');
  if (/\/$/.test(pattern)) {
    pattern = pattern.replace(/\/$/, '');
  } else {
    flags.push(pattern.replace(/^.+\/([a-z]+)$/, '$1'));
    pattern = pattern.replace(/\/([a-z]+)$/, '');
  }
  return new RegExp(pattern, flags);
};

const mapQueries = queries => queries.map(query => {
  if (query.or) {
    const orQueries = [];
    for (const orQuery of query.or) {
      orQueries.push(find(orQuery));
    }
    return {$or: orQueries};
  }
  const convertedValue = convertValue(query.value, query.type);
  switch (query.operator) {
  default: throw new Error(`Unkown operator ${query.operator}`);
  case 'above': return {[query.field]: {$gt: convertedValue}};
  case 'below': return {[query.field]: {$lt: convertedValue}};
  case 'in': return {[query.field]: {$in: convertedValue}};
  case 'is': return {[query.field]: convertedValue};
  case 'match': return {[query.field]: parseRegExp(convertedValue)};
  case 'not': return {[query.field]: {$ne: convertedValue}};
  case 'out': return {[query.field]: {$nin: convertedValue}};
  }
});

const find = (queries) => {
  const query = {};
  if (!queries.length) {
    return query;
  }
  query.$and = mapQueries(queries);
  return query;
};

export default find;
