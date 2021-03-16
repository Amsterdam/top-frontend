import React from "react"
import ErrorMessage, { Props as ErrorMessageProps } from "./ErrorMessage"

const metadata = {
  component: ErrorMessage,
  title: "Feedback / ErrorMessage"
}

export default metadata

export const Example: React.VFC<ErrorMessageProps> = () => <ErrorMessage text="Er gaat iets mis." />
