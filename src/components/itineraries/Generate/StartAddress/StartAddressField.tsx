import React from "react"
import StartAddress from "../../add-start-address/StartAddress"
import Modals, { caseTo, openModalTo } from "./Modals"
import { Button } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import Box from "../../../atoms/Box/Box"
import { useField } from "react-final-form"

type Props = {
  name: string
}

export const StartAddressField: React.FC<Props> = ({ name }) => {
  const { input: { value, onChange } } = useField<CaseId>(name, {})

  return (
    <Box pt={4}>
      {
        value
          ? <>
            <Box pb={4}>
              <StartAddress caseId={value} caseTo={caseTo}/>
            </Box>
            <Button type='button' variant='textButton' onClick={() => onChange(undefined)}>
              Verwijder startadres
            </Button>
          </>
          : <Link to={openModalTo()}>
              <Button type='button' variant="textButton">
                Ik wil starten bij een specifiek adres
              </Button>
          </Link>
      }
      <Modals onAddStartAddress={onChange}/>
    </Box>
  )
}
