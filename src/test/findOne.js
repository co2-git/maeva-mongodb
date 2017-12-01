/* global describe it before */
import should from 'should';
import * as data from 'maeva';

const model = data.model('findOne', {foo: Number});
const linkedModel = data.model('linkedFindOne', {
  name: String,
  foo: data.link(model)
});

describe('Find one', () => {
  let result;
  let linkedResult;
  let linked;
  before(async () => {
    try {
      await data.insertOne(model, {foo: 0});
      await data.insertOne(model, {foo: 1});
      linked = await data.insertOne(model, {foo: 2});
      await data.insertOne(linkedModel, {name: 'hello', foo: linked});
      result = await data.findOne(model, {foo: 1});
      linkedResult = await data.findOne(linkedModel, {foo: linked});
    } catch (error) {
      throw error;
    }
  });
  it('should be an object', () => {
    should(result).be.an.Object();
  });
  it('should have the expected fields', () => {
    should(result).have.property('foo').which.eql(1);
  });
  it('should have an _id', () => {
    should(result).have.property('_id');
  });
  it('should found lin', () => {
    should(linkedResult).have.property('foo').which.eql(linked._id);
  });
});
