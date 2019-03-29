/** ****************************************************************************
 * JLRU v0.0.1
 *
 * An in-memory key/value database based on the Least Recently Used algorithm.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2019 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * ************************************************************************** */
// Based on UMDLib template v0.8.2
// ESLint declarations
/* global define */
/* eslint strict: ["error", "function"] */
/* eslint-disable one-var, semi-style */
(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([''], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(root);
  } else {
    // Browser globals.
    /* eslint-disable no-param-reassign */
    root.JLRU = factory(root);
    /* eslint-enable no-param-reassign */
  }
}({{lib:parent}}, function(root) {
  // These are the global variables accessible everywhere inside this module.
  // 'JLRU' is the variable that defines this library and it is the only variable
  // accessible outside this module.
  // '_' is an object that gives access to an embedded small utility library.
  // And, 'LRU' is an object that exports public methods from the IIFE module
  // in which they are defined.
  var JLRU
    , _
    , LRU
    ;

  /** **************************************************************************
   *
   * A micro subset of the Overslash library.
   *
   * _.js is just a literal object that contains a set of functions. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . none,
   *
   * Public Functions:
   *  . isUndefined            is a given variable undefined?,
   *  . isNull                 is a given value null?,
   *  . isBoolean              is a given value a boolean?
   *  . isString               is a given value a string?
   *  . isNumber               is a given value a number?
   *  . isNaN                  is a given value NaN?
   *  . isOdd                  is a given value an odd number?
   *
   *
   * @namespace    _
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* - */

  _ = {

    /**
     * Is a given variable undefined?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isUndefined: function(obj) {
      return obj === undefined;
    },

    /**
     * Is a given value null?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isNull: function(obj) {
      return obj === null;
    },

    /**
     * Is a given value a boolean?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isBoolean: function(obj) {
      return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
    },

    /**
     * Is a given value a string?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isString: function(obj) {
      return Object.prototype.toString.call(obj) === '[object String]';
    },

    /**
     * Is a given value a number?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isNumber: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Number]';
    },

    /**
     * Is a given value NaN?
     * (NaN is the only number which does not equal itself)
     * (copied from: http://underscorejs.org)
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true or false,
     * @since 0.0.0
     */
    isNaN: function(obj) {
      return this.isNumber(obj) && obj !== +obj;
    },

    /**
     * Is a given value an odd number?
     *
     * @function (arg1)
     * @public
     * @param {Object}      the object to test,
     * @returns {Boolean}   returns true (odd), false (even) or undefined (not a number),
     * @since 0.0.0
     */
    /* eslint-disable no-void */
    isOdd: function(obj) {
      var n = obj % 2;
      return obj === parseFloat(obj) ? !!n : void 0;
    }
  };


  /** **************************************************************************
   *
   * Manages the LRU cache.
   *
   * lru.js is just a literal object that contains a set of 'static' methods. It
   * can't be intantiated.
   *
   * Private Functions:
   *  . _findLRU               searches for the newest LRU key/value,
   *  . _notTooOld             checkes the lifetime of the key/value pair,
   *  . _manageOverflow        removes the LRU key(s)/value(s) in the cache size,
   *  . _generateOutput        returns the selected key/value pair,
   *
   *
   * Public Static Methods:
   *  . set                    adds a new key/pair value into the cache,
   *  . get                    returns the value and age of the requested key,
   *  . has                    checks if the requested key is in the cache,
   *  . remove                 removes the requested key from the cache,
   *  . empty                  empties the cache,
   *  . dump                   dumps the content of the cache,
   *  . prune                  removes the key/value pair that are too old,
   *  . renew                  sets to zero the age of an existing key,
   *
   *
   * @namespace    LRU
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style, no-underscore-dangle */

  (function() {
    // IIFE

    // -- Module path

    // -- Local modules

    // -- Local constants

    // -- Local variables


    // -- Private Functions ----------------------------------------------------

    /**
     * Searches for the newest Least Recently Used key/value.
     *
     * @function (arg1)
     * @private
     * @param {Object}      the LRU db,
     * @returns {}          -,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _findLRU(db) {
      while (db.lru < db.mru && db.list[db.lru] === undefined) {
        db.lru += 1;
      }
    }
    /* eslint-enable no-param-reassign */


    /**
     * Checkes if the key/value pair hasn't exceeded the max age.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the LRU db,
     * @param {String}      the key,
     * @returns {Boolean}   returns true if the key/value is still in its lifetime,
     *                      otherwise false,
     * @since 0.0.0
     */
    function _notTooOld(db, key) {
      return (new Date() - db.cache[key].birth) <= db.maxAge;
    }

    /**
     * Removes the LRU key(s)/value(s) to limit the cache size to maxItems,
     *
     * @function (arg1)
     * @private
     * @param {Object}      the LRU db,
     * @returns {}          -,
     * @since 0.0.0
     */
    /* eslint-disable no-param-reassign */
    function _manageOverflow(db) {
      var oldest;

      while (db.items > db.maxItems) {
        // the db overflows, delete the least recently used item:
        _findLRU(db);
        oldest = db.list[db.lru];
        delete db.cache[oldest];
        delete db.list[db.lru];
        db.items -= 1;
        _findLRU(db);
      }
    }
    /* eslint-enable no-param-reassign */

    /**
     * Returns the selected key/value pair.
     *
     * @function (arg1, arg2)
     * @private
     * @param {Object}      the LRU db,
     * @param {String}      the key,
     * @returns {Object}    returns the key/value pair,
     * @since 0.0.0
     */
    function _generateOutput(db, key) {
      return {
        value: db.cache[key].value,
        age: new Date() - db.cache[key].birth
      };
    }


    // -- Public Static Methods ------------------------------------------------
    // (in the scope of this library)

    LRU = {

      /**
       * Adds a new key/pair value into the cache.
       *
       * Nota:
       * It deletes the LRU key(s)/value(s) if the cache is full. And, it
       * overwrites the value of the already existing key, in the cache, only
       * if the option 'force' is set to true.
       *
       * @method (arg1, arg2, arg3, arg4)
       * @public
       * @param {Object}      the LRU db,
       * @param {String}      the key,
       * @param {???}         the value of the key,
       * @param {Object}      the optional parameters,
       * @returns {Object}    returns the added key/value pair,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      set: function(db, key, value, options) {
        var oldstamp;

        // Already in?
        if (!db.cache[key]) {
          // No! Store it in cache and list, update mru and items.
          db.cache[key] = {
            value: value,
            stamp: db.mru,
            birth: new Date()
          };
          db.list[db.cache[key].stamp] = key;
          db.mru += 1;
          db.items += 1;
          _manageOverflow(db);
          return _generateOutput(db, key);
        }

        // already in. Could we overwrite its value?
        if (options && options.force === true) {
          // As the option force is true, overwrite the current key/value:
          oldstamp = db.cache[key].stamp;
          db.cache[key] = {
            value: value,
            stamp: db.mru,
            birth: new Date()
          };
          db.list[db.cache[key].stamp] = key;
          delete db.list[oldstamp];
          db.mru += 1;
        }
        return _generateOutput(db, key);
      },
      /* eslint-enable no-param-reassign */

      /**
       * Returns the value and age of the requested key.
       *
       * Nota:
       * the requested key/value pair is removed from the cache. If it has
       * exceeded the max age or if it doesn't exist, 'null' is returned.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the LRU db,
       * @param {String}      the key,
       * @returns {Object}    returns the requested key/value pair or null,
       * @since 0.0.0
       */
      // return key/value or null if it doesn't exist or too old
      get: function(db, key) {
        var o;

        if (db.cache[key] && _notTooOld(db, key)) {
          o = _generateOutput(db, key);
        }
        this.remove(db, key);
        return o || null;
      },

      /**
       * Checks if the requested key is in the cache.
       *
       * Nota:
       * If the requested key has exceeded the max age, it is removed from the
       * cache and 'null' is returned.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the LRU db,
       * @param {String}      the key,
       * @returns {Object}    returns the requested key/value pair or null,
       * @since 0.0.0
       */
      has: function(db, key) {
        if (db.cache[key] && _notTooOld(db, key)) {
          return _generateOutput(db, key);
        }
        // it exceeded its lifetime, delete it:
        this.remove(db, key);
        return null;
      },

      /**
       * Removes the requested key from the cache.
       *
       * @method (arg1, arg2)
       * @public
       * @param {Object}      the LRU db,
       * @param {String}      the key,
       * @returns {Object}    returns true if is done, otherwise null,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      remove: function(db, key) {
        var stamp;

        if (!db.cache[key]) {
          return null;
        }

        stamp = db.cache[key].stamp;
        delete db.cache[key];
        delete db.list[stamp];
        db.items -= 1;

        // If the deleted key/value is the LRU, we have to find who is new LRU and
        // update db.lru.
        if (parseInt(stamp, 10) === db.lru) {
          db.lru = -1;
          _findLRU(db);
        }
        return true;
      },
      /* eslint-enable no-param-reassign */

      /**
       * Empties the cache.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the LRU db,
       * @returns {}          -,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      empty: function(db) {
        db.cache = {};
        db.list = {};
        db.lru = 0;
        db.mru = 0;
        db.items = 0;
      },
      /* eslint-enable no-param-reassign */

      /**
       * Dumps the content of the cache.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the LRU db,
       * @returns {Object}    returns the key/value from the oldest to the newest,
       * @since 0.0.0
       */
      dump: function(db) {
        var stamps = Object.keys(db.list)
          , key
          , out = []
          , i
          ;

        for (i = 0; i < stamps.length; i++) {
          key = db.list[stamps[i]];
          out.push({
            key: key,
            value: db.cache[key].value,
            age: new Date() - db.cache[key].birth
          });
        }
        return out;
      },

      /**
       * Removes the key/value pair that have exceeded the max age.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the LRU db,
       * @returns {Object}    -,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      prune: function(db) {
        var stamps = Object.keys(db.list)
          , newlist = {}
          , key
          , s
          , i
          ;

        // First, remove key/value exceeding maxAge:
        for (i = 0; i < stamps.length; i++) {
          key = db.list[stamps[i]];
          if (!_notTooOld(db, key)) {
            this.remove(db, key);
          }
        }

        // Then, flush the stamp list:
        stamps = Object.keys(db.list);
        for (i = 0; i < stamps.length; i++) {
          key = db.list[stamps[i]];
          s = i.toString();
          newlist[s] = key;
          db.cache[key].stamp = s;
        }
        db.list = newlist;
      },
      /* eslint-enable no-param-reassign */

      /**
       * Sets to zero the age of an existing key.
       *
       * @method (arg1)
       * @public
       * @param {Object}      the LRU db,
       * @returns {Object}    -,
       * @since 0.0.0
       */
      /* eslint-disable no-param-reassign */
      renew: function(db, key) {
        if (db.cache[key]) {
          db.cache[key].birth = new Date();
          return _generateOutput(db, key);
        }
        return null;
      }
      /* eslint-enable no-param-reassign */

    };
  }());
  /* eslint-enable one-var, semi-style, no-underscore-dangle */


  /** **************************************************************************
   *
   * A in-memory key/value database based on the Least Recently Used algorithm.
   *
   * jlru.js is built upon the Prototypal Instantiation pattern. It
   * returns an object by calling its constructor. It doesn't use the new
   * keyword.
   *
   * Private Functions:
   *  . startPruneCounter      starts a counter that launches the prune method,
   *  . prune                  checks if the cache must be cleaned up,
   *
   * Constructor
   *  . JLRU                   creates and returns the JLRU object,
   *
   * Public Methods:
   *  . set                    adds a key/value pair to the cache,
   *  . get                    returns a key/value pair from the cache,
   *  . has                    checks if a key/value pair is in the cache,
   *  . remove                 removes a key/value pair from the cache,
   *  . empty                  removes all the key(s)/value(s) pair from the cache,
   *  . dump                   dumps all the key(s)/value(s) pair stored in the cache,
   *  . prune                  removes the too old key/values pairs from the cache,
   *  . count                  returns the number of the stored key/value pairs,
   *  . renew                  sets to zero the age of a stored key/value pair,
   *
   *
   * @namespace    JLRU
   * @dependencies none
   * @exports      -
   * @author       -
   * @since        0.0.0
   * @version      -
   * ************************************************************************ */
  /* eslint-disable one-var, semi-style */

  (function() {
    // IIFE

    // -- Module path


    // -- Local modules


    // -- Local constants
    var methods
      , previousJLRU
      ;


    // -- Local variables
    var pruneInterval
      , timeToPrune
      ;


    // -- Private Functions ----------------------------------------------------

    /**
     * Starts the prune counter.
     *
     * @function ()
     * @private
     * @param {}            -,
     * @returns {}          -,
     * @since 0.0.0
     */
    function startPruneCounter() {
      timeToPrune = false;
      setTimeout(function() {
        timeToPrune = true;
      }, pruneInterval);
    }

    /**
     * Starts prune.
     *
     * @function (arg1)
     * @private
     * @param {Object}      the context object,
     * @returns {}          -,
     * @since 0.0.0
     */
    function prune(that) {
      if (pruneInterval && timeToPrune) {
        timeToPrune = false;
        startPruneCounter();
        that.prune();
      }
    }


    // -- Public ---------------------------------------------------------------

    /**
     * Creates and returns the object JLRU.
     * (Prototypal Instantiation Pattern)
     *
     * @constructor (arg1)
     * @public
     * @param {Object}      the optional parameters,
     * @returns {Object}    returns the JLRU object,
     * @since 0.0.0
     */
    /* eslint-disable no-multi-spaces */
    JLRU = function(options) {
      var obj = Object.create(methods)
        , db
        ;

      obj.db = {};
      db = obj.db;
      db.cache = {};        // contains keys, values,
      db.list = {};         // contains a time stamp and associated key,
      db.lru = 0;           // the least recently used time stamp,
      db.mru = 0;           // the most recently used time stamp,
      db.items = 0;         // the number of key/value pairs stored in the cache,

      // Contains the maximum number of items. Default are 1000.
      // Negative values are ignored. Default value is applied.
      db.maxItems = options && _.isNumber(options.maxItems) && options.maxItems > 0
        ? Math.ceil(options.maxItems)
        : 1000;

      // Contains the maximum age. Default is 1 hour. Values lower than 100 are
      // ignored. Default value is applied.
      db.maxAge = options && _.isNumber(options.maxAge) && options.maxAge >= 100
        ? Math.ceil(options.maxAge)
        : 1000 * 60 * 60;

      pruneInterval = options && _.isNumber(options.prune) && options.prune >= 1000
        ? Math.ceil(options.prune)
        : null;

      if (pruneInterval) {
        startPruneCounter();
      }

      return obj;
    };
    /* eslint-enable no-multi-spaces */

    // Saves the previous value of the library variable, so that it can be
    // restored later on, if noConflict is used.
    previousJLRU = root.JLRU;

    // Runs JLRU in noConflict mode, returning the JLRU variable to its
    // previous owner. Returns a reference to this JLRU object.
    /* istanbul ignore next */
    /* eslint-disable no-param-reassign */
    JLRU.noConflict = function() {
      root.JLRU = previousJLRU;
      return this;
    };
    /* eslint-enable no-param-reassign */

    // Current version of the library:
    JLRU.VERSION = '0.0.1';

    // For testing purpose:
    JLRU._ = _;


    // -- Public Methods -------------------------------------------------------

    methods = {

      /**
       * Adds a key/value pair to the cache.
       *
       * Nota:
       * If a key/value pair is already stored in the cache, the optional parameter
       * 'force' must be set to true to overwrite the value of the key.
       *
       * @method (arg1, arg2, arg3)
       * @public
       * @param {String}    the name of the key,
       * @param {Object}    the value of the key (string, number, object, array, etc.),
       * @param {Object}    the optional parameters ({ force: true/false })
       * @returns {Object}  returns the added key/value pair or null,
       * @since 0.0.0
       */
      set: function(key, value, options) {
        prune(this);
        return _.isString(key) ? LRU.set(this.db, key, value, options) : null;
      },

      /**
       * Returns a key/value pair from the cache and deletes it.
       *
       * @method (arg1)
       * @public
       * @param {String}    the name of the key,
       * @returns {Object}  returns the requested key/value pair or null,
       * @since 0.0.0
       */
      get: function(key) {
        prune(this);
        return _.isString(key) ? LRU.get(this.db, key) : null;
      },

      /**
       * Checks if a key/value pair is in the cache.
       *
       * @method (arg1)
       * @public
       * @param {String}    the name of the key,
       * @returns {Object}  returns the key/value pair or null,
       * @since 0.0.0
       */
      has: function(key) {
        prune(this);
        return _.isString(key) ? LRU.has(this.db, key) : null;
      },

      /**
       * Removes a key/value pair from the cache.
       *
       * @method (arg1)
       * @public
       * @param {String}    the name of the key,
       * @returns {Object}  returns the removed key/value pair or null,
       * @since 0.0.0
       */
      remove: function(key) {
        prune(this);
        return _.isString(key) ? LRU.remove(this.db, key) : null;
      },

      /**
       * Removes all the key(s)/value(s) pair from the cache.
       *
       * @method (arg1)
       * @public
       * @param {String}    the name of the key,
       * @returns {}        -,
       * @since 0.0.0
       */
      empty: function() {
        LRU.empty(this.db);
        return this;
      },

      /**
       * Dumps all the key(s)/value(s) pair stored the cache.
       * (ordered from the oldest to the newest)
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {Array}   returns the key/value pairs with their age,
       * @since 0.0.0
       */
      dump: function() {
        prune(this);
        return LRU.dump(this.db);
      },

      /**
       * Removes the key/values pairs that exceeded thir lifetime from the cache,
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {}        -,
       * @since 0.0.0
       */
      prune: function() {
        LRU.prune(this.db);
      },

      /**
       * Returns the number of key/value pairs stored into the cache,
       *
       * @method ()
       * @public
       * @param {}          -,
       * @returns {}        -,
       * @since 0.0.0
       */
      count: function() {
        prune(this);
        return this.db.items;
      },

      /**
       * Sets to zero the age of a stored key/value pair,
       *
       * @method (arg1)
       * @public
       * @param {String}    the name of the key,
       * @returns {Object}  returns the renewed key/value pair,
       * @since 0.0.0
       */
      renew: function(key) {
        prune(this);
        return _.isString(key) ? LRU.renew(this.db, key) : null;
      }
    };
    /* eslint-enable one-var, semi-style */
  }());


  // Returns the library name:
  return JLRU;
}));
/* eslint-enable one-var, semi-style */
