
module.exports = function(){

  var netstat = require('../../lib/netstat');

  // Try to read indent from program flags
  var indent = parseInt( this.json, 10 ) || 0;

  netstat.on( 'stdout', function( data ){
    process.stdout.write(
      JSON.stringify( netstat.parse( data ), null, indent ) + '\n'
    );
  });

  netstat.on( 'stderr', function( err ) {
    process.stderr.write( err );
  });

};