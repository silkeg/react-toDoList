import { useModalDispatchContext } from '../store/modalContext';
import { useCurrentListStateContext } from '../store/currentListStateContext';
import {
  useItemsStateContext,
  useItemsDispatchContext,
} from '../store/itemContext';

import Item from './Item';
import Button from './Button';
import NasaImage from './NasaImage';

export default function List({ displayList, imageRender }) {
  const showModal = useModalDispatchContext();
  const items = useItemsStateContext(); // ItemsList
  const itemsDispatch = useItemsDispatchContext();

  // List Done wird zusätzlich unter die Current List angezeigt, aber nur wenn Eintärge vorhanden
  const isDoneList = items.some((item) => item.itemType === 'done');

  // Regelt die Anzeige, welche Liste angezeigt wird, je nach dem was im Menü auf der Seite angeklickt wurde
  function getDisplayList() {
    switch (displayList.type) {
      case 'all':
        return [...useCurrentListStateContext()];

      case 'current':
        return [...useCurrentListStateContext()];

      case 'done':
        return items.filter(({ itemType }) => itemType === 'done');

      case 'marked':
        return items.filter(({ itemMarked }) => itemMarked);

      default:
        return [...useCurrentListStateContext()];
    }
  }

  return (
    <>
      <div className="list--current">
        {!imageRender && (
          <header className="header--section flex-space-between">
            <h2 className="list__item--active">{displayList.text}</h2>
            {displayList.type !== 'done' && (
              <span>
                <Button
                  classCss="btn-icon--add"
                  text="Item hinzufügen"
                  onClickHeandler={() => showModal(true)}
                />
              </span>
            )}
          </header>
        )}
        <ul className="list">
          {getDisplayList(displayList).length === 0 &&
            displayList.type !== 'done' && (
              <li>
                <span>
                  <button
                    className="list__item-first__btn"
                    onClick={() => showModal(true)}
                  >
                    Hier Listeneintrag anlegenn
                  </button>
                </span>
                {imageRender && <NasaImage />}
              </li>
            )}
          {displayList.type === 'done' && <p>Leer hier 🧐.</p>}
          {getDisplayList(displayList.type).map((item, index) => (
            <Item key={item.itemId} {...item} indexNr={index} />
          ))}
        </ul>
      </div>

      {isDoneList && displayList.type === 'all' && (
        <div className="list--done">
          <header className="header--section flex-space-between">
            <h3>Erledigt</h3>
            <Button
              classCss="btn-icon--delete"
              text="Liste leeren"
              onClickHeandler={() => itemsDispatch({ type: 'emptyDone' })}
            />
          </header>
          <ul className="list">
            {items.map(
              (item, index) =>
                item.itemType === 'done' && (
                  <Item key={item.itemId} {...item} indexNr={index} />
                )
            )}
          </ul>
        </div>
      )}
    </>
  );
}
