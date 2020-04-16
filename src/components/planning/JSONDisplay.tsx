import React, { FC, useState } from "react"
import { Button } from "@datapunt/asc-ui"
import JSONBlock from "../global/JSONBlock"

type Props = {
  json?: Record<string, any>
}

const JSONDisplay: FC<Props> = ({ json }) => {
  const [showJSON, setShowJSON] = useState(false)
  const onClickShowJSON = () => setShowJSON(!showJSON)

  return (
    <div>
      <h1>Huidige settings (JSON)</h1>
      <Button onClick={ onClickShowJSON }>{ `${ showJSON ? "Verberg" : "Toon" } JSON` }</Button>
      { showJSON &&
        <JSONBlock json={ json } />
      }
    </div>
  )
}

export default JSONDisplay
