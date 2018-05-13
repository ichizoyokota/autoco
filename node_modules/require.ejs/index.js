var Module = require('module');

Module._extensions['.ejs'] = function(m,filename){
  m.paths = module.paths;
  var injectable = `
    var ejs = require('ejs');
    var fs = require('fs');
    module.exports = function(vars,options){
      var template = fs.readFileSync("${filename}","utf8");
      return ejs.render(template,vars,options);
    }
  `;
  return m._compile(injectable);
};
