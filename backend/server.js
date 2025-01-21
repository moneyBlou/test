const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log('received: %s', message);
          wss.clients.forEach(client => {
                if ( client.readyState === WebSocket.OPEN) { // Проверка только на открытое соединение
                    client.send(message);
                }
          });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', error => {
       console.error('WebSocket Error:', error);
  });
});

console.log('WebSocket server started on port 8080');