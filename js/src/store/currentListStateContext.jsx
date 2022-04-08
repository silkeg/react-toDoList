import { useState, createContext, useContext, useEffect } from 'react';
import { useItemsStateContext } from '../store/itemContext';

const CurrentListStateContext = createContext(false);
export function useCurrentListStateContext() {
  return useContext(CurrentListStateContext);
}

export default function CurrentListStateContextProvider({ children }) {
  const itemsState = useItemsStateContext();

  const [currentListState, setCurrentStateList] = useState([]);
  useEffect(
    () =>
      setCurrentStateList(
        itemsState.filter((item) => item.itemType === 'current')
      ),
    [itemsState]
  );

  return (
    <CurrentListStateContext.Provider value={currentListState}>
      {children}
    </CurrentListStateContext.Provider>
  );
}
