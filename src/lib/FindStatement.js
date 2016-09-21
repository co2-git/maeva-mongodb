export default class FindStatement {
  constructor(query = {}) {
    for (const field in query) {
      if (field === '$not') {
        if (Array.isArray(query.$not)) {
          Object.assign(this, {[field]: query[field]});
        } else {
          Object.assign(this, {$not: query.$not});
        }
      } else {
        switch (typeof query[field]) {
        case 'number':
        case 'string':
        case 'boolean':
          Object.assign(this, {[field]: query[field]});
          break;
        case 'object':
          if (query[field] === null) {
            Object.assign(this, {[field]: query[field]});
          }
          Object.assign(this, {[field]: this.parse(query[field])});
          break;
        }
      }
    }
  }
  parse(query = {}) {
    for (const field in query) {
      if (field === '$not') {
        return {$ne: query.$not};
      }
    }
  }
}
