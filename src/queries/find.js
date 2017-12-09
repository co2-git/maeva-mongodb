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

const mapQueries = queries => queries.map(({field, operator, value, or}) => {
  if (or) {
    const orQueries = [];
    for (const orQuery of or) {
      orQueries.push(find(orQuery));
    }
    return {$or: orQueries};
  }
  switch (operator) {
  default: throw new Error(`Unkown operator ${operator}`);
  case 'above': return {[field]: {$gt: value}};
  case 'below': return {[field]: {$lt: value}};
  case 'in': return {[field]: {$in: value}};
  case 'is': return {[field]: value};
  case 'match': return {[field]: parseRegExp(value)};
  case 'not': return {[field]: {$ne: value}};
  case 'out': return {[field]: {$nin: value}};
  }
});

const find = (queries) => {
  const query = {};
  if (!queries.length) {
    return query;
  }
  query.$and = mapQueries(queries);
  // console.log(require('util').inspect({query}, {depth: null}));
  return query;
};

export default find;
