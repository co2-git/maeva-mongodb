/* global describe it before */
import should from 'should';
import * as maeva from 'maeva';

const model = maeva.model('findMany', {foo: Number});

describe('Find many', () => {
  let result;
  before(async () => {
    try {
      await maeva.insertOne(model, {foo: 0});
      await maeva.insertOne(model, {foo: 1});
      await maeva.insertOne(model, {foo: 2});
      result = await maeva.findMany(model, {foo: 1});
    } catch (error) {
      throw error;
    }
  });
  it('should be an object', () => {
    should(result).be.an.Array();
  });
  // it('should have the expected fields', () => {
  //   should(result).have.property('foo').which.eql(1);
  // });
  // it('should have an _id', () => {
  //   should(result).have.property('_id');
  // });
});
