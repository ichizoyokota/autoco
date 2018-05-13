require('../');
var expect = require('chai').expect;

describe('require.ejs includes', function(){
  it('should compile template with include', function(done){
    var result = require('./templates/include.ejs')({d:true});
    expect(result).to.equal('true\n\n');
    done();
  });
});
