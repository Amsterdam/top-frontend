import React, { useEffect } from "react"
import { Close } from "@amsterdam/asc-assets"
import { Button, Heading } from "@amsterdam/asc-ui"

import { FixedWrap } from "app/features/shared/components/organisms/Modal/components/FixedWrap"
import { Body } from "app/features/shared/components/organisms/Modal/components/Body"
import { Footer } from "app/features/shared/components/organisms/Modal/components/Footer"
import { TopBar } from "app/features/shared/components/organisms/Modal/components/TopBar"
import Portal from "app/features/shared/components/organisms/Modal/Portal"

type Props = {
  title?: string
  onClose?: () => void
  footer?: JSX.Element
}

const ESCAPE_KEYS = [ "Escape", "27" ]
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
          <Heading forwardedAs="h4">{ title }</Heading>
          <Button
            variant="blank"
            size={ 24 }
            icon={ <Close /> }
            onClick={ close }
          />
        </TopBar>
        <Body>{ children }</Body>
        { footer && <Footer>{ footer }</Footer> }
      </FixedWrap>
    </Portal>
  )
}

export default DefaultModal
