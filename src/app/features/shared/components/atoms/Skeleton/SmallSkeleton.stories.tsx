import React from "react"
import SmallSkeleton, { Props as SmallSkeletonProps } from "./SmallSkeleton"

const metadata = {
  component: SmallSkeleton,
  title: "Text / SmallSkeleton"
}

export default metadata

export const Example: React.VFC<SmallSkeletonProps> = (args) => <SmallSkeleton {...args} />
