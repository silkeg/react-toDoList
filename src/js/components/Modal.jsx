import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import { useModalDispatchContext } from '../store/modalContext';
import { useItemsDispatchContext } from '../store/itemContext';

// if there is a parameter (Modal(Parameter){}), then the itme is edited (values of the item is dispatch)
// itemValue = {itemText: 'something', itemId: 1649363055574}
// parameter=null, that means creating one new item
export default function Modal({ itemValue }) {
  const showModal = useModalDispatchContext();
  const itemsDispatch = useItemsDispatchContext();

  const [inputValue, setInputValue] = useState('');
  const [markedValue, setMarkedValue] = useState(false);

  // creating Item after checking
  function store() {
    if (inputValue.length && !itemValue.itemId) {
      const newItem = {
        itemText: inputValue,
        itemMarked: markedValue,
        itemId: Date.now(),
        itemType: 'current',
      };
      itemsDispatch({ type: 'add', newItem }); // new item will be display in the list
      showModal(false);
    }
    if (itemValue.itemId) {
      const itemId = itemValue.itemId;
      itemsDispatch({ type: 'edit', itemId, inputValue });
      showModal(false);
    }
  }
  // after user's return and the check, new item will be created
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
