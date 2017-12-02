/* global describe it before */
import should from 'should';
import * as maeva from 'maeva';

const model = maeva.model('insertMany', {foo: Number});

describe('Insert many', () => {
  let results;
  before(async () => {
    try {
      results = await maeva.insertMany(model, [
        {foo: 0},
        {foo: 1},
        {foo: 2}
      ]);
    } catch (error) {
      throw error;
    }
  });
  it('should be an array', () => {
    should(results).be.an.Array();
  });
});
