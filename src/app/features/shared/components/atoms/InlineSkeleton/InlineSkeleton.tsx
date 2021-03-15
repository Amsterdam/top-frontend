import styled, { keyframes } from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

const backgroundColor = themeColor("tint", "level3")
const backgroundWidth = "256px"

const animation = keyframes`
  0% {
    background-position: -${ backgroundWidth } 0;
  }
  100% {
    background-position: calc(${ backgroundWidth } + 100%) 0;
  }
`

/**
 * A neutral rectangular box representing a value still being loaded.
 */
const InlineSkeleton = styled.span`
  display: inline-block;
  background-color: ${ backgroundColor };
  background-image: linear-gradient(90deg, ${ backgroundColor }, rgba(0, 0, 0, .125), ${ backgroundColor });
  background-size: ${ backgroundWidth } 100%;
  background-repeat: no-repeat;
  animation: ${ animation } 2s linear infinite;

  &::before {
    content: "Ophalen…"; // Provides appropriate dimensions and enables baseline alignment
    opacity: 0;
  }
`

export default InlineSkeleton
