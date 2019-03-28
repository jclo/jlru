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
  describe('Test the has and remove methods:', () => {
    describe('Test the has method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      const o = lru.has('a');

      it('Expects lru.has("a") to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects this object to own the property "value" that is a string equal to "aaa".', () => {
        expect(o).to.have.property('value').that.is.a('string').that.is.equal('aaa');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(o).to.have.property('age').that.is.a('number');
      });

      it('Expects a second lru.has("a") still to return an object.', () => {
        expect(lru.has('a')).to.be.an('object');
      });

      it('Expects this object to own the property "value" that is a string equal to "aaa".', () => {
        expect(o).to.have.property('value').that.is.a('string').that.is.equal('aaa');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(o).to.have.property('age').that.is.a('number');
      });

      it('Expects lru.has("c") to return null.', () => {
        expect(lru.has('c')).to.be.a('null');
      });

      it('Expects lru.has(1) to return null.', () => {
        expect(lru.has(1)).to.be.a('null');
      });
    });

    describe('Test the remove method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      it('Expects lru.remove("a") to return true.', () => {
        expect(lru.remove('a')).to.be.true;
      });

      it('Expects lru.has("a") to return null.', () => {
        expect(lru.has('a')).to.be.a('null');
      });

      it('Expects a second lru.remove("a") to return null.', () => {
        expect(lru.remove('a')).to.be.a('null');
      });

      it('Expects lru.remove(1) to return null.', () => {
        expect(lru.remove(1)).to.be.a('null');
      });

      it('Expects lru.remove("b") to return true.', () => {
        expect(lru.remove('b')).to.be.true;
      });

      it('Expects lru.remove("d") to return true.', () => {
        expect(lru.remove('d')).to.be.true;
      });
    });
  });
};
