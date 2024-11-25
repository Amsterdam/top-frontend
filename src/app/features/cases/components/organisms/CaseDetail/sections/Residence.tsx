import React, { FC } from "react"

import { useCase } from "app/state/rest"
import { BagData, BagDataError } from "app/features/types"
import MailtoAnchor from "app/features/cases/components/molecules/MailtoAnchor/MailtoAnchor"

import { getAddress, getBagId } from "../utils"
import CaseDetailSection from "../CaseDetailSection"
import Owner from "./Owner"

type Props = {
  caseId: string
}

const Residence: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData) {
    return null
  }

  const hasBagData = (caseData.bag_data as BagDataError).error === undefined
  const bagData = caseData.bag_data as BagData
  const isWoonboot = Boolean(hasBagData && bagData?.ligplaatsIdentificatie)
  const isWoning = !isWoonboot
  const woningTitle = isWoning ? "Woning" : "Ligplaats"

  // Woning
  const gebruiksdoel = hasBagData ? bagData.gebruiksdoelOmschrijvingen : undefined
  const woningBestemming = gebruiksdoel && gebruiksdoel.length ? gebruiksdoel.join(", ") : undefined
  const woningGebruik = hasBagData && bagData.verblijfsobjectFeitelijkGebruikOmschrijving ? bagData.verblijfsobjectFeitelijkGebruikOmschrijving : undefined
  const woningBouwlagen = hasBagData && bagData.verblijfsobjectAantalBouwlagen ? bagData.verblijfsobjectAantalBouwlagen : undefined
  const woningEtage = hasBagData && bagData.verblijfsobjectVerdiepingToegang != null ? bagData.verblijfsobjectVerdiepingToegang : undefined
  const woningKamers = hasBagData && bagData.verblijfsobjectAantalKamers ? bagData.verblijfsobjectAantalKamers : 0
  const woningOppervlak = hasBagData && bagData.verblijfsobjectOppervlakte && bagData.verblijfsobjectOppervlakte > 1 ? bagData.verblijfsobjectOppervlakte : 0
  const woningBagId = getBagId(caseData!)

  // Woonboot
  const woonbootLigplaatsIndicatie = hasBagData && bagData.ligplaatsIdentificatie
  const woonbootStatus = hasBagData && bagData.ligplaatsStatusOmschrijving ? bagData.ligplaatsStatusOmschrijving : undefined

  // General
  const address = getAddress(caseData.address)
  const postalCode = caseData.address.postal_code

  // Terugmeld email
  const mailtoAnchor = (
    <MailtoAnchor
      address={ address }
      postalCode={ postalCode }
      gebruiksdoel={ woningBestemming }
      gebruik={ woningGebruik }
      aantalBouwlagen={ woningBouwlagen }
      etage={ woningEtage }
      aantalKamers={ woningKamers }
      oppervlak={ woningOppervlak }
      isWoonboot={ isWoonboot }
      woonbootStatus={ woonbootStatus }
    />
)

  const woningFields = [
    // [ "Databron", "BRK" ],
    // <Owner caseData={ caseData } />,
    [ "Databron", "BAG" ],
    [ "Gebruiksdoel", woningBestemming ],
    [ "Soort object (feitelijk gebruik)", woningGebruik ],
    [ "Aantal bouwlagen", woningBouwlagen !== undefined ? woningBouwlagen : "–" ],
    [ "Verdieping toegang", woningEtage !== undefined ? woningEtage : "–" ],
    [ "Aantal kamers", woningKamers > 0 ? woningKamers : "–" ],
    [ "Woonoppervlak", woningOppervlak > 0 ? woningOppervlak + " m²" : "–" ],
    mailtoAnchor
  ]

  const woonbootFields = [
    [ "Status", woonbootStatus || "–" ],
    <Owner caseData={ caseData } />,
    mailtoAnchor
  ]

  const woningData = isWoning ? woningFields : woonbootFields

  // Footer
  const woningUrlBagType = isWoning ? "verblijfsobject" : "ligplaats"
  const woningUrlBagId = isWoning ? woningBagId : woonbootLigplaatsIndicatie
  const woningUrl = `https://data.amsterdam.nl/data/bag/${ woningUrlBagType }/${ woningUrlBagId }/`
  const woningFooter = woningUrlBagId ? (
      { link: woningUrl, title: "Bekijk op Data en informatie" }
    ) : undefined

  return (
    <CaseDetailSection
      title={ woningTitle }
      data={ woningData }
      footer={ woningFooter }
    />
  )
}

export default Residence
