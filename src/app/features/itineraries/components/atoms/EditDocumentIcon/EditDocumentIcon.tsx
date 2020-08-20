import React, { FC } from "react"
import { Icon } from "@datapunt/asc-ui"
import styled from "styled-components"

const StyledIcon = styled(Icon)`
  background-size: contain;
`

const EditDocumentIcon: FC = () => (
  <StyledIcon
    inline
    size={ 20 }
    iconUrl={ `${ process.env.PUBLIC_URL }/icons/EditDocument.svg` }
  />
)
export default EditDocumentIcon
