let connections = [];

self.onconnect = function(event) {
  let port = event.ports[0];
  connections.push(port);

  port.onmessage = function(event) {
    for (let i = 0; i < connections.length; i++) {
      connections[i].postMessage(event.data);
    }
  }
};