import React, {useEffect} from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import {useItineraries} from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import {useQueryString} from "app/features/shared/hooks/queryString/useQueryString"
import to from "app/features/shared/routing/to"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"

const CreateItineraryPage: React.FC<RouteComponentProps> = () => {
  const { data, isBusy } = useItineraries()
  const { hasParameter } = useQueryString()

  const shouldRedirect = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (shouldRedirect) {
      navigate(to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() }))
    }
  }, [shouldRedirect, data])

  return <DefaultLayout>
    { isBusy
      ? <CenteredSpinner size={60} />
      : !shouldRedirect ? <ItineraryForm /> : null
    }
  </DefaultLayout>
}

export default CreateItineraryPage
