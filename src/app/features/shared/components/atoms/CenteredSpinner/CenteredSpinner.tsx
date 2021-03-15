import React, { FC } from "react"
import styled from "styled-components"
import { Spinner } from "@amsterdam/asc-ui"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"

export type Props = {
  explanation?: string
  size?: number
}

const CenterInViewport = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const P = styled.p`
  margin: 0;
  font-weight: 500;
`

/**
 * Blah blah
 * @param size
 * @param explanation
 * @constructor
 */
const CenteredSpinner: FC<Props> = ({ size, explanation }) => (
  <CenterInViewport>
    <Spacing pb={ 4 }>
      <Spinner size={ size } />
    </Spacing>
    { explanation && <P>{ explanation }</P> }
  </CenterInViewport>
)

export default CenteredSpinner
