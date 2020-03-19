import React, { FC, useRef, MouseEvent } from "react"
import Button from "../styled/Button"
import { DocumentText } from "@datapunt/asc-assets"
import styled from "styled-components"
import noop from "../../lib/utils/noop"

type Props = {
  text: string
  onClick?: () => void
}

const TextArea = styled.textarea`
  position: absolute
  left: -9999px
`

const CopyToClipboardButton: FC<Props> = ({ text, onClick = noop }) => {

  const ref = useRef<HTMLTextAreaElement>(null)

  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const textarea = ref.current
    if (textarea === null) return
    textarea.value = text
    textarea.select()
    document.execCommand("copy")
    onClick()
  }

  return (
    <>
      <Button variant="blank" iconLeft={ <DocumentText /> } onClick={ onClickHandler }>Kopieër naar clipboard</Button>
      <TextArea ref={ ref } readOnly />
    </>
  )
}

export default CopyToClipboardButton
