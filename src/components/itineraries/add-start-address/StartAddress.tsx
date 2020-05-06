import React from "react"
import { Spinner } from "@datapunt/asc-ui"
import { LabelDiv } from "amsterdam-react-final-form"
import SearchResultSingle from "../../search/SearchResultSingle"
import useFetch from "../../../hooks/useFetch"
import { CaseTo } from "../../search/SearchResults"
import Box from "../../atoms/Box/Box"

type Props = {
  caseTo: CaseTo
  caseId: CaseId
}

const normalize = (caseId: CaseId, object: any): SearchResultCase => ({
  case_id: caseId,
  street_name: object?.import_adres?.sttnaam,
  postal_code: object?.import_adres?.postcode,
  stadium: object?.import_stadia?.[0]?.sta_oms,
  street_number: object?.import_adres?.hsnr,
  suffix: object?.import_adres?.toev,
  suffix_letter: object?.import_adres?.hsltr,
  case_reason: object?.related_cases?.[0]?.case_reason,
  fraud_prediction: object?.fraud_prediction ?? {}
})


const StartAddress: React.FC<Props> = ({ caseId, caseTo }) => {
  const [caseItem, isFetching] = useFetch(`cases/${ caseId }`) as [any, boolean, OErrorMessage]

  return (<>
    <LabelDiv>Startadres:</LabelDiv>
    <Box p={4} bgColor='level2'>
      { isFetching
          ? <Spinner />
          : <SearchResultSingle caseItem={normalize(caseId, caseItem)!} caseTo={caseTo} />
      }
    </Box>
  </>)
}

export default StartAddress
