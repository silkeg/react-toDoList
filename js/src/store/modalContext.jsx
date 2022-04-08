import { useState, createContext, useContext } from 'react';

// show/hide Modal // Item anlegen oder editieren
const ModalStateContext = createContext(false);
export function useModalStateContext() {
  return useContext(ModalStateContext);
}

const ModalDispatchContext = createContext(false);
export function useModalDispatchContext() {
  return useContext(ModalDispatchContext);
}

export default function ModalContextProvider({ children }) {
  const [modalState, modalDispatch] = useState(false);
  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={modalDispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
