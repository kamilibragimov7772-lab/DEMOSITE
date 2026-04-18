import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RoleProvider } from './context/RoleContext';
import { AuditProvider } from './context/AuditContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuditProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </AuditProvider>
    </BrowserRouter>
  </React.StrictMode>
);
