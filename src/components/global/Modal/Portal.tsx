import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal:React.FC = ({children}) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement("div") as Element;

  useEffect(() => {
    // onMount: append `el` to modal-root..
    modalRoot?.appendChild(el)

    return () => {
      // onUnmount: remove `el` from modal-root.
      modalRoot?.removeChild(el)
    }

  }, [el, modalRoot]);

  // The children of this component are rendered within `el`.
  return createPortal(children, el)
};

export default Portal;
