import styled, { css } from "styled-components"
import { Responsive, responsiveProps } from "../responsive"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

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

  width?: Responsive<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto">

  bgColor?: Responsive<"level1" | "level2" | "level3" | "level4" | "level5">

  hAlign?: Responsive<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">
  vAlign?: Responsive<"flex-start" | "flex-end" | "center" | "baseline" | "stretch" | "auto">

  stretch?: Responsive<boolean>

  direction?: Responsive<"row" | "row-reverse" | "column" | "column-reverse">
}

/**
 * Use box as your main building block.
 * It can set padding, margin, width, backgroundColor, horizontal-align, and vertical-align.
 * It can set these properties responsive as well.
 *
 * Example usage:
 *
 * ```
 *    <Box p={{ mobileS: 0, tabletM: 1 }} bgColor='level3' >
 *      Foo
 *    </Box>
 * ```
 *
 */
const Box = styled.div`  
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

  "width": unit => typeof unit === "number"
    ? css`width: ${ (unit / 12) * 100 }%;`
    : unit === "auto"
      ? css`width: auto;`
      : "",

  "hAlign": unit => css`justify-content: ${ unit };`,
  "vAlign": unit => css`align-items: ${ unit };`,

  "stretch": unit => unit
    ? css`flex: 1;`
    : "" ,

  "direction": unit => css`flex-direction: ${ unit };`
}) }
  `

export default Box
