import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Section, Title, ChatContainer, Message, User, Input, Button, Form, DeleteButton } from './styled';
import { useLocation, useNavigate } from 'react-router-dom';

const ipOrigin = 'http://192.168.3.20:3001';
const socket = io(ipOrigin); // 1. Import the jwt library
import CryptoJS from "crypto-js"; // 3. Importar a biblioteca crypto-js

function Chat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get('username') || '';

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('message', (data) => {
      // 4. Desencriptar a mensagem recebida
      const bytes = CryptoJS.AES.decrypt(data.encryptedPayload, process.env.REACT_APP_SECRETKEY); // PRECISA CRIAR ARQUIVO .env na raiz do projeto
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      setChatLog((prevChatLog) => [...prevChatLog, decryptedData]);
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

    if(messageData.user === '') {
      alert('Volte na pagina de login para escolher um nome de usuario');
      return navigate('/');
    }
    if(messageData.message === '') return alert('Não pode enviar string vasia');
    if(messageData.message.length > 200) return alert('Msg não pode ser maior que 200 char')

    socket.emit('message', messageData);

    // Salvar a mensagem no LocalStorage
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    storedMessages.push(messageData);
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

    setMessage('');
  };

  const handleClearMessages = () => {
    if (window.confirm('Tem certeza de que deseja limpar todas as mensagens para sempre ?')) {
      localStorage.removeItem('chatMessages');
      setChatLog([]);
    }
  };

  return (
    <Section>
      <Title>Chat</Title>
      <ChatContainer>
        {chatLog.map(({user, message}, index) => (
                  <Message key={index}>
                    <User>{user}: </User>
                    {message}
                  </Message>
        ))}
      </ChatContainer>
      <Form onSubmit={sendMessage}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type='submit'>Enviar</Button>
      </Form>
      <DeleteButton type='button' onClick={handleClearMessages}>Limpar Mensagens</DeleteButton>
    </Section>
  );

}

export default Chat;
