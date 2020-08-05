import React, {FC, useRef, MouseEvent, useCallback} from "react"
import { DocumentText } from "@datapunt/asc-assets"
import styled from "styled-components"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"

type Props = {
  text: string
  onClick?: () => void
}

const TextArea = styled.textarea`
  position: absolute;
  left: -9999px;
`

const CopyToClipboardButton: FC<Props> = ({ text, onClick}) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleOnClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    const textarea = ref.current
    if (textarea === null) return
    textarea.value = text
    textarea.select()
    document.execCommand("copy")

    if (onClick) {
      onClick()
    }
  }, [ onClick, text ])

  return (
    <>
      <StyledButton variant="blank" iconLeft={ <DocumentText /> } onClick={ handleOnClick }>Kopieër naar clipboard</StyledButton>
      <TextArea ref={ ref } readOnly />
    </>
  )
}

export default CopyToClipboardButton
