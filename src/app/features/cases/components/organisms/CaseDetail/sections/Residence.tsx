import React, { FC } from "react"

import { useCase } from "app/state/rest"
import { BagData, BagDataError } from "app/features/types"
import MailtoAnchor from "app/features/cases/components/molecules/MailtoAnchor/MailtoAnchor"

import { getAddress, getBagId, getEigenaar } from "../utils"
import CaseDetailSection from "../CaseDetailSection"

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
  const isWoonboot = hasBagData && bagData.ligplaatsidentificatie !== undefined
  const isWoning = !isWoonboot
  const woningTitle = isWoning ? "Woning" : "Ligplaats"

  // Woning
  const gebruiksdoel = hasBagData ? bagData.gebruiksdoel : undefined
  const woningBestemming = gebruiksdoel && gebruiksdoel.length ? gebruiksdoel[0] : undefined
  const woningGebruik = hasBagData && bagData.gebruik ? bagData.gebruik : undefined
  const woningBouwlagen = hasBagData && bagData.bouwlagen ? bagData.bouwlagen : undefined
  const woningEtage = hasBagData && bagData.verdieping_toegang != null ? bagData.verdieping_toegang : undefined
  const woningKamers = hasBagData && bagData.aantal_kamers ? bagData.aantal_kamers : 0
  const woningOppervlak = hasBagData && bagData.oppervlakte && bagData.oppervlakte > 1 ? bagData.oppervlakte : 0
  const woningBagId = getBagId(caseData!)

  // Woonboot
  const woonbootLigplaatsIndicatie = hasBagData && bagData.ligplaatsidentificatie
  const woonbootStatus = hasBagData && bagData.status ? bagData.status : undefined
  const woonbootIndicatie = hasBagData && bagData.indicatie_geconstateerd !== undefined ? bagData.indicatie_geconstateerd : false
  const woonbootAanduiding = hasBagData && bagData.aanduiding_in_onderzoek !== undefined ? bagData.aanduiding_in_onderzoek : false

  // General
  const address = getAddress(caseData.import_adres)
  const eigenaar = getEigenaar(caseData)
  const postalCode = caseData.import_adres.postcode

  // Terugmeld email
  const mailtoAnchor = <MailtoAnchor
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
    woonbootIndicatie={ woonbootIndicatie }
    woonbootAanduiding={ woonbootAanduiding }
  />

  const ownerField = [ "Eigenaar", <span className="anonymous">{ eigenaar }</span> ]

  const woningFields = [
    [ "Databron", "BRK" ],
    ownerField,
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
    [ "Indicatie geconstateerd", woonbootIndicatie ],
    [ "Aanduiding in onderzoek", woonbootAanduiding ],
    ownerField,
    mailtoAnchor
  ]

  const woningData = isWoning ? woningFields : woonbootFields

  // Footer
  const woningUrlBagType = isWoning ? "verblijfsobject" : "ligplaats"
  const woningUrlBagId = isWoning ? woningBagId : woonbootLigplaatsIndicatie
  const woningUrl = `https://data.amsterdam.nl/data/bag/${ woningUrlBagType }/id${ woningUrlBagId }/`
  const woningFooter =
    woningUrlBagId ?
      { link: woningUrl, title: "Bekijk op Data en informatie" } :
      undefined

  return (
    <CaseDetailSection
      title={ woningTitle }
      data={ woningData }
      footer={ woningFooter }
    />
  )
}

export default Residence
