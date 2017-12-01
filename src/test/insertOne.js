/* global describe it before */
import should from 'should';
import * as maeva from 'maeva';

const model = maeva.model('insertOne', {foo: Number});

describe('Insert one', () => {
  let result;
  before(async () => {
    try {
      result = await maeva.insertOne(model, {foo: 0});
    } catch (error) {
      throw error;
    }
  });
  it('should be an object', () => {
    should(result).be.an.Object();
  });
  it('should have the expected fields', () => {
    should(result).have.property('foo').which.eql(0);
  });
  it('should have an _id', () => {
    should(result).have.property('_id');
  });
});
