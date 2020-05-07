import { boolean, withKnobs } from "@storybook/addon-knobs"
import React from "react"
import { PageSpinner } from "./PageSpinner"

export default {
  title: "PageSpinner",
  decorators: [withKnobs]
}

export const Example = () => (
  <PageSpinner isSpinning={boolean("spinning", true)}>
    Content!
  </PageSpinner>
)
