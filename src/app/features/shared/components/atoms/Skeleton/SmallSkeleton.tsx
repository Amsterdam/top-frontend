import React, { useMemo } from "react"

export type Props = {
  height?: number
  maxRandomWidth?: number
}

type StyledDivProps = {
  height: number
  width: number
}

const backgroundAnimation = keyframes`
  0% {
    background-position: 40%;
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 40%;
  }
`

const StyledDiv = styled.div<StyledDivProps>`
  width: ${ props => props.width }px;
  max-width: 100%;
  height: ${ props => props.height * 4 }px;
  background: linear-gradient(270deg, #E6E6E6, #B4B4B4);
  background-size: 400% 400%;
  animation: ${ backgroundAnimation } 4s linear infinite;
`

const SmallSkeleton: React.FC<Props> = ({ maxRandomWidth = 100, height = 5 }) => {
  const width = useMemo(() => Math.round(Math.random() * (maxRandomWidth - 50)) + 50, [ maxRandomWidth ])

  return <StyledDiv width={ width } height={ height } />
}

export default SmallSkeleton
