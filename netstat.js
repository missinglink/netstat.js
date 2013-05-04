var child = require('child_process'),
  util = require('util'),
  netstat = child.spawn('netstat', ['-nb']),
  out = ''
 
netstat.stdout.on('data', function(data) {
  out += data
})
netstat.stderr.on('data', function(data) {
  console.log('err: ' + data)
})
netstat.on('exit', function(code) {
  var i, bucket = [], processes = {}
  if(code !== 0) {
    console.log('!!! exited, status code: ' + code)
    return
  }
 
  // parse & serialize netstat output
  out = out.split(/\n/)
  // drop the first three lines...
  for(i = 0; i <= 3; i++) out.shift()
  out.forEach(function(entry) {
    if(!entry) return
    entry = entry.replace(/^\s\s*/, '').replace(/\r/, '').replace('Can not obtain ownership information', '[???]').split(/[ ]+/)
    if(entry[0][0] == '[') {
      i = entry[0].replace(/^\[([^\]]+)\]$/, '$1')
      if(processes[i] === undefined) processes[i] = []
      processes[i] = processes[i].concat(bucket)
      bucket = []
    } else {
      bucket.push({
        conntype:entry[0],
        source:entry[1],
        dest:entry[2],
        //status:entry[3],
      })
    }
  })
  out = JSON.stringify(processes)
  // READY FOR DISPATCH! *salute*
})