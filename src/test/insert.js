import should from 'should';
import {EventEmitter} from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';

describe('Insert', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(insert).be.a.Function();
    });
  });
  describe('Insert', () => {
    let conn;
    before(async () => {
      conn = new EventEmitter();
      await connect(process.env.MONGODB_URL)(conn);
    });
    describe('Insert one', () => {
      let results;
      before(async () => {
        results = await insert(conn, {
          collection: 'test-insert',
          documents: {foo: 1}
        });
      });
      it('should be an object', () => {
        should(results).be.an.Object();
      });
      it('should have the expected fields', () => {
        should(results).have.property('foo').which.eql(1);
      });
    });
    describe('Insert many', () => {
      let results;
      before(async () => {
        results = await insert(conn, {
          collection: 'test-insert',
          documents: [{foo: 2}, {foo: 3}],
        });
      });
      it('should be an array', () => {
        should(results).be.an.Array().and.have.length(2);
      });
      it('should have the expected fields', () => {
        should(results[0]).have.property('foo').which.eql(2);
        should(results[1]).have.property('foo').which.eql(3);
      });
    });
  });
});
