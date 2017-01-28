/* global describe it before after */
import should from 'should';
import maeva, {Model} from 'maeva';
import connect from '../lib/connect';

class FindFoo extends Model {
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

describe('Find', () => {
  before(async () => {
    await maeva.connect(connect(process.env.MONGODB_URL));
    await FindFoo.insert(documents);
  });
  describe('Find without query', () => {
    let results;
    before(async () => {
      results = await FindFoo.find();
    });
    it('should be the right number', () => {
      should(results.length).eql(documents.length);
    });
  });
  describe('Find with query', () => {
    let results;
    before(async () => {
      results = await FindFoo.find({foo: 1});
    });
    it('should be the right number', () => {
      should(results.length).eql(1);
    });
  });
  describe('Find with meta-query', () => {
    let results;
    before(async () => {
      results = await FindFoo.find({foo: {$gt: 4}});
    });
    it('should be the right number', () => {
      should(results.length).eql(2);
    });
  });
  describe('Find with no matche', () => {
    let results;
    before(async () => {
      results = await FindFoo.find({foo: 100});
    });
    it('should be the right number', () => {
      should(results.length).eql(0);
    });
  });
  after(async () => {
    await FindFoo.remove();
  });
});
