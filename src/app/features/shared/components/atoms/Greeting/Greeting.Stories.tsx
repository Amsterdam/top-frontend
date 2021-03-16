import React from "react"
import Greeting from "./Greeting"

const metadata = {
  component: Greeting,
  title: "Feedback / Greeting"
}

export default metadata

export const Example: React.VFC<{}> = () => <Greeting />
