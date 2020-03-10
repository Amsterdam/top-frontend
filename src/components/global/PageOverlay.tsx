import React from "react"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import { isLoginPage, isLoginCallbackPage } from "../../config/page"

const Div = styled.div`
  z-index: 999
  background-color: white
  position: fixed
  width: 100%
  height: 100%
`

const PageOverlay: React.FC = () => {
  const hide = isLoginPage() || isLoginCallbackPage()
  const { auth: { isInitialized } } = useGlobalState()
  return hide || isInitialized ? null : <Div />
}
export default PageOverlay
