/* global describe it before */
import should from 'should';
import maeva, {Model} from 'maeva';
import connect from '../lib/connect';

class InsertFoo extends Model {
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

describe('Insert', () => {
  before(async () => {
    await maeva.connect(connect(process.env.MONGODB_URL));
  });
  describe('Insert', () => {
    let conn;
    describe('Insert one', () => {
      let results;
      before(async () => {
        results = await InsertFoo.insert({foo: 0});
      });
      it('should be an object', () => {
        should(results).be.an.Object();
      });
      it('should have the expected fields', () => {
        should(results).have.property('foo').which.eql(0);
      });
    });
    describe('Insert many', () => {
      let results;
      before(async () => {
        results = await InsertFoo.insert(documents);
      });
      it('should be an array', () => {
        should(results).be.an.Array().and.have.length(documents.length);
      });
      it('should have the expected fields', () => {
        should(results[0]).have.property('foo').which.eql(1);
        should(results[1]).have.property('foo').which.eql(2);
        should(results[2]).have.property('foo').which.eql(3);
        should(results[3]).have.property('foo').which.eql(4);
        should(results[4]).have.property('foo').which.eql(5);
        should(results[5]).have.property('foo').which.eql(6);
      });
    });
  });
});
