// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-unused-expressions: 0 */

'use strict';

// -- Node modules
const { expect } = require('chai')
    ;


// -- Local modules
const JLRU = require('../../index.js')
    ;


// -- Local constants


// -- Local variables


// -- Main
module.exports = () => {
  describe('Test the count, empty and dump methods:', () => {
    describe('Test the count method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      it('Expects lru.count() to return a number equal to 5.', () => {
        expect(lru.count()).to.be.a('number').that.is.equal(5);
      });

      it('Expects a second lru.count() to return a number equal to 5.', () => {
        expect(lru.count()).to.be.a('number').that.is.equal(5);
      });

      it('Expects a lru.count() after a lru.remove("a") to return a number equal to 4.', () => {
        lru.remove('a');
        expect(lru.count()).to.be.a('number').that.is.equal(4);
      });
    });

    describe('Test the empty method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      it('Expects lru.count() to return a number equal to 5.', () => {
        expect(lru.count()).to.be.a('number').that.is.equal(5);
      });

      it('Expects lru.count() after a lru.empty() to return a number equal to 0.', () => {
        lru.empty();
        expect(lru.count()).to.be.a('number').that.is.equal(0);
      });
    });

    describe('Test the dump method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');
      const d = lru.dump();

      it('Expects lru.dump() to return an array with 5 items.', () => {
        expect(d).to.be.an('array').that.has.lengthOf(5);
      });

      it('Expects the first item to be an object.', () => {
        expect(d[0]).to.be.an('object');
      });

      it('Expects this object to own the property "key" that is a string equal to "a".', () => {
        expect(d[0]).to.have.property('key').that.is.a('string').that.is.equal('a');
      });

      it('Expects this object to own the property "value" that is a string equal to "aaa".', () => {
        expect(d[0]).to.have.property('value').that.is.a('string').that.is.equal('aaa');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(d[0]).to.have.property('age').that.is.a('number');
      });

      it('Expects the third item to be an object.', () => {
        expect(d[2]).to.be.an('object');
      });

      it('Expects this object to own the property "key" that is a string equal to "c".', () => {
        expect(d[2]).to.have.property('key').that.is.a('string').that.is.equal('c');
      });

      it('Expects this object to own the property "value" that is a string equal to "ccc".', () => {
        expect(d[2]).to.have.property('value').that.is.a('string').that.is.equal('ccc');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(d[2]).to.have.property('age').that.is.a('number');
      });
    });
  });
};
