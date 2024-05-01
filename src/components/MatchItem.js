import React from 'react';
import { Link } from 'react-router-dom';

const MatchItem = ({ match }) => {
  return (
    <div className="match-item">
      <img src={match.photoURL} alt={match.displayName} style={{ width: 50, height: 50, borderRadius: '50%' }} />
      <Link to={`/chat/${match.userId}`}>
        <h4>{match.displayName}</h4>
      </Link>
    </div>
  );
};

export default MatchItem;