import React from "react"
import { Spinner } from "@amsterdam/asc-ui"

import { useCase } from "app/state/rest"

import Box from "app/features/shared/components/atoms/Box/Box"
import displayAddress from "app/features/shared/utils/displayAddress"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"

import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import { useCaseModal } from "../../hooks/useCaseModal"

type Props = {
  caseId: string
}

const normalize = (object: any, href: string): React.ComponentProps<typeof ItineraryItemCard> => ({
  href,
  address: displayAddress(object?.import_adres?.sttnaam, object?.import_adres?.hsnr, object?.import_adres?.hsltr, object?.import_adres?.toev),
  postalCode: object?.import_adres?.postcode,
  reason: object?.related_cases?.[0]?.case_reason,
  fraudProbability: <FraudProbability fraudProbability={object?.fraud_prediction?.fraud_probability} />,
  badge: <StadiumBadge stadium={object?.import_stadia?.[0]?.sta_oms} />
})

const StartAddress: React.FC<Props> = ({ caseId }) => {
  const { data, isBusy } = useCase(caseId)
  const { getUrl } = useCaseModal()
  return (<>
    <Box pt={3} pb={3} pl={2} pr={2} bgColor='level2'>
      { isBusy
        ? <Spinner />
        : <ItineraryItemCard {...normalize(data, getUrl(caseId))} />
      }
    </Box>
  </>)
}

export default StartAddress
