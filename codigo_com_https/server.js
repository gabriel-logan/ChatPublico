require('dotenv').config();
const fs = require('fs');
const https = require('https'); // Use o módulo 'https' em vez de 'http'
const io = require('socket.io');

const ipClient = 'https://chatlgbt.ddns.net'; // Certifique-se de usar 'https://' em vez de 'http://'
const ipProxy = 'https://apichatlgbt.ddns.net'; // se utilizar proxy passe o ip aq
const ipClientInterno = 'http://192.168.3.20:8080'; // para testes internos isso ja é suficiente
const port = 3001;
const users = {};

// 1. Importar a biblioteca crypto-js
const CryptoJS = require("crypto-js");

const options = {
  key: fs.readFileSync('key.pem'), // Substitua pelo caminho correto da sua chave privada
  cert: fs.readFileSync('cert.pem'), // Substitua pelo caminho correto do seu certificado público
  passphrase: '123456', // Substitua pela senha do seu certificado
};

const server = https.createServer(options); // Crie o servidor HTTPS com as opções especificadas
const socketIO = io(server, {
  cors: {
    origin: [ipClient, ipProxy, ipClientInterno],
    methods: ['GET', 'POST']
  }
});

socketIO.on('connection', (socket) => {
  const userId = socket.id;

  users[userId] = { id: userId };
  console.log(`Novo usuário conectado: ${userId}`);

  socket.on('message', async (payload) => {
    console.log(`Nova mensagem do usuário ${userId}`);

    // Desencriptar a mensagem recebida do client
    const bytes = CryptoJS.AES.decrypt(payload, process.env.REACT_APP_SECRETKEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Encriptar a mensagem antes de enviá-la para o cliente
    const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), process.env.SECRETKEY).toString();

    socketIO.emit('message', { encryptedPayload }); // Envia apenas o payload encriptado
  });

  socket.on('disconnect', () => {
    delete users[userId];
    console.log(`Usuário desconectado: ${userId}`);
  });
});

server.listen(port, () => {
  console.log(`Servidor Socket.io iniciado na porta ${port}`);
});
