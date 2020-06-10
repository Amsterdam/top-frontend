import React from "react"
import styled, { keyframes } from "styled-components"
import { color } from "@datapunt/asc-ui"

type Props = {
  title: string
  shap: number
  business: string|number|undefined
  isPositive: boolean
}

const barAnimation = (shap: number) => keyframes`
  to { 
    width: ${ Math.abs(shap * 1000) }%; 
  }
`

type BarProps = Pick<Props, "shap" | "isPositive">
const Bar = styled.div`
  width: 0;
  
  background-color: ${ ({ isPositive }: BarProps) => color( isPositive ? "secondary" : "primary") }; 
  border-radius: 3px; 
  height: 10px; 
  
  margin-top: 5px;
  margin-bottom: 10px;
  
  animation: ${ ({ shap }: BarProps) => barAnimation(shap) } 1s 1;  
  animation-fill-mode: forwards;  
`

export const ShapValue: React.FC<Props> = ({ title, shap, business, isPositive }) => (
  <>
    <div>{title} { business !== undefined && <i>({business})</i> }</div>
    <div>
      <Bar shap={shap} isPositive={isPositive} />
    </div>
  </>
)
