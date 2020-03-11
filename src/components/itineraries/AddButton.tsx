import React, { FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { to } from "../../config/page"

type Props = {
  itineraryId: Id
}

const StyledLink = styled(Link)`
  white-space: nowrap;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  color: #004699;
  border: 1px solid #004699;
  padding: 12px 15px;
  transition: color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s;
`

const AddButton: FC<Props> = ({ itineraryId }) =>
  <StyledLink to={ to(`suggesties/${ itineraryId }`) }>Voeg adres toe</StyledLink>
export default AddButton
