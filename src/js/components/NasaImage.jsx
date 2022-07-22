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
      // react recommends using the CleanUp functionality
      // requestError 429 => too many requests - limit reached
      getImage = null;
    };
  }, []);

  // if no image, then nothing should happen
  // unfortunately only very few requests possible, otherwise you have to log in

  //if (!imageState) {
  //return <LoaddingSpinner /* message="Wird geladen…" */ />;
  //}

  return <img src={imageState.url} alt={imageState.title} />;
}
