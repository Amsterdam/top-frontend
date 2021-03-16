import React from "react"
import { Story } from "@storybook/react"

import Value, { Props as ValueProps } from "./Value"

const metadata = {
  component: Value,
  title: "Text / Value",
  argTypes: {
    sensitive: {
      description: "Whether the value is personal and should be anonymisable. It will be blurred while the `AnonymousToggle` is on."
    },
    valid: {
      description: "A condition expressing the validity of the value. If omitted, the value is checked for undefined."
    },
    value: {
      description: "The value to display."
    }
  }
}

export default metadata

const Template: Story<ValueProps> = (args) => <Value { ...args } />

export const Default = Template.bind({})
Default.args = { value: "Vergunning verleend" }

export const Invalid = Template.bind({})
Invalid.args = { valid: false }

export const Undefined = Template.bind({})
Undefined.args = { value: undefined }

export const TrueBoolean = Template.bind({})
TrueBoolean.args = { value: true }

export const FalseString = Template.bind({})
FalseString.args = { value: "False" }

export const UnknownString = Template.bind({})
UnknownString.args = { value: "UNKNOWN" }

export const ChildValue: React.VFC<{}> = () => <Value>Some <strong>child</strong> value</Value>
