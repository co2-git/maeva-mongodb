import should from 'should';
import FindStatement from '../lib/FindStatement';

describe('Find Statement', () => {
  describe('Unit', () => {
    it('should be a class', () => {
      should(FindStatement).be.a.Function();
    });
  });
  describe('Simple query', () => {
    let query;
    before(() => {
      query = new FindStatement({foo: 1, bar: 2});
    });
    it('should have the query fields', () => {
      should(query).have.property('foo').which.eql(1);
      should(query).have.property('bar').which.eql(2);
    });
  });
  describe('Not', () => {
    describe('WHERE FOO != 1', () => {
      let query;
      before(() => {
        query = new FindStatement({foo: {$not: 1}});
      });
      it('should have the query fields', () => {
        should(query).have.property('foo').which.eql({$ne: 1});
      });
    });
    describe('WHERE FOO != 1 AND BAR != 2', () => {
      let query;
      before(() => {
        query = new FindStatement({$not: {foo: 1, bar: 2}});
      });
      it('should have the query fields', () => {
        should(query).have.property('$not').which.eql({foo: 1, bar: 2});
      });
    });
    describe('WHERE FOO != 1 OR BAR != 2', () => {
      let query;
      before(() => {
        query = new FindStatement({$not: [{foo: 1}, {bar: 2}]});
      });
      it('should have the query fields', () => {
        should(query).have.property('$not')
          .which.is.an.Array().and.have.length(2);
        should(query.$not[0]).eql({foo: 1});
        should(query.$not[1]).eql({bar: 2});
      });
    });
  });
});
