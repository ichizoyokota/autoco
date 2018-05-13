require('../');
var expect = require('chai').expect;

describe('require.ejs basic template', function(){
  it('should compile basic template', function(done){
    var result = require('./templates/basic.ejs')({d:true});
    expect(result).to.equal('true\n');
    done();
  });
  it('shouldn\'t compile basic template', function(done){
    try{
      require('./templates/basic.ejs')({});
      done(new Error('This Test Should Fail'));
    } catch (e) {
      done();
    }
  });
});
