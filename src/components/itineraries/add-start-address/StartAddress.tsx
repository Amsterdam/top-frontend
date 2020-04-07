import React from 'react'
import styled from "styled-components"
import {Spinner} from "@datapunt/asc-ui"
import SearchResultSingle from "../../search/SearchResultSingle"
import useFetch from "../../../hooks/useFetch"
import {CaseTo} from "../../search/SearchResults"

const Div = styled.div`
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid black;
  min-height:100px;
  width: 100%;
`

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
  // @TODO add fraud_prediction
  fraud_prediction: {
    fraud_probability: 0,
    fraud_prediction: false
  }
})

const StartAddress: React.FC<Props> = ({caseId, caseTo}) => {
  const [caseItem, isFetching] = useFetch(`cases/${caseId}`) as [any, boolean, OErrorMessage]

  return (<>
    <b>Startadres:</b>
    <Div>
      { isFetching
          ? <Spinner />
          : <SearchResultSingle caseItem={normalize(caseId, caseItem)!} caseTo={caseTo} />
      }
    </Div>
  </>)
}

export default StartAddress
