import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Label } from './styled';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Nome de usuário:', username);
    if(username === '') alert('Nome não pose ser vasio');
    navigate(`/Chat?username=${encodeURIComponent(username)}`);
  };
  

  return (
    <Form className="username-input" onSubmit={handleFormSubmit}>
      <Label htmlFor="username">Digite seu nome de usuário:</Label>
      <Input
        type="text"
        id="username"
        value={username}
        onChange={handleInputChange}
      />
      <Button type="submit">Entrar</Button>
    </Form>
  );
}

export default Login;
