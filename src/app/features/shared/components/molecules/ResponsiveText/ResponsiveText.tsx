import React, { FC } from "react"
import { Hidden } from "@amsterdam/asc-ui"

type Props = {
  text: [string, string]
}

const BREAKPOINT = "tabletS"

const ResponsiveText: FC<Props> = ({ text }) =>
  <>
    <Hidden minBreakpoint={ BREAKPOINT }>{ text[0] }</Hidden>
    <Hidden maxBreakpoint={ BREAKPOINT }>{ text[1] }</Hidden>
  </>

export default ResponsiveText
