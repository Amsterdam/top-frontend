import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  address: string
  postalCode: PostalCode
}

const H1 = styled.h1`
  font-size: 18px;
  margin: 6px 0;
`
const PostalCode = styled.p`
  font-weight: bold;
  margin: 6px 0;
`

const SearchResultAddress: FC<Props> = ({ address, postalCode }) => (
  <div>
    <H1>{ address }</H1>
    <PostalCode>{ postalCode }</PostalCode>
  </div>
)
export default SearchResultAddress
