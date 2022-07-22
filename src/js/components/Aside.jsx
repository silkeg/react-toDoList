import { useItemsStateContext } from '../store/itemContext';
import { useCurrentListStateContext } from '../store/currentListStateContext';

import Button from './Button';
import useToggle from '../hooks/useToggle';

export default function Aside({ displayList, setDisplayList }) {
  // ItemListe
  const items = useItemsStateContext();

  // display the number
  const markedItemsCount = items.filter(({ itemMarked }) => itemMarked).length;
  const doneItemsCount = items.filter(
    ({ itemType }) => itemType === 'done'
  ).length;
  const currentItemsCount = useCurrentListStateContext().length;

  const [isSidebar, toggleSidbar] = useToggle(true);

  return (
    <aside className={isSidebar ? 'sidebar sidebar--hidden' : 'sidebar'}>
      <header className="flex-space-between header--sidebar">
        <h2>Übersicht</h2>
        <Button
          classCss="btn-icon btn-icon--menue"
          text="Menü ein/ausblenden"
          onClickHeandler={toggleSidbar}
        >
          <span>Menü</span>
        </Button>
      </header>
      <ul className="list">
        <li
          className={displayList.type === 'all' ? 'list__item--active' : ''}
          onClick={() => setDisplayList({ type: 'all', text: 'Alle ToDos' })}
        >
          <span>Alle ToDos</span>
          <span>{items.length}</span>
        </li>
        <li
          className={displayList.type === 'current' ? 'list__item--active' : ''}
          onClick={() =>
            setDisplayList({ type: 'current', text: 'Noch zu erledigen' })
          }
        >
          <span>Noch zu erledigen</span>
          <span>{currentItemsCount}</span>
        </li>
        <li
          className={displayList.type === 'marked' ? 'list__item--active' : ''}
          onClick={() =>
            setDisplayList({ type: 'marked', text: 'Markierte ToDos' })
          }
        >
          <span>Markierte ToDos</span>
          <span>{markedItemsCount}</span>
        </li>
        <li
          className={displayList.type === 'done' ? 'list__item--active' : ''}
          onClick={() =>
            setDisplayList({ type: 'done', text: 'Erledigte ToDos' })
          }
        >
          <span>Erledigte ToDos</span>
          <span>{doneItemsCount}</span>
        </li>
      </ul>
    </aside>
  );
}
