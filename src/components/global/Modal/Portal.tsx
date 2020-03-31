import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal:React.FC = ({children}) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement("div") as Element;

  useEffect(() => {
    modalRoot?.appendChild(el)
    return () => { modalRoot?.removeChild(el) }
  }, [el, modalRoot]);

  return createPortal(children, el)
};

export default Portal;
