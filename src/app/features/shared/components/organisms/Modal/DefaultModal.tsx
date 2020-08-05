import React, { useEffect } from "react"
import { Close } from "@datapunt/asc-assets"

import { FixedWrap } from "./components/FixedWrap"
import { Body } from "./components/Body"
import { Footer } from "./components/Footer"
import { TopBar } from "./components/TopBar"
import Portal from "./Portal"
import { Button } from "@datapunt/asc-ui"

type Props = {
  title?: string
  onClose?: () => void
  footer?: JSX.Element
}

const ESCAPE_KEYS = ["Escape", "27"]
const defaultCloseHandler = () => window.history.back()

const DefaultModal: React.FC<Props> = ({ title, onClose, children, footer }) => {
  const close = () => onClose ? onClose() : defaultCloseHandler()

  const onKeyDown = (event: KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  })

  return (
    <Portal>
      <FixedWrap>
        <TopBar>
          <h4>{ title }</h4>
          <Button
            size={24}
            icon={ <Close /> }
            onClick={close}
          />
        </TopBar>
        <Body>{ children }</Body>
        { footer && <Footer>{ footer }</Footer>}
      </FixedWrap>
    </Portal>
  )
}

export default DefaultModal
