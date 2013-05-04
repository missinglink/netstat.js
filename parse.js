
/*
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode       PID/Program name
tcp        0      0 0.0.0.0:27017           0.0.0.0:*               LISTEN      115        8677        -
tcp        0      0 0.0.0.0:13887           0.0.0.0:*               LISTEN      1000       163046      29355/spotify
tcp        0      0 192.168.0.15:36701      173.194.34.89:80        ESTABLISHED 1000       1363954     3932/chrome --no-st
tcp        0      0 127.0.0.1:27017         127.0.0.1:55427         ESTABLISHED 115        534398      -
*/

var headers = [];

function combine ( keys, values ) {
  var obj = {};

  values.forEach( function( v, i ){
    if( keys[ i ] ){
      obj[ keys[ i ] ] = v;
    }
    else {
      obj[ keys[ keys.length - 1 ] ] += ' ' + v;
    }
  });

  return obj;
}

function parse ( dataString ) {

  var lines = ( dataString.split('\n') || [] );

  lines.forEach( function( line, key ){

    var columns = line.replace( 'Local Address', 'Local-Address' )
                      .replace( 'Foreign Address', 'Foreign-Address' )
                      .replace( 'PID/Program name', 'PID/Program-name' )
                      .replace( 'Active IPX sockets', 'Active-IPX-sockets' )
                      .replace( 'Active NET/ROM sockets', 'Active-NET/ROM-sockets' )
                      .replace( 'Active AX.25 sockets', 'Active-AX.25-sockets' )
                      .split( /\s/ )
                      .filter( String );

    if( headers.length > 0 ){
      lines[ key ] = combine( headers, columns );
    }

    else if( columns[0] === 'Proto' ){
      headers = columns;
    }

  });

  return lines;
}

module.exports = parse;