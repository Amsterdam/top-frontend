import React from "react"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"

type Props = {

}

const CreateItineraryPage:React.FC<Props> = () => (
  <DefaultLayout>
    <ItineraryForm />
  </DefaultLayout>
)

export default CreateItineraryPage
