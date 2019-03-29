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

'use strict';

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
  JLRU.VERSION = '{{lib:version}}';

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
