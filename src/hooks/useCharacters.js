import { useState, useEffect } from 'react';
import { unwantedPersons } from '../data/unwantedPersons';

function filterData(data) {
  return data.filter(
    (item) =>
      !unwantedPersons.some(
        (p) =>
          p.person === item.person.name && p.character === item.character.name
      )
  );
}

export default function useCharacters() {
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      async function fetchCharacters() {
        try {
          const response = await fetch(
            'https://api.tvmaze.com/shows/55138/cast',
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error('Failed to fetch characters.');

          const data = await response.json();
          setCharacters(filterData(data));
        } catch (err) {
          if (err.name !== 'AbortError') setError(err.message);
        }
      }

      fetchCharacters();
    }, 3000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { characters, error };
}
