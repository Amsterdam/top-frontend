import React, { FC, FormEvent } from "react"
import styled from "styled-components"

type Props = {
  onClick: (e: FormEvent) => void
  isOpen: boolean
}

const Div = styled.div`
  display: block;
  width: 72px;
  height: 72px;
  background: white;
  border-radius: 36px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.6);
  }
`

const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`

const Img = styled.span`
  display: inline-block;
  width: 36px;
  height: 24px;
  margin: 24px 18px;
  background-image: url('/icons/eye@2x.png');
  background-repeat: no-repeat;
  background-size: contain;
`

const ImgDisabled = styled(Img)`
  height: 36px;
  margin: 18px;
  background-image: url('/icons/eye-disabled@2x.png');
`

/**
 * Displays a round button with an eye in it, either open or closed.
 * Used by `AnonymousToggle` to indicate whether ‘private mode’ is on or off.
 * @param onClick A callback that should toggle `isOpen`.
 * @param isOpen Whether to show an open eye in the button.
 */
const EyeButton: FC<Props> = ({ onClick, isOpen }) => {
  const getStyle = (isHidden: boolean) => isHidden ? { display: "none" } : undefined

  return (
    <Div>
      <Button onClick={ onClick }>
        <Img style={ getStyle(!isOpen) } />
        <ImgDisabled style={ getStyle(isOpen) } />
      </Button>
    </Div>
  )
}

export default EyeButton
