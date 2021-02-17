import React from "react"
import Badge from "./Badge"

const metadata = {
  component: "Badge",
  title: "Text / Badge"
}

export default metadata

export const Default: React.VFC<{}> = () => <Badge>Primary badge</Badge>
