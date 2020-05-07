import React, { FC } from "react"
import useFetch from "../../hooks/useFetch"
import CaseDetail from "./CaseDetail"
import AnonymousToggle from "./AnonymousToggle"
import ErrorMessage from "../global/ErrorMessage"
import { navigateToLogin } from "../../lib/navigateTo"
import { PageSpinner } from "../atoms/PageSpinner/PageSpinner"

type Props = {
  caseId: CaseId
}

const Case: FC<Props> = ({ caseId }) => {
  const [caseItem, isFetching, errorMessage] = useFetch(`cases/${ caseId }`) as [Case, boolean, ErrorMessage]

  // @TODO: Clean this up, not checking errorMessage but checking forbidden on response
  if (errorMessage === "Error: HTTP 403") navigateToLogin()

  const showSpinner = isFetching
  const show = caseItem !== undefined
  const showErrorMessage = errorMessage !== undefined

  return (
    <PageSpinner isSpinning={showSpinner}>
      { show &&
        <>
          <CaseDetail caseId={ caseId } caseItem={ caseItem! } />
          <AnonymousToggle />
        </>
      }
      { showErrorMessage &&
        <ErrorMessage text={ errorMessage! } />
      }
    </PageSpinner>
  )
}
export default Case
