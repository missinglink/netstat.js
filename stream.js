
var netstat = require('./netstat');

netstat.on( 'data', function( data, graph ) {
  console.log( JSON.stringify( data ) );
  // console.log( graph );
});

netstat.on( 'stderr', function( err ) {
  console.error( 'err', err );
});