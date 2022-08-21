import React, { useEffect, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

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

  function changeColorHTML(color) {
    document.getElementsByTagName('html')[0].className = color;
    //document.documentElement.style.setProperty('--color-basic','rgb(0, 116, 139)');
  }

  useEffect(() => {
    colorState && changeColorHTML(colorState);
    localStorage.setItem(
      'pageColor',
      JSON.stringify({ pageColor: colorState })
    );
  }, [colorState]);

  function pageTitleHeandler(e) {
    // if the headline is clicked, you can customise them, finish with return
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
