import React from "react"
import DOMPurify from "dompurify"

type Props = {
  text: string
  className?: string
}

const Purified: React.FC<Props> = ({ text, className = "" }) => {
  const purifiedText = DOMPurify.sanitize(text)

  return <div className={ className } dangerouslySetInnerHTML={ { __html: purifiedText } } />
}

export default Purified
