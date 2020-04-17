import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import { basepath } from "../../config/page"

type Props = {
  onClick: (a: FormEvent) => void
  isOpen: boolean
}

const Div = styled.div`
  display: block;
  background: white;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease-in-out;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  &:hover {
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.6);
  }
`
const Button = styled.button`
  display: block;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0;
`

const Img = styled.span`
  display: inline-block;
  margin: 24px 18px;
  width: 36px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('${ basepath }icons/eye@2x.png');
`

const ImgDisabled = styled(Img)`
  margin: 18px;
  height: 36px;
  background-image: url('${ basepath }icons/eye-disabled@2x.png');
`

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
