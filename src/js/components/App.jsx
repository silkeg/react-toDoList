import { useState } from 'react';

import CurrentListStateContextProvider from '../store/currentListStateContext';
import ItemsContextProvider from '../store/itemContext';
import { useModalStateContext } from '../store/modalContext';

import Layout from './Layout';
import Content from './Content';
import Aside from './Aside';
import Modal from './Modal';

export default function App() {
  const modalState = useModalStateContext();

  // on click menu item - transmits whitch one ist clicked
  const [displayList, setDisplayList] = useState({
    type: 'all',
    text: 'Alle ToDos',
  });

  return (
    <ItemsContextProvider>
      <CurrentListStateContextProvider>
        <Layout>
          <Aside
            displayList={displayList}
            setDisplayList={setDisplayList}
          ></Aside>
          <Content displayList={displayList}></Content>
        </Layout>
      </CurrentListStateContextProvider>
      {modalState && <Modal itemValue={modalState} />}
    </ItemsContextProvider>
  );
}
