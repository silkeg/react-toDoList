import { createContext, useContext, useReducer, useEffect } from 'react';

// Hook erleichtert das Importieren
const ItemsStateContext = createContext(false);
export function useItemsStateContext() {
  return useContext(ItemsStateContext);
}

const ItemsDispatchContext = createContext(false);
export function useItemsDispatchContext() {
  return useContext(ItemsDispatchContext);
}

// schaut im Browserspeicher ob Daten vorliegen
function getInitialItems() {
  const oldList = JSON.parse(localStorage.getItem('list'));
  return Array.isArray(oldList) ? oldList : [];
}

// je nach dem auf welchen Butten in der Liste klickt, wird eine Aktion ausgeführt
function itemReducer(items, message) {
  switch (message.type) {
    case 'add':
      return [message.newItem, ...items];

    case 'edit':
      return items.map((item) => {
        if (item.itemId === message.itemId) {
          //  wichtig, React zeigen, das es was neues gibt
          return { ...item, itemText: message.inputValue };
        }
        return item;
      });

    case 'remove':
      return items.filter((item) => item.itemId !== message.itemId);

    case 'marked':
      return items.map((item) => {
        if (item.itemId === message.itemId) {
          return { ...item, itemMarked: !item.itemMarked };
        }
        return item;
      });

    case 'done':
      return items.map((item) => {
        if (item.itemId === message.itemId) {
          return { ...item, itemType: 'done' };
        }
        return item;
      });

    case 'current':
      return items.map((item) => {
        if (item.itemId === message.itemId) {
          return { ...item, itemType: 'current' };
        }
        return item;
      });

    case 'down':
      //  wichtig, besser ein neues Array anlegen damit React erkennt, dass es was neues gibt
      const oldIndex = items.findIndex(
        ({ itemId }) => itemId === message.itemId
      );
      const postponeItem = items.filter(
        ({ itemId }) => itemId === message.itemId
      );
      const filteredItems = items.filter(
        ({ itemId }) => itemId !== message.itemId
      );
      filteredItems.splice(oldIndex + 1, 0, postponeItem[0]);
      return filteredItems;

    case 'up':
      filteredArray = [...items];
      message.indexNr > 0 &&
        filteredArray.splice(
          message.indexNr - 1,
          0,
          filteredArray.splice(message.indexNr, 1)[0]
        );
      return filteredArray;

    case 'emptyDone':
      return items.filter((item) => item.itemType !== 'done');

    default:
      throw new Error('Fehler beim Daten auswerten');
  }
}

export default function ItemsContextProvider({ children }) {
  // Verwaltung der gesamten Liste mit all möglichen Items
  const [itemsState, itemsDispatch] = useReducer(
    itemReducer,
    null,
    getInitialItems
  );

  // wenn Item hinzukommt, wird dieses im BrowserSpeicher gespeichert
  useEffect(
    () => localStorage.setItem('list', JSON.stringify(itemsState)),
    [itemsState]
  );

  return (
    <ItemsStateContext.Provider value={itemsState}>
      <ItemsDispatchContext.Provider value={itemsDispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsStateContext.Provider>
  );
}
