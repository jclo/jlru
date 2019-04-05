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
  describe('Test the set and get methods:', () => {
    describe('Test the set method:', () => {
      const lru = JLRU();
      const o = lru.set('a', 'aaa');

      const lru2 = JLRU();

      it('Expects lru.set("a", "a") to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects this object to own the property "value" that is a string.', () => {
        expect(o).to.have.property('value').that.is.a('string');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(o).to.have.property('age').that.is.a('number');
      });

      it('Expects lru.set("a", "b") to return an object with "value" equal to "aaa".', () => {
        expect(lru.set('a', 'b')).to.have.property('value').that.is.equal('aaa');
      });

      it('Expects lru.set("a", "b", { force: true }) to return an object with "value" equal to "b".', () => {
        expect(lru.set('a', 'b', { force: true })).to.have.property('value').that.is.equal('b');
      });

      it('Expects lru2.set(1, 1) to return null.', () => {
        expect(lru2.set(1, 1)).to.be.a('null');
      });
    });

    describe('Test the get method:', () => {
      const lru = JLRU();
      lru.set('a', 'aaa');
      const o = lru.get('a');

      it('Expects lru.get("a") to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects this object to own the property "value" that is a string equal to "aaa".', () => {
        expect(o).to.have.property('value').that.is.a('string').that.is.equal('aaa');
      });

      it('Expects this object to own the property "age" that is a number.', () => {
        expect(o).to.have.property('age').that.is.a('number');
      });

      it('Expects a second lru.get("a") after 200ms to return the property "age" with a value below 10.', (done) => {
        setTimeout(() => {
          lru.get('a');
          const o2 = lru.get('a');
          expect(o2).to.have.property('age').that.is.a('number').to.be.below(10);
          done();
        }, 200);
      });

      it('Expects lru.get("b") to return null.', () => {
        expect(lru.get('b')).to.be.a('null');
      });

      it('Expects lru.get(1) to return null.', () => {
        expect(lru.get(1)).to.be.a('null');
      });
    });
  });
};
