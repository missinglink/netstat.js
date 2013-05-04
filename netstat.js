
var spawn = require('child_process').spawn;
var events = require('events');
var parse = require('./parse');
var graph = require('./graph');

var emitter = new events.EventEmitter();
var netstat = spawn( 'netstat', ['-wantpeace'] );

netstat.stdout.on('data', function( data ) {
  data = data.toString('utf-8');
  emitter.emit( 'stdout', data );

  data = parse( data );
  emitter.emit( 'data', data, graph( data ) );
});

netstat.stderr.on('data', function( err ) {
  emitter.emit( 'stderr', err.toString('utf-8') );
});

module.exports = emitter;