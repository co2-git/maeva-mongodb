/* global describe it before */
import should from 'should';
import * as maeva from 'maeva';

const model = maeva.model('findMany', {foo: Number});

describe('Find many', () => {
  let results;
  before(async () => {
    try {
      await maeva.insertOne(model, {foo: 0});
      await maeva.insertOne(model, {foo: 1});
      await maeva.insertOne(model, {foo: 2});
      results = await maeva.findMany(model, {foo: 1});
    } catch (error) {
      throw error;
    }
  });
  it('should be an array', () => {
    should(results).be.an.Array();
  });
  it('should have the expected fields', () => {
    should(results[0]).have.property('foo');
  });
  it('should have an _id', () => {
    should(results[0]).have.property('_id');
  });
});
