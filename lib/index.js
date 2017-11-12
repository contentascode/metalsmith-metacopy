const debug = require('debug')('metalsmith-metacopy');
const match = require('multimatch');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to manipulate metadata and file metadata.
 *
 * @return {Function}
 */

function plugin(options) {
  const { patterns = ['**/*.md'] } = options;

  return function(files, metalsmith) {
    if (options.file) {
      options.file.forEach(function(rule) {
        Object.keys(files)
          .filter(key => match(key, patterns).length !== 0)
          .forEach(function(file) {
            if (typeof files[file][rule.dest] === 'object') {
              files[file][rule.dest] = Object.assign(files[file][rule.dest], index(files[file], rule.src));
              index(files[file], rule.dest, files[file][rule.dest]);
            } else {
              // console.log('----------')
              debug('file', file);
              debug('rule.src', rule.src);
              debug('rule.dest', rule.dest);
              var tmp = index(files[file], rule.src);
              // console.log(files[file]['contents'] ? files[file]['contents'].toString() : '')
              // console.log('===========')
              index(files[file], rule.dest, tmp);
              // console.log(files[file])
              // console.log(files[file]['content'] ? files[file]['content'].toString() : '')
              // console.log('===========')
              // console.log(files[file][rule.dest].toString())
            }
          });
      });
    }

    if (options.metadata) {
      options.metadata.forEach(function(rule) {
        if (typeof metalsmith._metadata[rule.dest] === 'object') {
          index(
            metalsmith._metadata,
            rule.dest,
            Object.assign(metalsmith._metadata[rule.dest], index(metalsmith._metadata, rule.src))
          );
        } else {
          index(metalsmith._metadata, rule.dest, index(metalsmith._metadata, rule.src));
        }
      });
    }
  };
}

function index(obj, is, value) {
  if (typeof is == 'string') return index(obj, is.split('.'), value);
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
  else if (is.length == 0) return obj;
  else return index(obj[is[0]], is.slice(1), value);
}
