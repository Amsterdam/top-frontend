import React from "react"
import styled from "styled-components"

import HelpButton from "./HelpButton"

const metadata = {
  title: "Buttons / HelpButton"
}

export default metadata

const CenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

export const Example = () => (
  <CenterCenter>
    <HelpButton>
      <p>
        Aenean lacinia bibendum nulla sed consectetur.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
      <p>
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
      </p>
    </HelpButton>
  </CenterCenter>
)
