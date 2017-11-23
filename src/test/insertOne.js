/* global describe it before */
import 'babel-polyfill';
import should from 'should';
import * as maeva from 'maeva';
import connect from '../lib/connect';

const foo = maeva.model('foo', {foo: Number});

describe('Insert one', () => {
  before(async () => {
    try {
      await maeva.connect(connect(process.env.MONGODB_URL)).awaitConnection();
      console.log(`Connected to ${process.env.MONGODB_URL}`);
    } catch (error) {
      throw error;
    }
  });
  describe('Insert', () => {
    describe('Insert one', () => {
      let result;
      // before(async () => {
      //   try {
      //     result = await maeva.insertOne(foo, {foo: 0});
      //     console.log({result});
      //   } catch (error) {
      //     throw error;
      //   }
      // });
      it('should be an object', () => {
        // should(result).be.an.Object();
      });
      // it('should have the expected fields', () => {
      //   should(result).have.property('foo').which.eql(0);
      // });
      // it('should have an _id', () => {
      //   should(result).have.property('foo').which.eql(0);
      // });
    });
  });
});
