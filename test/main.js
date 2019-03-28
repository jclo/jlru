// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Node modules


// -- Local modules
const over       = require('./int/over')
    , core       = require('./int/core')
    , setget     = require('./int/setget')
    , hasremove  = require('./int/hasremove')
    , ced        = require('./int/countemptydump')
    , renewprune = require('./int/renewprune')
    , maxitems   = require('./int/maxitems')
    , autoprune  = require('./int/autoprune')
    ;


// -- Local constants


// -- Local variables


// -- Main
describe('Test JLRU:', () => {
  // Test the overslash subset:
  over();

  // Test the library and its constructor:
  core();

  // Test set and get:
  setget();

  // Test has and remove:
  hasremove();

  // Test the count, empty and dump methods:
  ced();

  // Test the renew and prune methods:
  renewprune();

  // Test the cache overflow:
  maxitems();

  // Test the automatic prune:
  autoprune();
});
