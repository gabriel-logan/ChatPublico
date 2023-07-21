import React from 'react';
// Servidores de rota do react
import { Route, Routes } from 'react-router-dom';

// Minhas paginas
import Login from '../pages/Login';
import Chat from '../pages/Chat';

// Pagina 404
import NotFoundPage from '../pages/NotFoundPage';

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
