import should from 'should';
import {EventEmitter} from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';
import find from '../lib/find';

const collection = `test-find-${Math.random()}-${Date.now()}`;

describe('Find', () => {
  let conn;
  before(async () => {
    conn = new EventEmitter();
    await connect(process.env.MONGODB_URL)(conn);
    await insert(conn, {
     collection,
     documents: [{foo: 1}, {foo: 2}],
   });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(find).be.a.Function();
    });
  });
  describe('Find', () => {
    describe('Empty query', () => {
      let results;
      before(async () => {
        results = await find(conn, {
          collection,
          query: {}
        });
      });
      it('should be an array of 2', () => {
        should(results).be.an.Array().and.have.length(2);
      });
    });
    describe('With query', () => {
      let results;
      before(async () => {
        results = await find(conn, {
          collection,
          query: {foo: 1}
        });
      });
      it('should be an array of 1', () => {
        should(results).be.an.Array().and.have.length(1);
      });
    });
  });
});
