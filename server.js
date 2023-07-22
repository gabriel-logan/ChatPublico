/* eslint-disable max-len */
require('dotenv').config();
const server = require('http').createServer();

const ipClient = 'http://192.168.3.20:8080'; // Certifique-se de usar 'https://' em vez de 'http://'
const io = require('socket.io')(server, {
  cors: {
    origin: ipClient,
    methods: ['GET', 'POST'],
  },
});

const port = 3001;
const users = {};

// 1. Importar a biblioteca crypto-js
const CryptoJS = require('crypto-js');

io.on('connection', (socket) => {
  const userId = socket.id;

  users[userId] = { id: userId };
  console.log(`Novo usuário conectado: ${userId}`);

  socket.on('message', async (payload) => {
    console.log(`Nova mensagem do usuário ${userId}`);

    // Desencriptar a mensagem recebida do client
    const bytes = CryptoJS.AES.decrypt(payload, process.env.SECRETKEY); // PRECISA CRIAR ARQUIVO .env na raiz do projeto
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Encriptar a mensagem antes de enviá-la para o cliente
    const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), process.env.SECRETKEY).toString(); // PRECISA CRIAR ARQUIVO .env na raiz do projeto

    io.emit('message', { encryptedPayload }); // Envia apenas o payload encriptado
  });

  socket.on('disconnect', () => {
    delete users[userId];
    console.log(`Usuário desconectado: ${userId}`);
  });
});

server.listen(port, () => {
  console.log(`Servidor Socket.io iniciado na porta ${port}`);
});
