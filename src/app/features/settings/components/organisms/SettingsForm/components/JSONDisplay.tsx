import React, { FC, useState } from "react"
import { useFormState } from "react-final-form"
import { Button, Heading } from "@amsterdam/asc-ui"

import JSONBlock from "./JSONBlock"

type Props = {
  title: string
}

const JSONDisplay: FC<Props> = ({ title }) => {
  const { values } = useFormState()

  const [ showJSON, setShowJSON ] = useState(false)
  const onClickShowJSON = () => setShowJSON(!showJSON)

  return (
    <div>
      <Heading forwardedAs="h4">{ title }</Heading>
      <Button onClick={ onClickShowJSON } type="button">{ `${ showJSON ? "Verberg" : "Toon" } JSON` }</Button>
      { showJSON &&
      <JSONBlock json={ values } />
      }
    </div>
  )
}

export default JSONDisplay
