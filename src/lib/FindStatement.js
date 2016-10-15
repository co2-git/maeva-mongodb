// @flow

import _ from 'lodash';

export default class FindStatement {
  constructor(query = {}) {
    for (const field in query) {
      if (_.includes(['$not', '$or'], field)) {
        if (Array.isArray(query[field])) {
          Object.assign(this, {[field]: query[field]});
        } else {
          Object.assign(this, {[field]: query[field]});
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
          } else if (query.$$structure && query.$$structure[field].type.isMaevaModel) {
            if (query[field]._id) {
              Object.assign(this, {[field]: query[field]._id});
            } else {
              Object.assign(this, {[field]: query[field]});
            }
          } else {
            Object.assign(this, {[field]: this.parse(query[field])});
          }
          break;
        }
      }
    }
  }
  parse(query = {}) {
    const parsed = {};
    for (const field in query) {
      if (field === '$not') {
        parsed.$ne = query.$not;
      } else if (field === '$between') {
        parsed.$lte = query.$between[0];
        parsed.$gte = query.$between[1];
      } else {
        parsed[field] = query[field];
      }
    }
    return parsed;
  }
}
