import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

import CaseDetail from "app/features/cases/components/organisms/CaseDetail/CaseDetail"
import AnonymousToggle from "app/features/cases/components/molecules/AnonymousToggle/AnonymousToggle"

type Props = {
  itineraryId: string
  id: string
}

const CaseDetailPage: React.FC<RouteComponentProps<Props>> = ({ id, itineraryId }) => {
  const { data, isBusy } = useCase(id!)

  return <DefaultLayout>
    { isBusy && <CenteredSpinner size={60} /> }
    { data && id && <CaseDetail itineraryId={itineraryId!} caseId={id} caseItem={data} /> }
    <AnonymousToggle />
  </DefaultLayout>
}

export default CaseDetailPage
