/* global describe it before after */
import should from 'should';
import maeva, {Model} from 'maeva';
import connect from '../lib/connect';

class CountFoo extends Model {
  static schema = {foo: Number};
}

const documents = [
  {foo: 1},
  {foo: 2},
  {foo: 3},
  {foo: 4},
  {foo: 5},
  {foo: 6},
];

describe('Count (model)', () => {
  before(async () => {
    await maeva.connect(connect(process.env.MONGODB_URL));
    await CountFoo.insert(documents);
  });
  describe('Count without query', () => {
    let results;
    before(async () => {
      results = await CountFoo.count();
    });
    it('should be the right number', () => {
      should(results).eql(documents.length);
    });
  });
  describe('Count with query', () => {
    let results;
    before(async () => {
      results = await CountFoo.count({foo: 1});
    });
    it('should be the right number', () => {
      should(results).eql(1);
    });
  });
  describe('Count with meta-query', () => {
    let results;
    before(async () => {
      results = await CountFoo.count({foo: {$gt: 4}});
    });
    it('should be the right number', () => {
      should(results).eql(2);
    });
  });
  after(async () => {
    await CountFoo.remove();
  });
});
