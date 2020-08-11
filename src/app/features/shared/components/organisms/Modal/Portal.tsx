import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

const Portal: React.FC = ({ children }) => {
  const modalRoot = "modal-root"
  const el = useRef<Element>(document.createElement("div"))

  useEffect(() => {
    const element = el.current
    // onMount: append `el` to modal-root..
    document.getElementById(modalRoot)?.appendChild(element)

    return () => {
      console.log("UNMOUNT")
      // onUnmount: remove `el` from modal-root.
      document.getElementById(modalRoot)?.removeChild(element)
    }
  }, [el, modalRoot])

  // The children of this component are rendered within `el`.
  return createPortal(children, el.current)
}

export default Portal
