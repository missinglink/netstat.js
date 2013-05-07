
var spawn = require('child_process').spawn;
var events = require('events');

// Configure event emitter
var netstat = new events.EventEmitter();
netstat.parse = require('./parse');

// Buffering is required to avoid partial lines being emitted
var buffer = { stdout: [], strderr: [] };

// Spawn netstat daemon
var daemon = spawn( 'netstat', ['-wantpeace'], { encoding: 'binary' } );

daemon.stdout.on( 'data', function( data ) {
  data = buffer.stdout + data.toString( 'utf-8' );
  buffer.stdout = data.substring( data.lastIndexOf('\n') );
  netstat.emit( 'stdout', data.substring( 0, data.lastIndexOf('\n') ) );
});

daemon.stderr.on( 'data', function( data ) {
  data = buffer.stderr + data.toString( 'utf-8' );
  buffer.stderr = data.substring( data.lastIndexOf('\n') );
  netstat.emit( 'stderr', data.substring( 0, data.lastIndexOf('\n') ) );
});

module.exports = netstat;