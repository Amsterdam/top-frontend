import React from "react"
import InlineSkeleton from "./InlineSkeleton"

const metadata = {
  component: InlineSkeleton,
  title: "Text / InlineSkeleton"
}

export default metadata

export const Example: React.VFC<{}> = () => <InlineSkeleton />
