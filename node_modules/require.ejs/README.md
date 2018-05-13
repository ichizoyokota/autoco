# Require.ejs

### A library for easy compilation of EJS
A easy way to compile ejs on the fly.
#### Install
```
npm install require.ejs
```
#### Usage
```
  require('require.ejs');
  var template = require('./your_template.ejs');
  template(data,options); // Returns Rendered HTML
```
#### Versus
```
var ejs = require('ejs');
var str = fs.readFileSync("./yourtemplate.ejs","utf8");
var template = ejs.compile(str, options);
template(data);
```
For Documentation on EJS please see [here](https://www.npmjs.com/package/ejs)
