import React, { FC } from "react"
import styled from "styled-components"

import { useDaySettings } from "app/state/rest"

import formatDate from "app/features/shared/utils/formatDate"
import highlightText from "app/features/shared/utils/highlightText"
import replaceNewLines from "app/features/shared/utils/replaceNewLines"
import replaceUrls from "app/features/shared/utils/replaceUrls"
import displayAddress from "app/features/shared/utils/displayAddress"
import Purified from "app/features/shared/components/molecules/Purified/Purified"

import Hr from "app/features/cases/components/atoms/Hr/Hr"
import Span from "app/features/cases/components/atoms/Span/Span"
import MailtoAnchor from "app/features/cases/components/molecules/MailtoAnchor/MailtoAnchor"
import CaseLogBook from "app/features/cases/components/organisms/CaseLogbook/CaseLogBook"

import { BagData, BagDataError, BrkData, BrkDataError, Case, KeyValueDetail } from "app/features/types"

import CaseDetailSection from "./CaseDetailSection"
import CaseDetailSectionGeneral from "./CaseDetailSectionGeneral"
import CaseDetailSectionRelatedCases from "./CaseDetailSectionRelatedCases"
import CaseDetailSectionVacationRental from "./CaseDetailSectionVacationRental"
import CaseDetailSectionVacationRentalThisYear from "./CaseDetailSectionVacationRentalThisYear"
import CaseDetailSectionStadia from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStadia"

type Props = {
  caseId: string
  caseItem: Case
}

const HrSpaced = styled(Hr)`
  margin: 24px 0;
`

const P = styled.p`
  display: inline-block;
  margin: 0;
`

const CaseDetail: FC<Props> = ({ caseId, caseItem }) => {
  const { data: daySettings } = useDaySettings(caseItem.day_settings_id!)

  // Header
  const address = displayAddress(caseItem.import_adres.sttnaam, caseItem.import_adres.hsnr, caseItem.import_adres.hsltr || undefined, caseItem.import_adres.toev || undefined)
  const postalCode = caseItem.import_adres.postcode
  const personCount = caseItem.bwv_personen.filter(person => person.overlijdensdatum === null).length || 0
  const caseCount = caseItem.bwv_tmp.num_cases !== null ? parseInt(caseItem.bwv_tmp.num_cases, 10) : undefined
  const fraudPrediction = !caseItem.day_settings_id || (daySettings && daySettings.team_settings.fraud_predict) ? caseItem.fraud_prediction : undefined
  const isSia = (caseItem.is_sia === "J")

  // Woning
  const hasBagData = (caseItem.bag_data as BagDataError).error === undefined
  const bagData = caseItem.bag_data as BagData
  const isWoonboot = hasBagData && bagData.ligplaatsidentificatie !== undefined
  const isWoning = !isWoonboot
  const woningTitle = isWoning ? "Woning" : "Ligplaats"

  // woning
  const gebruiksdoel = hasBagData ? bagData.gebruiksdoel : undefined
  const woningBestemming = gebruiksdoel && gebruiksdoel.length ? gebruiksdoel[0] : undefined
  const woningGebruik = hasBagData && bagData.gebruik ? bagData.gebruik : undefined
  const woningBouwlagen = hasBagData && bagData.bouwlagen ? bagData.bouwlagen : undefined
  const woningEtage = hasBagData && bagData.verdieping_toegang != null ? bagData.verdieping_toegang : undefined
  const woningKamers = hasBagData && bagData.aantal_kamers ? bagData.aantal_kamers : 0
  const woningOppervlak =
    hasBagData && bagData.oppervlakte && bagData.oppervlakte > 1 ? bagData.oppervlakte : 0
  const woningBagId = hasBagData ? bagData.verblijfsobjectidentificatie : undefined

  // woonboot
  const woonbootLigplaatsIndicatie = hasBagData && bagData.ligplaatsidentificatie
  const woonbootStatus = hasBagData && bagData.status ? bagData.status : undefined
  const woonbootIndicatie = hasBagData && bagData.indicatie_geconstateerd !== undefined ? bagData.indicatie_geconstateerd : false
  const woonbootAanduiding = hasBagData && bagData.aanduiding_in_onderzoek !== undefined ? bagData.aanduiding_in_onderzoek : false

  // eigenaar
  const hasBrkData = (caseItem.brk_data as BrkDataError).error === undefined
  const brkData = caseItem.brk_data as BrkData
  const eigenaar = hasBrkData && brkData.owners.length > 0 ? brkData.owners.map(owner => owner._display).join(", ") : undefined

  // woning terugmeld email
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
  const woningFields = [
    [ "Databron", "BRK" ],
    [ "Eigenaar", eigenaar ],
    [ "Databron", "BAG" ],
    [ "Gebruiksdoel", woningBestemming ],
    [ "Soort Object (feitelijk gebruik)", woningGebruik ],
    [ "Aantal bouwlagen", woningBouwlagen !== undefined ? woningBouwlagen : "-" ],
    [ "Verdieping toegang", woningEtage !== undefined ? woningEtage : "-" ],
    [ "Aantal kamers", woningKamers > 0 ? woningKamers : "-" ],
    [ "Woonoppervlak", woningOppervlak > 0 ? woningOppervlak + " m²" : "-" ],
    mailtoAnchor
  ]
  const woonbootFields = [
    [ "Status", woonbootStatus || "-" ],
    [ "Indicatie geconstateerd", woonbootIndicatie ],
    [ "Aanduiding in onderzoek", woonbootAanduiding ],
    [ "Eigenaar", eigenaar ],
    mailtoAnchor
  ]
  const woningData = isWoning ? woningFields : woonbootFields

  // woning footer
  const woningUrlBagType = isWoning ? "verblijfsobject" : "ligplaats"
  const woningUrlBagId = isWoning ? woningBagId : woonbootLigplaatsIndicatie
  const woningUrl = `https://data.amsterdam.nl/data/bag/${ woningUrlBagType }/id${ woningUrlBagId }/`
  const woningFooter =
    woningUrlBagId ?
      { link: woningUrl, title: "Bekijk op Data & informatie" } :
      undefined

  // Melding
  const meldingen = caseItem.bwv_hotline_melding.map(melding => {
    const {
      melding_datum: datum,
      melding_anoniem: anoniem,
      melder_naam: naam,
      melder_telnr: telnr,
      situatie_schets: text
    } = melding

    return {
      datum: datum ? formatDate(datum, true)! : undefined,
      anoniem: anoniem === "J",
      naam,
      telnr,
      text: replaceNewLines(replaceUrls((text || "").trim(), "_blank"))
    }
  }).reverse()

  const meldingenData = meldingen.reduce((acc, item, index) => {
    const { datum, anoniem, naam, telnr, text } = item
    const highlightedText = highlightText([ "hoofdhuurder", "hoofdhuur", "hh" ], text, { caseSensitive: false })

    acc.push([ "Datum melding", datum || "-" ])
    acc.push([ "Anonieme melding", anoniem ])
    acc.push([ "Melder", <P className="anonymous"> { naam }</P> || "-" ])
    acc.push([ "Melder telefoonnummer", telnr ?
      <a className="anonymous" href={ "tel://" + telnr }>{ telnr }</a> : "-" ])
    acc.push(<Purified className="anonymous" text={ highlightedText } />)

    if (index < meldingen.length - 1) acc.push(<HrSpaced />)

    return acc
  }, [] as KeyValueDetail[])

  // Bewoners
  const people = Array.isArray(caseItem.bwv_personen) ? caseItem.bwv_personen.map(person => ({
    name: person.naam,
    initials: person.voorletters,
    sex: person.geslacht,
    born: person.geboortedatum ? formatDate(person.geboortedatum)! : undefined,
    livingSince: person.vestigingsdatum_adres ? formatDate(person.vestigingsdatum_adres)! : undefined,
    died: person.overlijdensdatum ? formatDate(person.overlijdensdatum)! : undefined
  })) : []
  const bewoners = people.reduce((acc: any, person, index, arr) => {
    acc.push(<Span
      className="anonymous"><strong>{ (index + 1) + ". " + person.initials + " " + person.name + " (" + person.sex + ")" }</strong></Span>)
    acc.push([ "Geboren", <span className="anonymous">{ person.born }</span> ])
    acc.push([ "Woont hier sinds", person.livingSince ])
    if (person.died !== undefined) acc.push([ "✝️ Overleden", <span className="anonymous">{ person.died }</span> ])
    if (index < arr.length - 1) acc.push(<Hr />)
    return acc
  }, [])
  const showBewoners = personCount > 0

  // Statements
  const statements = caseItem.statements.map(
    ({ user, date, statement }) =>
      <Purified
        className="anonymous"
        text={ `${ formatDate(date, true) }<br /><strong>${ user }</strong><br />${ replaceNewLines(replaceUrls(statement)) }` }
      />
  )
  const showStatements = statements.length > 0

  return (
    <article className="CaseDetail">
      <CaseDetailSectionGeneral
        address={ address }
        caseCount={ caseCount }
        caseId={ caseId }
        eigenaar={ eigenaar }
        footer={ {
          link: `http://www.google.com/maps/place/${ address }, Amsterdam`,
          title: "Bekijk op Google Maps"
        } }
        fraudPrediction={ fraudPrediction }
        isSia={ isSia }
        personCount={ personCount }
        postalCode={ postalCode }
      />
      <CaseDetailSectionRelatedCases
        caseCount={ caseCount }
        caseId={ caseId }
      />
      <CaseDetailSectionVacationRental
        caseId={ caseId }
      />
      <CaseDetailSection
        title={ woningTitle }
        data={ woningData }
        footer={ woningFooter }
      />
      <CaseDetailSection
        title="Meldingen / aanleiding"
        dataSource="BWV"
        data={ meldingenData.length ? meldingenData : [ "-" ] }
      />
      <CaseDetailSection
        id="personen"
        title={ `Huidige bewoners${ showBewoners ? ` (${ personCount })` : "" }` }
        dataSource="BWV"
        data={ showBewoners ? bewoners : [ "Geen inschrijvingen" ] }
      />
      <CaseDetailSectionVacationRentalThisYear
        caseId={ caseId }
      />
      <CaseLogBook
        caseId={ caseId }
      />
      {
        showStatements &&
        <CaseDetailSection
          title="Mededelingen (kladblok)"
          dataSource="BWV"
          data={ statements } />
      }
      <CaseDetailSectionStadia
        caseId={ caseId }
      />
    </article>
  )
}

export default CaseDetail
