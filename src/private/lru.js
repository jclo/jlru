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

'use strict';

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


  // -- Public Functions -----------------------------------------------------
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
