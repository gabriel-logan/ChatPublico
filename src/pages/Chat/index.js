/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom'; // 1. Import the jwt library
import CryptoJS from 'crypto-js';
import { IoSend } from 'react-icons/io5';
import Section from './styled';

const ipOrigin = 'http://192.168.3.20:3001';
const socket = io(ipOrigin); // 3. Importar a biblioteca crypto-js

function Chat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username') || '';

  const navigate = useNavigate();

  // 1. Crie uma referência para o elemento que contém as mensagens
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket.on('message', (data) => {
      // Desencriptar a mensagem recebida do servidor
      const bytes = CryptoJS.AES.decrypt(data.encryptedPayload, process.env.REACT_APP_SECRETKEY);
      // PRECISA CRIAR ARQUIVO .env na raiz do projeto
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      setChatLog((prevChatLog) => [...prevChatLog, decryptedData]);

      // 2. Rolagem automática para o final quando uma nova mensagem é adicionada
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    });

    // Recuperar mensagens do LocalStorage ao carregar o componente
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setChatLog(storedMessages);

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    const messageData = { user: username, message };

    // 2. Encriptar a mensagem antes de enviá-la para o servidor
    // eslint-disable-next-line max-len
    const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(messageData), process.env.REACT_APP_SECRETKEY).toString();

    if (messageData.user === '') {
      alert('Volte na pagina de login para escolher um nome de usuario');
      return navigate('/');
    }
    if (messageData.message === '') return alert('Não pode enviar string vasia');
    if (messageData.message.length > 200) return alert('Msg não pode ser maior que 200 char');

    // Envia a mensagem encriptada
    socket.emit('message', encryptedPayload);

    // Salvar a mensagem no LocalStorage
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    storedMessages.push(messageData);
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

    // Rolagem automática para o final quando a mensagem é enviada
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }

    return setMessage('');
  };

  const handleClearMessages = () => {
    if (window.confirm('Tem certeza de que deseja limpar todas as mensagens para sempre ?')) {
      localStorage.removeItem('chatMessages');
      setChatLog([]);
    }
  };

  return (
    <Section>
      <h1>Chat</h1>
      <div className="chatContainer" ref={messagesContainerRef}>
        {chatLog.map(({ user, message: messageMap }, index) => (
          <div className="message" key={index}>
            <div className="user">
              {user}
              :
              {' '}
            </div>
            <p>
              {messageMap}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <textarea
          type="text"
          value={message}
          maxLength={200}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button aria-label="enviar" className="sendButton" type="submit"><IoSend size={24} /></button>
      </form>
      <button className="deleteButton" type="button" onClick={handleClearMessages}>Limpar Mensagens</button>
    </Section>
  );
}

export default Chat;
