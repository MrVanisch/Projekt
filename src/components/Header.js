import React from 'react';
import { Link } from 'react-router-dom'; // Import komponentu Link
const Header = ({ user }) => {
  return (
    <header style={{ padding: '10px', fontSize: '24px', color: '#333', textAlign: 'center' }}>
      {user ? 'Zalogowany' : 'Wylogowany'}
      {user && (
        <nav>
          {/* Link do strony głównej */}
          <Link to="/">Home</Link>
          {/* Link do strony Matches */}
          <Link to="/matches">My Matches</Link>
          {/* Dodatkowe przyciski lub linki, jeśli są potrzebne */}
        </nav>
      )}
    </header>
  );
}

export default Header;
