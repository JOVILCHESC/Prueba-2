// Ejemplo en un componente que requiere permisos de usuario
import React from 'react';
import { useAuthorization } from '../helpers/AuthorizationContext';

const UserComponent = () => {
  const { isUser } = useAuthorization();

  if (isUser()) {
    return <div>Contenido para usuarios</div>;
  } else {
    return <div>No autorizado</div>;
  }
};

export default UserComponent;
