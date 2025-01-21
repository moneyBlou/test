let socket = null; // Объявляем переменную socket в глобальной области видимости

const messagesDiv = document.getElementById('messages');
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');

connectButton.addEventListener('click', () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to server');
            connectButton.disabled = true;
            disconnectButton.disabled = false;
        };

        socket.onmessage = event => {
            console.log('Message from server:', event.data);
              const reader = new FileReader();
                reader.onload = function(e) {
                    const messageText = e.target.result;
                     const messageDiv = document.createElement('div');
                     messageDiv.textContent = messageText;
                     messagesDiv.appendChild(messageDiv);
                };
              reader.readAsText(event.data);
        };

        socket.onclose = () => {
            console.log('Disconnected from server');
            connectButton.disabled = false;
            disconnectButton.disabled = true;
        };

        socket.onerror = error => {
          console.error('WebSocket Error:', error);
         };
    }
});

disconnectButton.addEventListener('click', () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      connectButton.disabled = false;
      disconnectButton.disabled = true;
    }
});

document.getElementById('sendButton').addEventListener('click', () => {
     if (socket && socket.readyState === WebSocket.OPEN) {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
           if (message.trim() !== "") {
              socket.send(message);
              messageInput.value = '';
           }
      } else {
        alert('Соединение не установлено. Нажмите "Установить соединение"');
      }
  });