import React from "react"
import { Story } from "@storybook/react"

import Value, { Props as ValueProps } from "./Value"

const metadata = {
  component: Value,
  title: "Text / Value"
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
