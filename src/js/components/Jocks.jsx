import { useEffect, useState } from 'react';
import LoaddingSpinner from './LoadingSpinner';

export default function Jocks() {
  const [jocks, setjocks] = useState('');

  useEffect(() => {
    const URL = 'https://api.chucknorris.io/jokes/random?category=food';

    async function getJocks() {
      try {
        const respons = await fetch(URL);

        if (!respons.ok) {
          throw new Error('Jocks konnten nicht geladen werden');
        }

        const dataJson = await respons.json();
        setjocks(dataJson);
      } catch (error) {
        throw new Error('Fehler bei Jocks - konnten nicht geladen werden');
      }
    }
    getJocks();
  }, []);

  if (!jocks) {
    return <LoaddingSpinner /* message="Wird geladen…" */ />;
  }

  return (
    <div className="jocks">
      <p>
        <strong>Chuck Norris Witz:</strong>
        <br />
        {jocks.value}
      </p>
    </div>
  );
}
