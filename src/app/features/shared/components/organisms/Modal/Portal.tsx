import React, { useEffect } from "react"
import { createPortal } from "react-dom"

const Portal: React.FC = ({ children }) => {
  const modalRoot = "modal-root"
  const el = document.createElement("div") as Element

  useEffect(() => {
    // onMount: append `el` to modal-root..
    document.getElementById(modalRoot)?.appendChild(el)

    return () => {
      // onUnmount: remove `el` from modal-root.
      document.getElementById(modalRoot)?.removeChild(el)
    }
  }, [el, modalRoot])

  // The children of this component are rendered within `el`.
  return createPortal(children, el)
}

export default Portal
