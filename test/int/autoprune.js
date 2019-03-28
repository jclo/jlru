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
  describe('Test automatic prune:', () => {
    it('Expects lru.count() to return the value 5.', () => {
      const lru = JLRU({ maxAge: 500, prune: 1000 });
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');
      expect(lru.count()).to.be.a('number').that.is.equal(5);
    });

    it('Expects lru.count() called after 1s to return the value 0.', (done) => {
      const lru = JLRU({ maxAge: 500, prune: 1000 });
      lru.set('a', 'aaa');
      lru.set('b', 'bbb');
      lru.set('c', 'ccc');
      lru.set('d', 'ddd');
      lru.set('e', 'eee');

      setTimeout(() => {
        expect(lru.count()).to.be.a('number').that.is.equal(0);
        done();
      }, 1020);
    });
  });
};
