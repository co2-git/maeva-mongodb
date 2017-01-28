/* global describe it before after */
import should from 'should';
import maeva, {Model} from 'maeva';
import connect from '../lib/connect';

class UpdateFoo extends Model {
  static schema = {foo: Number, id: Number};
}

const documents = [
  {id: 1, foo: 1},
  {id: 2, foo: 2},
  {id: 3, foo: 3},
  {id: 4, foo: 4},
  {id: 5, foo: 5},
  {id: 6, foo: 6},
];

describe('Update', () => {
  before(async () => {
    await maeva.connect(connect(process.env.MONGODB_URL));
    await UpdateFoo.insert(documents);
  });
  describe('Update all', () => {
    let results, found;
    before(async () => {
      results = await UpdateFoo.update({id: 1}, {foo: 2});
      found = await UpdateFoo.findOne({id: 1});
    });
    it('should be an array', () => {
      should(results).be.an.Array().and.have.length(1);
    });
    it('should have the expected fields', () => {
      should(results[0]).have.property('id').which.eql(1);
      should(results[0]).have.property('foo').which.eql(2);
      should(found).have.property('id').which.eql(1);
      should(found).have.property('foo').which.eql(2);
    });
  });
  after(async () => {
    await UpdateFoo.remove();
  });
});
