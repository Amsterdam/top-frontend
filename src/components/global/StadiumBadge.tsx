import React, { FC } from "react"
import styled from "styled-components"
import { color } from "@datapunt/asc-ui"

type Props = {
  text: string
}

const Span = styled.span`
  display: inline-block
  background-color: ${ (props: { isIssue?: boolean }) => props.isIssue ? color("secondary") : color("primary") }
  border-radius: 6px
  padding: 2px 8px
  font-weight: bold
  color: ${ color("tint", "level1") }
`

const StadiumBadge: FC<Props> = ({ text }) => {
  const trimmedText = text.trim()
  const hasBody = trimmedText !== ""
  const isIssue = trimmedText === "Issuemelding"
  return hasBody ? <Span isIssue={ isIssue }>{ trimmedText }</Span> : null
}

export default StadiumBadge
