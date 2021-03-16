import React from "react"
import Badge, { Props as BadgeProps } from "./Badge"
import { Story } from "@storybook/react"

const metadata = {
  component: Badge,
  title: "Feedback / Badge"
}

export default metadata

const Template: Story<BadgeProps & { content: string }> = (args) => <Badge { ...args }>{ args.content }</Badge>

export const Default = Template.bind({})
Default.args = { content: "Primary variant" }

export const Secondary = Template.bind({})
Secondary.args = {
  content: "Secondary variant",
  variant: "secondary"
}
