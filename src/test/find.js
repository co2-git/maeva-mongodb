import should from 'should';
import {EventEmitter} from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';
import find from '../lib/find';

describe.only('Find', () => {
  let conn;
  before(async () => {
    conn = new EventEmitter();
    await connect(process.env.MONGODB_URL)(conn);
    await insert(conn, {
     collection: 'test-find',
     documents: [{foo: 1}, {foo: 2}],
   });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(find).be.a.Function();
    });
  });
  describe('Find', () => {
    describe('Find many', () => {
      describe('Empty query', () => {
        let results;
        before(async () => {
          results = await find(conn, {
            collection: 'test-find',
            documents: {}
          });
        });
        it('should be an object', () => {
          should(results).be.an.Object();
        });
      });
    });
  });
});
