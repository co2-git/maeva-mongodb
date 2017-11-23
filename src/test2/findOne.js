/* global describe it before after */
import should from 'should';
import maeva, {Model} from 'maeva';
import connect from '../lib/connect';

class FindOneFoo extends Model {
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

describe('Find One', () => {
  before(async () => {
    await maeva.connect(connect(process.env.MONGODB_URL));
    await FindOneFoo.insert(documents);
  });
  describe('Find one without query', () => {
    let results;
    before(async () => {
      results = await FindOneFoo.findOne();
    });
    it('should find one', () => {
      should(results).be.an.Object();
      should(results).have.property('foo').which.eql(1);
    });
  });
  describe('Find one with query', () => {
    let results;
    before(async () => {
      results = await FindOneFoo.findOne({foo: 2});
    });
    it('should find one', () => {
      should(results).be.an.Object();
      should(results).have.property('foo').which.eql(2);
    });
  });
  describe('Find one with meta-query', () => {
    let results;
    before(async () => {
      results = await FindOneFoo.findOne({foo: {$gt: 4}});
    });
    it('should be the right number', () => {
      should(results).be.an.Object();
      should(results).have.property('foo').which.eql(5);
    });
  });
  describe('Find one with no match', () => {
    let results;
    before(async () => {
      results = await FindOneFoo.findOne({foo: 100});
    });
    it('should be the right number', () => {
      should(results).be.undefined();
    });
  });
  after(async () => {
    await FindOneFoo.remove();
  });
});
