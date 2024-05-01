// src/pages/LoginPage.js
import React from 'react';
import GoogleSignIn from '../components/GoogleSignIn';

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <GoogleSignIn />
    </div>
  );
}

export default LoginPage;