/* eslint */

'use strict';

module.exports = {
  dist: './_dist',
  libdir: './lib',
  libname: 'JLRU',
  parent: 'this',
  noparent: '-noparent',
  // These are the Javascript files required to build the library.
  src: [
    './src/_header',
    './src/private/_.js',
    './src/private/lru.js',
    './src/jlru.js',
    './src/_footer',
  ],
  license: ['/** ****************************************************************************',
    ' * {{lib:name}} v{{lib:version}}',
    ' *',
    ' * {{lib:description}}.',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2019 {{lib:author}} <{{lib:email}}> ({{lib:url}}).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
