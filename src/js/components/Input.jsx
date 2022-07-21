import { useState, useReducer, useEffect, useRef } from 'react';

// Fehlermeldungen für die Usereingabe
function errorMassageReducer(currentErrorState, error) {
  switch (error.type) {
    case 'short':
      return 'Der Text muss midestent aus drei und maximal aus 63 Zeichen bestehen.';
    case 'character':
      const text = ' Der Text enthält nicht gültige Zeichen.';
      return currentErrorState ? currentErrorState + text : text;
    case 'clear':
      return null;

    default:
      throw new Error('Feler bei der Felerausgabe');
  }
}

export default function Input({
  setInputValue,
  onKeyPressHeandler,
  valueText,
}) {
  const [errorState, errorDispatch] = useReducer(errorMassageReducer, null);
  const [currentInputValue, setCurrentInputValue] = useState(valueText);
  const inputRef = useRef();

  useEffect(() => {
    // überprüft was User eintippt und ob der Vorgaben entspricht
    // Timeout = Verzögerer
    // Inputverzögerer vlt im wirklichen Projekt nicht verwenden,
    // wenn man beim editieren zu schnell Return macht, dann wird nicht gespeichert
    // bzw beim anlegen des Items muss man warten bis man speichern kann

    const idTimeout = setTimeout(() => {
      // braucht die useRef sonst geht die JS Pattern Überprüfunge nicht
      // im Zusammenhang mit dem Verzögerer
      const inputField = inputRef.current;

      inputField.pattern = '[0-9A-Za-z.-ß?üäöÜÄÖ ]{3,363}';
      const isCount = /^.{3,363}$/.test(currentInputValue);
      const isCharacter = /^[0-9A-Za-z.-ß?üäöÜÄÖ ]+$/.test(currentInputValue);

      errorDispatch({ type: 'clear' });
      !isCount && errorDispatch({ type: 'short' });
      !isCharacter && errorDispatch({ type: 'character' });

      if (inputField.validity.valid) {
        setInputValue(currentInputValue);
      }
    }, 600);

    return () => clearTimeout(idTimeout);
  }, [currentInputValue]);

  return (
    <div>
      <input
        type="text"
        value={currentInputValue}
        autoFocus
        onKeyPress={onKeyPressHeandler}
        onChange={(e) => {
          setCurrentInputValue(e.target.value);
        }}
        ref={inputRef}
        placeholder="Eintrag ..."
      />
      {errorState && <p className="errorMessage">{errorState}</p>}
    </div>
  );
}
