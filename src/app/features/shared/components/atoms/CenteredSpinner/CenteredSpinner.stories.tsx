import React from "react"
import CenteredSpinner, { Props as CenteredSpinnerProps } from "./CenteredSpinner"

const metadata = {
  component: CenteredSpinner,
  title: "Feedback / CenteredSpinner"
}

export default metadata

export const Example: React.VFC<CenteredSpinnerProps> = () => (
  <CenteredSpinner size={ 32 } explanation="We genereren je looplijst…" />
)
