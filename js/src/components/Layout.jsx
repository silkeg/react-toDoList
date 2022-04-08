import React, { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

function changeColorHTML(color) {
  const colors = {
    blue: {
      colorBasic: 'rgb(7, 87, 129)',
      colorBasicLight: 'rgb(120, 198, 240)',
      colorMedium: 'rgb(212, 225, 238)',
      colorLight: 'rgb(241, 247, 252)',
      colorHighlighted: 'rgb(139, 207, 4)',
    },
    red: {
      colorBasic: 'rgb(0, 116, 139)', //'rgb(209, 3, 3)',
      colorBasicLight: 'rgb(233, 201, 201)',
      colorMedium: 'rgb(212, 225, 238)',
      colorLight: 'rgb(241, 247, 252)',
      colorHighlighted: 'rgb(41, 77, 97)', //'rgb(146, 47, 47)',
    },
    dark: {
      colorBasic: 'rgb(31, 44, 58)',
      colorBasicLight: 'rgb(84, 116, 139)',
      colorMedium: 'rgb(212, 225, 238)',
      colorLight: 'rgb(241, 247, 252)',
      colorHighlighted: 'rgb(139, 207, 4)',
    },
  };

  document.documentElement.style.setProperty(
    '--color-basic',
    colors[color].colorBasic
  );
  document.documentElement.style.setProperty(
    '--color-basic-light',
    colors[color].colorBasicLight
  );
  document.documentElement.style.setProperty(
    '--color-medium',
    colors[color].colorMedium
  );
  document.documentElement.style.setProperty(
    '---color-light',
    colors[color].colorLight
  );
  document.documentElement.style.setProperty(
    '--color-highlighted',
    colors[color].colorHighlighted
  );
}

export default function Layout({ children }) {
  const [pageTitleState, setPageTitle] = useState(getInitPageTitle);
  const [changeTitleState, setChangeTitle] = useState(false);
  const [colorState, setColor] = useState(getInitPageColor);
  const [changeColorState, setChangeColor] = useState('');

  useDocumentTitle(pageTitleState);

  function getInitPageTitle() {
    const oldPageTitle = JSON.parse(localStorage.getItem('pageTitle'));
    return oldPageTitle ? oldPageTitle.pageTitle : 'Merkliste';
  }

  function getInitPageColor() {
    const oldPageColor = JSON.parse(localStorage.getItem('pageColor'));
    return oldPageColor ? oldPageColor.pageColor : null;
  }

  useEffect(() => {
    colorState && changeColorHTML(colorState);
    localStorage.setItem(
      'pageColor',
      JSON.stringify({ pageColor: colorState })
    );
  }, [colorState]);

  function pageTitleHeandler(e) {
    // wenn man auf Überschrift klick, kann man diese anpassen
    // man beendet und bestätigt die Eingabe durch Return
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      localStorage.setItem(
        'pageTitle',
        JSON.stringify({ pageTitle: pageTitleState })
      );
      setChangeTitle(false);
    }
  }

  return (
    <>
      <header className="main--header flex-space-between">
        <h1 onClick={() => setChangeTitle(true)} className="main--header--name">
          {changeTitleState ? (
            <input
              type="text"
              autoFocus
              onKeyPress={pageTitleHeandler}
              value={pageTitleState}
              onChange={(evt) => setPageTitle(evt.target.value)}
            />
          ) : (
            pageTitleState
          )}
        </h1>
        <div className="chenage-color">
          <button
            onClick={() => setChangeColor('chenage-color__btn--active')}
            className={'btn-icon btn-icon--color ' + changeColorState}
          >
            <span>Farbe wählen</span>
          </button>
          <ul className="chenage-color__btn">
            <li
              onClick={() => {
                setChangeColor('');
                setColor('blue');
              }}
            >
              blau
            </li>
            <li
              onClick={() => {
                setChangeColor('');
                setColor('red');
              }}
            >
              rot
            </li>
            <li
              data-color="dark"
              onClick={() => {
                setChangeColor('');
                setColor('dark');
              }}
            >
              dark
            </li>
          </ul>
        </div>
      </header>
      <section className="main--section">{children}</section>
    </>
  );
}
