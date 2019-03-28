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
  describe('Test the renew and prune methods:', () => {
    describe('Test the renew method:', () => {
      it('Expects lru.has("a") after a timeout of 1s to return an "age" greater than 950.', (done) => {
        const lru = JLRU();
        lru.set('a', 'aaa');

        setTimeout(() => {
          expect(lru.has('a')).to.have.property('age').that.is.a('number').to.be.above(950);
          done();
        }, 1000);
      });

      it('Expects lru.has("a") after a timeout of 1s and "renew" to return an "age" lower than 10.', (done) => {
        const lru = JLRU();
        lru.set('a', 'aaa');

        setTimeout(() => {
          lru.renew('a');
          expect(lru.has('a')).to.have.property('age').that.is.a('number').to.be.below(10);
          done();
        }, 1000);
      });

      it('Expects lru.renew("b") to return a null.', () => {
        const lru = JLRU();
        lru.set('a', 'aaa');
        expect(lru.renew('b')).to.be.a('null');
      });

      it('Expects lru.renew(1) to return a null.', () => {
        const lru = JLRU();
        lru.set('a', 'aaa');
        expect(lru.renew(1)).to.be.a('null');
      });
    });

    describe('Test the prune method:', () => {
      const lru = JLRU({ maxAge: 1000 });
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      it('Expects lru.count() to return 5.', () => {
        expect(lru.count()).to.be.a('number').equal(5);
      });

      it('Expects after a timeout of 1s lru.count() to return 1.', (done) => {
        setTimeout(() => {
          lru.set('f', 'fff');
          lru.prune();
          expect(lru.count()).to.be.a('number').equal(1);
          done();
        }, 1000);
      });
    });
  });
};
