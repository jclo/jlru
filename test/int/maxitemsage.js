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
  describe('Test maxItems and MaxAge:', () => {
    describe('Text maxItems:', () => {
      const lru = JLRU({ maxItems: 5 });
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      it('Expects lru.count() to return 5 after adding 5 keys/values.', () => {
        expect(lru.count()).to.be.a('number').that.is.equal(5);
      });

      it('Expects lru.count() still to return 5 after adding 1 new key/value.', () => {
        lru.set('f', 'fff');
        expect(lru.count()).to.be.a('number').that.is.equal(5);
      });

      it('Expects lru.has("a") to return null as this key/value was the first entered.', () => {
        expect(lru.has('a')).to.be.a('null');
      });
    });

    describe('Text maxAge:', () => {
      const lru = JLRU({ maxAge: 500 });
      lru.set('a', 'aaa');
      const o = lru.get('a');

      it('Expects lru.get("a") to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects this object to own the property "value" that is a string equal to "aaa".', () => {
        expect(o).to.have.property('value').that.is.a('string').that.is.equal('aaa');
      });

      it('Expects lru.get("a") after 600ms to return null.', (done) => {
        setTimeout(() => {
          expect(lru.get('a')).to.be.an('null');
          done();
        }, 600);
      });
    });
  });
};
