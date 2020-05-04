import { breakpoint } from "@datapunt/asc-ui"
import { css } from "styled-components"

type BreakPoint =
  | "mobileS"
  | "mobileM"
  | "mobileL"
  | "tabletS"
  | "tabletM"
  | "laptop"
  | "laptopM"
  | "laptopL"
  | "desktop"
  | "desktopL"

export type Responsive<T> = T | { [key in BreakPoint]?: T }

type UnitFunction = (unit: any) => any

const breakPoints: BreakPoint[] = [
  "mobileS",
  "mobileM",
  "mobileL",
  "tabletS",
  "tabletM",
  "laptop",
  "laptopM",
  "laptopL",
  "desktop",
  "desktopL"
]

/**
 * Wraps given cssRules in the corresponding media-query:
 */
export const mq = (bk: BreakPoint, cssRules: any) => css`
  @media screen and ${ breakpoint("min-width", bk) } {
    ${ cssRules }        
  }        
`

/**
 * Wraps 'responsive-props' in media-queries if necessary.
 * See `Box` for a example
 */
export const responsiveProps = <T extends Record<string, any>>(props: T, map: { [key in keyof T]: UnitFunction }) => {
  const nonResponsiveRules = Object
    .entries<UnitFunction>(map)
    .filter(([key]) => typeof props[key] === "string" || typeof props[key] === "number" )
    .map(([key, fun]) => fun(props[key]))

  const mediaQueries = breakPoints
    .map(bp => {
      // See if we can make css-rules for this breakpoint:
      const responsiveCssRules = Object
        .entries<UnitFunction>(map)
        .filter(([key]) => props?.[key]?.[bp] !== undefined)
        .map(([key, fun]) => fun(props[key][bp]))

      return (responsiveCssRules.length > 0)
        ? mq(bp, responsiveCssRules) // Wrap css-rules in a mediaQuery
        : undefined // Undefined -> filter out later
    })
    .filter(_ => _ !== undefined)

  return [
    mediaQueries, ...nonResponsiveRules
  ]
}


