import { useState, useReducer, useEffect, useRef } from 'react';

// error messages for the user's input
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
    setInputValue('');
    // checks what the user types and whether it corresponds to the specifications
    // Timeout = retarder/debouncing
    // retarder -> maybe don't use input in the real project
    // the problem: if you return too quickly when editing, the item is not saved
    // and if you  creating a new item, you have to wait for saving

    const idTimeout = setTimeout(() => {
      // useRef is needed, because of the check of the js pattern
      // in the context with the retarder
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
    }, 500);

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
