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

'use strict';

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
