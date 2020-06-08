import React, { FC, useState } from "react"
import { Button } from "@datapunt/asc-ui"
import JSONBlock from "../../global/JSONBlock"
import { useFormState } from "react-final-form"

const JSONDisplay: FC = () => {
  const { values } = useFormState()

  const [showJSON, setShowJSON] = useState(false)
  const onClickShowJSON = () => setShowJSON(!showJSON)

  return (
    <div>
      <h1>Huidige settings (JSON)</h1>
      <Button onClick={ onClickShowJSON } type="button">{ `${ showJSON ? "Verberg" : "Toon" } JSON` }</Button>
      { showJSON &&
        <JSONBlock json={ values } />
      }
    </div>
  )
}

export default JSONDisplay
