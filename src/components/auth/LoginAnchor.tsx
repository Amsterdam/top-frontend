import React, { FC, useMemo } from "react"
import styled from "styled-components"
import { isLocal } from "../../config/environment"
import { getOIDCProviderUrl, authOIDDummyCode } from "../../config/api"
import { to } from "../../config/page"

// @TODO: Use ASC
const A = styled.a`
  white-space: nowrap;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  background-color: rgb(236, 0, 0);
  color: rgb(255, 255, 255);
  text-decoration: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 12px 15px;
  transition: color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s;
`

const LoginAnchor: FC = () => {
  const gripUri = useMemo(getOIDCProviderUrl, [])
  const href = isLocal ? to(`authentication/callback?code=${ authOIDDummyCode }`) : gripUri
  return <A href={ href }>Log in met je ADW account</A>
}
export default LoginAnchor
