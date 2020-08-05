import React, { FC } from "react"
import DOMPurify from "dompurify"

type Props = {
  text: string
  className?: string
}

const Purified: FC<Props> = ({ text, className = "" }) => {
  const purifiedText = DOMPurify.sanitize(text)
  return <p className={ className } dangerouslySetInnerHTML={ { __html: purifiedText } }></p>
}
export default Purified
