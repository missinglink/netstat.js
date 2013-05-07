
module.exports = function( data ){

  relations = [];
  tree = {};

  data.forEach( function( line ){

    if( line['Local-Address'] && line['Local-Address'].match(/(\d{0,3})\.(\d{0,3})\.(\d{0,3})\.(\d{0,3}):(\d{0,5})/) ){
      relations.push({
        local: ( line['Local-Address'] || '' ).split(':'),
        state: line['State'],
        foreign: ( line['Foreign-Address'] || '' ).split(':')
      });
    }

  });

  relations.forEach( function( relation ){

    if( relation.local[0] && relation.local[1] ){

      if( !tree[ relation.local[0] ] ){
        tree[ relation.local[0] ] = {};
      }

      if( !tree[ relation.local[0] ][ relation.local[1] ] ){
        tree[ relation.local[0] ][ relation.local[1] ] = [];
      }

      tree[ relation.local[0] ][ relation.local[1] ].push( relation );
    }

  });

  return tree;
};