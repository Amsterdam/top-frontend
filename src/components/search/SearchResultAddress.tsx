import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  address: string
  postalCode: PostalCode
}

const H1 = styled.h1`
  font-size: 16px
  color: black
  margin-bottom: 2px
`
const PostalCode = styled.p`
  font-weight: bold
  color: black
  margin-bottom: 2px
`

const SearchResultAddress: FC<Props> = ({ address, postalCode }) => (
  <div>
    <H1>{ address }</H1>
    <PostalCode>{ postalCode }</PostalCode>
  </div>
)
export default SearchResultAddress
