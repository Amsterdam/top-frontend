import React, {useEffect} from "react"
import {FixedWrap} from "./components/FixedWrap"
import {StyledIconButton} from "./components/StyledIconButton"
import {Body} from "./components/Body"
import {Footer} from "./components/Footer"
import {TopBar} from "./components/TopBar"

type Props = {
  title?: string
  onClose?: () => void
  footer?: JSX.Element
}

const ESCAPE_KEYS = ['Escape', '27']
export const defaultCloseHandler = () => window.history.back()

const DefaultModal:React.FC<Props> = ({title, onClose, children, footer}) => {
  const close = () => onClose ? onClose() : defaultCloseHandler()

  const onKeyDown = (event:KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  return (
  <FixedWrap>
    <TopBar>
      <h4>{ title }</h4>
      <StyledIconButton
        border={false}
        icon='Close'
        onClick={close}
      />
    </TopBar>
    <Body>{ children }</Body>
    { footer && <Footer>{ footer }</Footer>}
  </FixedWrap>
  )
}

export default DefaultModal
