import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import styled from "styled-components"
import EyeButton from "./EyeButton"

const Div = styled.div`
  position: fixed;
  z-index: 9;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 84px;
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
`

const Span = styled.span`
  display: inline-block;
  height: 28px;
  margin-top: 24px;
  margin-right: 16px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease-out;
  opacity: ${ (props: { isHidden: boolean }) => props.isHidden ? 0 : 1 };
`

const AnonymousToggle: FC = () => {
  const {
    isAnonymous
  } = useGlobalState()
  const {
    toggleIsAnonymous
  } = useGlobalActions()

  const showLabel = !isAnonymous

  const onClick = () => toggleIsAnonymous()

  return (
    <Div className="AnonymousToggle">
      <Span isHidden={ showLabel }>Privé modus staat aan</Span>
      <EyeButton onClick={ onClick } isOpen={ isAnonymous } />
    </Div>
  )
}
export default AnonymousToggle
