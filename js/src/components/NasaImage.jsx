import { useEffect, useState } from 'react';
import LoaddingSpinner from './LoadingSpinner';

export default function NasaImage() {
  const [imageState, setImageState] = useState('');

  useEffect(() => {
    const URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

    const getImage = async () => {
      try {
        const respons = await fetch(URL);

        if (!respons.ok) {
          throw new Error('Image konnte nicht geladen werden');
        }

        const dataJson = await respons.json();
        setImageState(dataJson);
      } catch (error) {
        throw new Error('Fehler beim Image - konnte nicht geladen werden');
      }
    };
    getImage();
    return () => {
      // react ermahnt hier die CleanUp Funktionalität zu benutzen
      // als RequestFehler 429 => zu viele Abrufe war - Limit erreicht
      getImage = null;
    };
  }, []);

  // wenn kein Bild geladen werden kann, weil zB zu viele Requests, dann soll nix passieren
  // leider nur sehr wenig Request möglich, sonst muss man sich anmelden
  // hätte vielleicht doch ein Pixum Image nehmen sollen, dann hätte ich auch width und height setzen können
  //if (!imageState) {
  //return <LoaddingSpinner /* message="Wird geladen…" */ />;
  //}

  return <img src={imageState.url} alt={imageState.title} />;
}
