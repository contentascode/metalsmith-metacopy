
/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to manipulate metadata and file metadata. 
 *
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith){
    if (options.file) {
      options.file.forEach(function(rule) {
        Object.keys(files).forEach(function(file){
          if (files[file][rule.dest]) {
            files[file][rule.dest] = Object.assign(files[file][rule.dest], rule.src.split('.').reduce(index, files[file]));
          } else {
            files[file][rule.dest] = rule.src.split('.').reduce(index, files[file]);            
          }
        });
      })
    }

    if (options.metadata) {
      options.metadata.forEach(function(rule) {
        if (metalsmith._metadata[rule.dest]) {
          metalsmith._metadata[rule.dest] = Object.assign(metalsmith._metadata[rule.dest], rule.src.split('.').reduce(index, metalsmith._metadata));
        } else {
          metalsmith._metadata[rule.dest] = rule.src.split('.').reduce(index, metalsmith._metadata);          
        }
      });
    }
  };
}

function index(obj,i) {return obj[i]}
