import React from "react"
import Label from "./Label"

const metadata = {
  component: "Label",
  title: "Text / Label"
}

export default metadata

export const Default: React.VFC<{}> = () => <Label>Label</Label>
