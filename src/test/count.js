/* global describe it before after */
import should from 'should';
import EventEmitter from 'events';
import connect from '../lib/connect';
import insert from '../lib/insert';
import count from '../lib/count';

const collection = `test-find-${Math.random()}-${Date.now()}`;
const documents = [
  {foo: 1},
  {foo: 2},
  {foo: 3},
  {foo: 4},
  {foo: 5},
  {foo: 6},
];

describe('Count', () => {
  let conn;
  before(async () => {
    conn = new EventEmitter();
    await connect(process.env.MONGODB_URL)(conn);
    await insert(conn, {
      collection,
      documents,
    });
  });
  describe('Unit', () => {
    it('should be a function', () => {
      should(count).be.a.Function();
    });
  });
  describe('Count without query', () => {
    let results;
    before(async () => {
      results = await count(conn, {
        collection,
        get: {},
        options: {},
      });
    });
    it('should be the right number', () => {
      should(results).eql(documents.length);
    });
  });
  describe('Count with query', () => {
    let results;
    before(async () => {
      results = await count(conn, {
        collection,
        get: {foo: 1},
        options: {},
      });
    });
    it('should be the right number', () => {
      should(results).eql(1);
    });
  });
  describe('Count with meta-query', () => {
    let results;
    before(async () => {
      results = await count(conn, {
        collection,
        get: {foo: {$gt: 4}},
        options: {},
      });
    });
    it('should be the right number', () => {
      should(results).eql(2);
    });
  });
  after(async () => {
    // ...
  });
});