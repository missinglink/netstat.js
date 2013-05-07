# netstat.js

### A simple js wrapper for the netstat daemon.

Allows you to output network statistics in real-time through stdout or via a socketio server.


Output is available in json or as raw stdout lines.

---

# Installing

```bash
$ npm install netstat --save
```

Note: you will need `node` and `npm` installed first.

The easiest way to install `node.js` is with [nave.sh](https://github.com/isaacs/nave) by executing `[sudo] ./nave.sh usemain 0.10`

You will need `netstat` installed, this is not a replacement for `netstat`; just a wrapper. On most unix-like systems it should be provided by default by the `net-tools` package.

---

# Getting data from netstat

```javascript
var netstat = require('netstat');

netstat.on( 'stdout', function( data ){
  process.stdout.write(
    JSON.stringify( netstat.parse( data ), null, 2 ) + '\n'
  );
});

netstat.on( 'stderr', function( err ) {
  process.stderr.write( err );
});
```

Example output:

```bash
[
  {
    "Proto": "tcp",
    "Recv-Q": "0",
    "Send-Q": "0",
    "Local-Address": "192.168.0.15:13887",
    "Foreign-Address": "95.91.245.60:29101",
    "State": "ESTABLISHED",
    "User": "1000",
    "Inode": "151487",
    "PID/Program-name": "9738/spotify"
  },
  {
    "Proto": "tcp",
    "Recv-Q": "0",
    "Send-Q": "0",
    "Local-Address": "192.168.0.15:13887",
    "Foreign-Address": "148.177.128.81:21404",
    "State": "ESTABLISHED",
    "User": "1000",
    "Inode": "152049",
    "PID/Program-name": "9738/spotify"
  }
]
```

---

# Binary version

You can install `netstatjs` globally by executing `[sudo] npm install -g netstat`

If you installed locally then you can execute it like this `./node_modules/netstatjs/bin/netstatjs --help`

The binary version has a few nice features like daemonizing & sending json stats to stdout or via socketio.

```bash
peter@edgy:/var/www$ netstatjs --help

  Usage: netstatjs [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -s, --socketio [port]  bind socketio to port and stream stats in json
    -j, --json [indent]    pipe json stats to stdout/stderr
    -r, --raw              pipe raw stats to stdout/stderr

```

---

# Examples

More examples can be found in `/bin/command/*`.

# Status

This module is usable but not yet feature rich, netstat provides heaps more cool features that are not yet supported. Please star, fork and pull request if you find this useful.

# License

```javascript
Released under the MIT(Poetic) Software license

This work 'as-is' we provide.
No warranty express or implied.
Therefore, no claim on us will abide.
Liability for damages denied.

Permission is granted hereby,
to copy, share, and modify.
Use as is fit,
free or for profit.
These rights, on this notice, rely.
```