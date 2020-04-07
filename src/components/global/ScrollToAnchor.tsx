import React, { FC, MouseEvent } from "react"

type Props = {
  anchor: string
  text: string
}

const ScrollToAnchor: FC<Props> = ({ anchor, text }) => {
  const onClick = (event: MouseEvent) => {
    const anchorElement = document.getElementById(anchor)
    if (anchorElement === null) return
    event.preventDefault()
    const rect = anchorElement.getBoundingClientRect()
    const diff = 50 + 51 + 12 // header + navigation + padding
    const top = rect.top - diff
    window.scrollTo({ top, left: 0, behavior: "smooth" })
  }

  return <a href={ `#${ anchor }` } onClick={ onClick }>{ text }</a>
}
export default ScrollToAnchor
