// @flow
import includes from 'lodash/includes';
import _switch from 'underscore-switch';

export default class FindStatement {
  constructor(query = {}) {
    if (typeof query === 'function') {

    } else if (typeof query === 'object') {
      for (const field in query) {
        if (includes(['$not', '$or'], field)) {
          Object.assign(this, {[field]: query[field]});
        } else {
          _switch(typeof query[field], [
            {
              case: ['number', 'string', 'boolean'],
              then: () => {
                Object.assign(this, {[field]: query[field]});
              },
            },
            {
              case: 'object',
              then: () => {
                if (query[field] === null) {
                  Object.assign(this, {[field]: query[field]});
                } else if (
                  query.$$structure && query.$$structure[field].type.isMaevaModel
                ) {
                  if (query[field]._id) {
                    Object.assign(this, {[field]: query[field]._id});
                  } else {
                    Object.assign(this, {[field]: query[field]});
                  }
                } else {
                  Object.assign(this, {[field]: this.parse(query[field])});
                }
              },
            },
          ]);
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
