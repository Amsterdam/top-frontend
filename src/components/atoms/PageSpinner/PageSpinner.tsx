import React from "react"
import styled, { keyframes, css } from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import { DelayedChildren } from "./DelayedChildren"

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

type HideProps = { isHidden: boolean }
const SlideIn = styled.div`
  display:   ${ ({ isHidden }: HideProps) => isHidden ? "none" : "block" };
  animation: ${ ({ isHidden }: HideProps) => isHidden ? "none" : css`0.4s ease-in 0s 1 ${ animation } ` }; 
`

const Center = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); 
`

export type Props = {
  isSpinning: boolean
}

export const PageSpinner: React.FC<Props> = ({ isSpinning, children }) =>
 <>
   { isSpinning && (
     <Center>
       <DelayedChildren>
         <Spinner size={60} />
       </DelayedChildren>
     </Center>
   )}
   <SlideIn isHidden={isSpinning}>
     { children }
   </SlideIn>
 </>
