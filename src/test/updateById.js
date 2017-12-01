/* global describe it before */
import should from 'should';
import * as maeva from 'maeva';

const model = maeva.model('updateById', {foo: Number});

describe('Update By Id', () => {
  let inserted;
  let updated;
  before(async () => {
    try {
      inserted = await maeva.insertOne(model, {foo: 0});
      updated = await maeva.updateById(model, inserted, {foo: 1});
    } catch (error) {
      throw error;
    }
  });
  it('should be an object', () => {
    should(updated).be.an.Object();
  });
  it('should have the expected fields', () => {
    should(updated).have.property('foo').which.eql(1);
  });
});
