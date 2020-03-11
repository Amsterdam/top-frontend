import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { to } from "../../config/page"

type Props = {
  itineraryId: Id
}

const StyledLink = styled(Link)`
  position: fixed
  bottom: 24px
  left: calc(50% - 15px - 36px);
  margin: auto
  display: block
  width: 72px
  height: 72px
  border-radius: 36px
  background: red
  color: white
  font-size: 48px
  font-weight: bold
  text-align: center
`

const AddButton: FC<Props> = ({ itineraryId }) =>
  <StyledLink to={ to(`suggesties/${ itineraryId }`) }>+</StyledLink>
export default AddButton
