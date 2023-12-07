// AuthorizationContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const { user } = useUser();

  // Verifica si el usuario tiene permisos de usuario
  const isUser = () => user && user.role === 'user';

  // Verifica si el usuario tiene permisos de organización
  const isOrganization = () => user && user.role === 'organization';

  return (
    <AuthorizationContext.Provider value={{ isUser, isOrganization }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error('useAuthorization debe ser utilizado dentro de un AuthorizationProvider');
  }
  return context;
};
