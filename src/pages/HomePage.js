import React from 'react';
import UploadMusic from '../components/UploadMusic';
import SwipeCards from '../components/SwipeCards';
const HomePage = () => {
  return (
    <div>
      <h1>Strona Główna</h1>
      <p>Witaj na stronie głównej! Tutaj możesz przesyłać swoje utwory i przeglądać profile innych artystów.</p>
      <UploadMusic />
      <SwipeCards />
    </div>
  );
};

export default HomePage;