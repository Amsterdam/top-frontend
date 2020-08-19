import React, { FC } from "react"
import { Icon } from "@datapunt/asc-ui"
import styled from "styled-components"

const StyledIcon = styled(Icon)`
  background-size: contain;
`

const ClockIcon: FC = () => (
  <StyledIcon
    inline
    size={ 20 }
    iconUrl={ `${ process.env.PUBLIC_URL }/icons/Clock.svg` }
  />
)
export default ClockIcon
