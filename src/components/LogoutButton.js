// src/components/LogoutButton.js
import React from 'react';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Użytkownik wylogowany');
    }).catch((error) => {
      console.error('Błąd podczas wylogowywania:', error);
    });
  };

  return (
    <button onClick={handleLogout}>Wyloguj się</button>
  );
}

export default LogoutButton;