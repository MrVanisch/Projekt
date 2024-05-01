import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import MatchItem from './MatchItem';

const MatchesList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const matchesQuery = query(collection(db, 'matches'), where('action', '==', true));
      const matchSnapshot = await getDocs(matchesQuery);
      const matchesData = matchSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(match => match.action);  // Dodatkowe zabezpieczenie, jeśli potrzebne

      setMatches(matchesData);
    };

    fetchMatches();
  }, []);

  return (
    <div>
      {matches.map(match => (
        <MatchItem key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchesList;