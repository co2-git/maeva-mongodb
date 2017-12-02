/* global describe it before */
import should from 'should';
import * as data from 'maeva';

const model = data.model('findById', {foo: Number});

describe('Find by id', () => {
  let inserted;
  let found;
  before(async () => {
    try {
      inserted = await data.insertOne(model, {foo: 0});
      found = await data.findById(model, inserted);
    } catch (error) {
      throw error;
    }
  });
  it('should have found by id', () => {
    should(data.getDocumentId(found)).eql(data.getDocumentId(inserted));
  });
});
