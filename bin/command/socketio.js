
module.exports = function(){

  var netstat = require( '../../lib/netstat' );

  // Try to read port from program flags
  var port = parseInt( this.socketio, 10 ) || 2001;

  process.stdout.write( 'socket.io service listening on port ' + port + '\n' );

  var io = require( 'socket.io' )
            .listen( port )
            .set( 'log level', 0 );

  netstat.on( 'stdout', function( data ) {
    io.sockets.emit( 'stdout', data );
    io.sockets.emit( 'stats', netstat.parse( data ) );
  });

  netstat.on( 'stderr', function( err ) {
    io.sockets.emit( 'stderr', err );
  });

};