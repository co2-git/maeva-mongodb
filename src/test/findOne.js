import should from 'should';
import {EventEmitter} from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';
import findOne from '../lib/findOne';

const collection = `test-findOne-${Math.random()}-${Date.now()}`;

describe('Find One', () => {
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
      should(findOne).be.a.Function();
    });
  });
  describe('Find one', () => {
    describe('Empty query', () => {
      let results;
      before(async () => {
        results = await findOne(conn, {
          collection,
          query: {}
        });
      });
      it('should be an object', () => {
        should(results).be.an.Object().and.not.be.an.Array();
      });
      it('should be the first document', () => {
        should(results).have.property('foo').which.eql(1);
      });
    });
    describe('With query', () => {
      let results;
      before(async () => {
        results = await findOne(conn, {
          collection,
          query: {foo: 2}
        });
      });
      it('should be an object', () => {
        should(results).be.an.Object().and.not.be.an.Array();
      });
      it('should be the matching document', () => {
        should(results).have.property('foo').which.eql(2);
      });
    });
  });
});
