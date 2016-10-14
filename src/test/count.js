/* global describe it before after */
import should from 'should';
import EventEmitter from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';

const collection = `test-find-${Math.random()}-${Date.now()}`;
const documents = [
  {foo: 1},
  {foo: 2},
  {foo: 3},
  {foo: 4},
  {foo: 5},
  {foo: 6},
];

describe('label', () => {
  let conn;
  before(async () => {
    conn = new EventEmitter();
    await connect(process.env.MONGODB_URL)(conn);
    await insert(conn, {
      collection,
      documents,
    });
  });
  describe('label', () => {
    it('should be something', () => {
      // ...
    });
  });
  after(async () => {
    // ...
  });
});
