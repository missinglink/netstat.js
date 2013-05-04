var child = require('child_process'),
  util = require('util'),
  netstatd = child.spawn('netstat', ['-panFeetc']);

/*
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode       PID/Program name Timer
tcp        0      0 0.0.0.0:27017           0.0.0.0:*               LISTEN      115        8677        -                off (0.00/0/0)
tcp        0      0 0.0.0.0:13887           0.0.0.0:*               LISTEN      1000       163046      29355/spotify    keepalive (0.00/0/0)
tcp        0      0 192.168.0.15:36701      173.194.34.89:80        ESTABLISHED 1000       1363954     3932/chrome --no-st keepalive (13.25/0/0)
tcp        0      0 127.0.0.1:27017         127.0.0.1:55427         ESTABLISHED 115        534398      -                keepalive (87.75/0/0)
*/

var headers = [];

function combine ( keys, values ) {
  var obj = {};

  values.forEach( function( value, key ){
    obj[ keys[ key ] ] = value;
  });

  return obj;
}

function parse ( dataString ) {

  var lines = ( dataString.toString('utf-8').split('\n') || [] );

  lines.forEach( function( line, key ){

    var columns = line.split(/\s/);

    if( headers.length > 0 ){
      lines[ key ] = combine( headers, columns );
    }

    else if( columns[0] === 'Proto' ){
      headers = columns;
    }

  });

  return lines;
}

netstatd.stdout.on('data', function(data) {

  parse( data ).map( function( line ){

    console.log( 'stdout', JSON.stringify( line ) );

  });

});

netstatd.stderr.on('data', function(data) {

  console.log('err: ' + data);

});