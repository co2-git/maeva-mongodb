import should from 'should';
import {EventEmitter} from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';
import update from '../lib/update';

const collection = `test-update-${Math.random()}-${Date.now()}`;

describe('Update', () => {
  let conn;
  before(async () => {
    conn = new EventEmitter();
    await connect(process.env.MONGODB_URL)(conn);
    await insert(conn, {
     collection,
     documents: [
       {foo: 1, boo: true},
       {foo: 2, boo: true},
     ],
   });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(update).be.a.Function();
    });
  });
  describe('Update', () => {
    describe('Update with query', () => {
      let results;
      before(async () => {
        results = await update(conn, {
          collection,
          get: {foo: 1},
          set: {foo: 3},
        });
      });
      it('should have modified 1', () => {
        should(results).be.an.Object()
          .and.have.property('modifiedCount')
          .which.eql(1);
      });
    });
  });
});
