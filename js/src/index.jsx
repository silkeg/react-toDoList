import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './components/App';

import ModalContextProvider from './store/modalContext';

render(
  <StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </StrictMode>,
  document.querySelector('#app')
);
