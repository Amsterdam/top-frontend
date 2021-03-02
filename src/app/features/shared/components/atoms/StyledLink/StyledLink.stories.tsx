import React from "react"

import StyledLink from "./StyledLink"

const metadata = {
  component: "StyledLink",
  title: "Text / StyledLink"
}

export default metadata

export const Default: React.VFC<{}> = () => <StyledLink>I’m a correctly coloured link</StyledLink>
