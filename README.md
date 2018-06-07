# PirateBay Client for Node.js

This is a client for ThePirateBay torrent indexing site. It can be used to fetch torrents by providing a search string. It supports both promises and callbacks. 

## Example

```javascript
var client = require('@abskmj/torfeat-piratebay')();

client.search('1080p')
.then(function(results){
    console.log(results);
});

client.search('720p', function(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    }
})
```

# Other Domain / Proxy
By default, this client connects to `https://pirateproxy.cam`. It has option to specify another domain, in case this domain doesn't work for you. 

## Example
```javascript
var client = require('@abskmj/torfeat-piratebay')({
    domain: 'https://tpb.zone'
});
```