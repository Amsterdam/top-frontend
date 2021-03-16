import React from "react"
import SuccessMessage, { Props as SuccessMessageProps } from "./SuccessMessage"

const metadata = {
  component: SuccessMessage,
  title: "Feedback / SuccessMessage"
}

export default metadata

export const Example: React.VFC<SuccessMessageProps> = () => <SuccessMessage text="Er gaat iets goed." />
