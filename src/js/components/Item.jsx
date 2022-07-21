import Button from './Button';
import { useModalDispatchContext } from '../store/modalContext';
import { useItemsDispatchContext } from '../store/itemContext';
import { useCurrentListStateContext } from '../store/currentListStateContext';
import useToggle from '../hooks/useToggle';

export default function Item({
  itemText,
  itemMarked,
  itemId,
  itemType,
  indexNr,
}) {
  const showModal = useModalDispatchContext();
  const itemsDispatch = useItemsDispatchContext(); // ItemsListe

  // langer Text wird ausgepunktet und auf Klick komplett angezeigt
  // diese Variante zählt Zeichenanzahl, zu überlegen ob man Wörter zählt, damit
  // nicht im Wort ausgepunktet wird oder beide kombinieren
  const [shortTextState, toggleText] = useToggle(true);
  function getShortText(text, maxWords = 10, suffix = ' ...') {
    const letter = Array.from(text);
    if (letter.length <= maxWords) return text;
    const cuttedText = letter.splice(0, maxWords);
    return cuttedText.reduce((text, letter) => text + letter, '') + suffix;
  }

  // zum disabelm der hoch und runter Button wenn erste bzw lezte Element in Liste
  const isFirst = { ...useCurrentListStateContext()[0] }.itemId === itemId;
  const isLast =
    { ...useCurrentListStateContext()[useCurrentListStateContext().length - 1] }
      .itemId === itemId;

  return (
    <li className={itemMarked && itemType === 'current' ? 'list--marked' : ''}>
      <span className="list__text" onClick={toggleText}>
        {shortTextState ? getShortText(itemText, 33) : itemText}
      </span>
      <div className="menue--wrapper">
        <h4 className="menue--btn">Menü</h4>
        <div className="menue">
          {itemType === 'current' && (
            <Button
              classCss=" btn-icon--edit"
              text="Eintrag anpassen"
              onClickHeandler={() => showModal({ itemText, itemId })}
            />
          )}
          {itemType === 'current' && (
            <Button
              classCss="btn-icon--marked"
              text="Markieren"
              onClickHeandler={() => itemsDispatch({ type: 'marked', itemId })}
            />
          )}
          {itemType === 'current' && (
            <Button
              classCss="btn-icon--done"
              text="Erledigt!"
              onClickHeandler={() => itemsDispatch({ type: 'done', itemId })}
            />
          )}
          {itemType === 'current' && (
            <Button
              isDisabled={isLast}
              classCss="btn-icon--down"
              text="Nach unten verschieben"
              onClickHeandler={() =>
                itemsDispatch({ type: 'down', itemId, indexNr })
              }
            />
          )}
          {itemType === 'current' && (
            <Button
              isDisabled={isFirst}
              classCss="btn-icon--up"
              text="Nach oben verschieben"
              onClickHeandler={() =>
                itemsDispatch({ type: 'up', itemId, indexNr })
              }
            />
          )}
          {itemType === 'done' && (
            <Button
              classCss="btn-icon--move-todo"
              text="In die ToDo verschieben"
              onClickHeandler={() => itemsDispatch({ type: 'current', itemId })}
            />
          )}
          <Button
            classCss="btn-icon--delete"
            text="Listeneintrag löschen"
            onClickHeandler={() => itemsDispatch({ type: 'remove', itemId })}
          />
          ;
        </div>
      </div>
    </li>
  );
}
