import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

import CaseDetail from "app/features/cases/components/organisms/CaseDetail/CaseDetail"
import AnonymousToggle from "app/features/cases/components/molecules/AnonymousToggle/AnonymousToggle"

type Props = {
  id: string
}

const CaseDetailPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data, isBusy } = useCase(id!)

  return (
    <DefaultLayout>
      { isBusy && <CenteredSpinner explanation="Zaak ophalen…" size={ 60 } /> }
      { data && id && <CaseDetail caseId={ id } /> }
      { data && id && <AnonymousToggle /> }
      { !isBusy && !data && <p>Geen zaak gevonden met id ‘{ id }’.</p> }
    </DefaultLayout>
  )
}

export default CaseDetailPage
