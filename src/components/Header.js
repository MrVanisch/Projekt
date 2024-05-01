import React from 'react';

const Header = ({ user }) => {
  return (
    <header style={{ padding: '10px', fontSize: '24px', color: '#333', textAlign: 'center' }}>
      {user ? 'Zalogowany' : 'Wylogowany'}
    </header>
  );
}

export default Header;