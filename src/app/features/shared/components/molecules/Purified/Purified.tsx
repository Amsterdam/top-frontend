import React, { FC } from "react"
import DOMPurify from "dompurify"
import { Paragraph } from "@amsterdam/asc-ui"

type Props = {
  text: string
  className?: string
}

const Purified: FC<Props> = ({ text, className = "" }) => {
  const purifiedText = DOMPurify.sanitize(text)

  return <Paragraph className={ className } dangerouslySetInnerHTML={ { __html: purifiedText } } />
}

export default Purified
