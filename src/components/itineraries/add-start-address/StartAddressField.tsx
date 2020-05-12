import React from "react"
import StartAddress from "./StartAddress"
import { Button } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import Box from "../../atoms/Box/Box"
import { useField } from "react-final-form"
import AddStartAddressModal from "./AddStartAddressModal"
import CaseModal from "./CadeModal"
import { useStartAddressModal } from "./hooks/useStartAddressModal"
import { useCaseModal } from "./hooks/useCaseModal"

type Props = {
  name: string
}

export const StartAddressField: React.FC<Props> = ({ name }) => {
  const { getUrl: getStartAddressUrl } = useStartAddressModal()
  const { getUrl: getCaseUrl } = useCaseModal()

  const { input: { value, onChange } } = useField<CaseId>(name, {})

  return (
    <Box pt={4} pb={4}>
      {
        value
          ? <>
            <Box pb={4}>
              <StartAddress caseId={value} caseTo={getCaseUrl}/>
            </Box>
            <Button type='button' variant='textButton' onClick={() => onChange(undefined)}>
              Verwijder startadres
            </Button>
          </>
          : <Link to={getStartAddressUrl()}>
              <Button type='button' variant="textButton">
                Ik wil starten bij een specifiek adres
              </Button>
          </Link>
      }
      <AddStartAddressModal onAddStartAddress={onChange} />
      <CaseModal />
    </Box>
  )
}
