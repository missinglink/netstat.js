
var express = require('express');
var netstat = require('./netstat');
var path = require('path');
var app = express();

app.set( 'basepath', __dirname );
app.use( express.static( __dirname + '/public' ) );

dataCache = {};

netstat.on( 'data', function( data, graph ) {
  dataCache = data;
});

// netstat.on( 'stderr', function( err ) {
//   console.error( 'stderr', err );
// });

function convertToFlare( data ){

  var flare = {
    name: 'root',
    children: []
  };

  data.forEach( function( line ){
    if( line[ 'State' ] === 'LISTEN' ){

      var child = {
        name: line[ 'Local-Address' ],
        children: []
      };

      flare.children.push( child );
    }
  });

  return flare;
}

app.get( '/flare.json', function( req, res ){
  res.json( convertToFlare( dataCache ) );
});

app.listen( 2000 );
console.log( 'Started http service on port 2000' );