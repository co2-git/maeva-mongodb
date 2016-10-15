/* global describe it before */
import should from 'should';
import FindStatement from '../lib/FindStatement';

describe('Find Statement', () => {
  describe('Unit', () => {
    it('should be a class', () => {
      should(FindStatement).be.a.Function();
    });
  });
  describe(`WHERE FOO = 1 AND BAR = 2
{foo: 1, bar: 2}`, () => {
    let query;
    before(() => {
      query = new FindStatement({foo: 1, bar: 2});
      console.log(query);
    });
    it('should have the query fields', () => {
      should(query).have.property('foo').which.eql(1);
      should(query).have.property('bar').which.eql(2);
    });
  });
  describe('OR', () => {
    describe(`WHERE FOO = 1 OR FOO = 2
{foo: {$in: [1, 2]}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$in: [1, 2]}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$in: [1, 2]});
      });
    });
    describe(`WHERE FOO = 1 OR AND BAR = 2
{$or: [{foo: 1}, {bar: 2}]}`, () => {
      let query;
      before(() => {
        query = new FindStatement({$or: [{foo: 1}, {bar: 2}]});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('$or').which.eql([{foo: 1}, {bar: 2}]);
      });
    });
  });
  describe('Not', () => {
    describe(`WHERE FOO != 1
{foo: {$not: 1}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$not: 1}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$ne: 1});
      });
    });
    describe(`WHERE FOO != 1 AND BAR != 2
{$not: {foo: 1, bar: 2}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({$not: {foo: 1, bar: 2}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('$not').which.eql({foo: 1, bar: 2});
      });
    });
    describe(`WHERE FOO != 1 OR BAR != 2
{$not: [{foo: 1}, {bar: 2}]}`, () => {
      let query;
      before(() => {
        query = new FindStatement({$not: [{foo: 1}, {bar: 2}]});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('$not')
          .which.is.an.Array().and.have.length(2);
        should(query.$not[0]).eql({foo: 1});
        should(query.$not[1]).eql({bar: 2});
      });
    });
  });
  describe('Comparison', () => {
    describe(`WHERE FOO < 1
{foo: {$lt: 1}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$lt: 1}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$lt: 1});
      });
    });
    describe(`WHERE FOO <= 1
{foo: {$lte: 1}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$lte: 1}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$lte: 1});
      });
    });
    describe(`WHERE FOO > 1
{foo: {$gt: 1}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$gt: 1}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$gt: 1});
      });
    });
    describe(`WHERE FOO >= 1
{foo: {$gte: 1}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$gte: 1}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$gte: 1});
      });
    });
    describe(`WHERE FOO > 10 AND FOO < 100
{foo: {$between: [10, 100]}}`, () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$between: [10, 100]}});
        console.log(query);
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({
          $lte: 10,
          $gte: 100,
        });
      });
    });
  });
});
