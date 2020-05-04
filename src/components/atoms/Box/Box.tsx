import styled, { css } from "styled-components"
import { Responsive, responsiveProps } from "../responsive"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"

export type Props = {
  p?: Responsive<number>
  pt?: Responsive<number>
  pr?: Responsive<number>
  pb?: Responsive<number>
  pl?: Responsive<number>

  m?: Responsive<number>
  mt?: Responsive<number>
  mr?: Responsive<number>
  mb?: Responsive<number>
  ml?: Responsive<number>

  width?: Responsive<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>

  bgColor?: Responsive<"level1" | "level2" | "level3" | "level4" | "level5">

  hAlign?: Responsive<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">
  vAlign?: Responsive<"flex-start" | "flex-end" | "center" | "baseline" | "stretch" | "auto">
}

/**
 * Use box as your main building block.
 * It can set padding, margin, width, backgroundColor, horizontal-align, and vertical-align.
 * It can set these properties responsive as well.
 *
 * Example usage:
 *
 * ```
 *    <Box padding={{ mobileS: 0, tabletM: 1 }} bgColor='level3' >
 *      Foo
 *    </Box>
 * ```
 *
 */
const Box = styled.div<Props>`  
    display:flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width:100%;

    ${ (props: Props) => responsiveProps(props, {
      "p": unit => css`padding: ${ themeSpacing(unit) };`,
      "pt": unit => css`padding-top: ${ themeSpacing(unit) };`,
      "pr": unit => css`padding-right: ${ themeSpacing(unit) };`,
      "pb": unit => css`padding-bottom: ${ themeSpacing(unit) };`,
      "pl": unit => css`padding-left: ${ themeSpacing(unit) };`,

      "m": unit => css`margin: ${ themeSpacing(unit) };`,
      "mt": unit => css`margin-top: ${ themeSpacing(unit) };`,
      "mr": unit => css`margin-right: ${ themeSpacing(unit) };`,
      "mb": unit => css`margin-bottom: ${ themeSpacing(unit) };`,
      "ml": unit => css`margin-left: ${ themeSpacing(unit) };`,
    
      "bgColor": unit => css`background-color: ${ themeColor("tint", unit) };`,
    
      "width": unit => css`width ${ (unit / 12) * 100 }%;`,

      "hAlign": unit => css`justify-content: ${ unit };`,
      "vAlign": unit => css`align-items: ${ unit };`
    }) }
  `

export default Box
