import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import { useModalDispatchContext } from '../store/modalContext';
import { useItemsDispatchContext } from '../store/itemContext';

// wenn der Parameter im Modal(Parameter){} = vorhanden ist => dann wird Item editiert (Werte vom Item übergeben)
// itemValue = {itemText: 'Zitrone', itemId: 1649363055574}
// Parameter=null dh es wird "nur" ein neues Item angelegt
export default function Modal({ itemValue }) {
  const showModal = useModalDispatchContext();
  const itemsDispatch = useItemsDispatchContext();

  const [inputValue, setInputValue] = useState('');
  const [markedValue, setMarkedValue] = useState(false);

  //legt ListenItem an nachPrüfung
  function store() {
    if (inputValue.length && !itemValue.itemId) {
      const newItem = {
        itemText: inputValue,
        itemMarked: markedValue,
        itemId: Date.now(),
        itemType: 'current',
      };
      itemsDispatch({ type: 'add', newItem }); // Schickt neuen Eintag an die ItemsListe
      showModal(false);
    }
    if (itemValue.itemId) {
      const itemId = itemValue.itemId;
      itemsDispatch({ type: 'edit', itemId, inputValue });
      showModal(false);
    }
  }
  // Wenn Return dann wird nach Prüfung neues ListenItem angeleigt
  function returnEvent(e) {
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      store();
    }
  }

  return (
    <div
      className="modal"
      onClick={(evt) =>
        evt.target.classList.contains('modal') && showModal(false)
      }
    >
      <div>
        <Input
          valueText={itemValue.itemText ? itemValue.itemText : ''}
          onKeyPressHeandler={returnEvent}
          setInputValue={setInputValue}
        />

        <Button
          classCss={`btn-icon--marked ${
            markedValue && 'btn-icon--marked--active'
          }`}
          text="Markieren"
          onClickHeandler={() => setMarkedValue(true)}
        />
        <Button
          isDisabled={inputValue.length < 3}
          classCss="btn-icon--store"
          text="Speichern"
          onClickHeandler={store}
        />
        <Button
          classCss="btn-icon--delete"
          text="Schließen"
          onClickHeandler={() => showModal(false)}
        />
      </div>
    </div>
  );
}
