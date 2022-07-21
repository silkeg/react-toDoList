import { useState } from 'react';

export default function useToggle(initialState) {
  const [state, setState] = useState(initialState);

  const toggle = () => setState((currentState) => !currentState);

  return [state, toggle, setState];
}
