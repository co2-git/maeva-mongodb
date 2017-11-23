// @flow

export default class Projection {

  limit = 100;

  constructor(projection = {}) {
    if (('limit' in projection)) {
      this.limit = projection.limit;
    }
  }

}
