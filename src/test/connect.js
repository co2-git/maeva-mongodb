/* global describe it before */
import 'babel-polyfill';
import should from 'should';
import {EventEmitter} from 'events';
import {Db} from 'mongodb';
import connect from '../lib/connect';
import ObjectId from '../lib/types/ObjectId';

const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/test';

describe('Connect', () => {
  describe('Unit', () => {
    it('should be a function', () => {
      should(connect).be.a.Function();
    });
    it('should return a function', () => {
      should(connect()).be.a.Function();
    });
  });
  describe('Connecting', () => {
    let conn;
    before(async () => {
      conn = new EventEmitter();
      await connect(URL)(conn);
    });
    it('should have a db link', () => {
      should(conn).have.property('db').which.is.an.instanceOf(Db);
    });
    it('should have a disconnector', () => {
      should(conn.disconnectDriver).be.a.Function();
    });
    it('should have an id descriptor', () => {
      should(conn._id).be.an.Object();
      should(conn._id).have.property('name').which.eql('_id');
      should(conn._id).have.property('type').which.eql(ObjectId);
    });
    describe('Operations', () => {
      it('should have operations', () => {
        should(conn).have.property('operations').which.is.an.Object();
      });
      it('should have an insert operation', () => {
        should(conn.operations).have.property('insert').which.is.a.Function();
      });
      it('should have a find operation', () => {
        should(conn.operations).have.property('find').which.is.a.Function();
      });
    });
  });
});
