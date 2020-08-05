import React, { FC } from "react"

type Props = {
  json?: Record<string, any>
}

const JSONBlock: FC<Props> = ({ json }) => (
  <div>
    <pre><code>{ JSON.stringify(json, null, 2) }</code></pre>
  </div>
)

export default JSONBlock
