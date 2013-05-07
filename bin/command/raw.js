
module.exports = function(){

  var netstat = require('../../lib/netstat');

  netstat.on( 'stdout', function( data ){
    process.stdout.write( data );
  });

  netstat.on( 'stderr', function( err ) {
    process.stderr.write( err );
  });

};