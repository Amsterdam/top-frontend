import React, { FC } from "react"

import { BWVPersoon } from "app/features/types"
import { useCase } from "app/state/rest"
import formatDate from "app/features/shared/utils/formatDate"

import CaseDetailSection from "../CaseDetailSection"
import { Hr } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

type Props = {
  caseId: string
}

const mapPerson = (person: BWVPersoon) => ({
  born: person.geboortedatum ? formatDate(person.geboortedatum)! : undefined,
  died: person.overlijdensdatum ? formatDate(person.overlijdensdatum)! : undefined,
  initials: person.voorletters,
  settlementDate: person.vestigingsdatum_adres ? formatDate(person.vestigingsdatum_adres)! : undefined,
  name: person.naam,
  sex: person.geslacht
})

const Residents: FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData) {
    return null
  }

  const persons = Array.isArray(caseData.bwv_personen) ? caseData.bwv_personen.map(mapPerson) : []

  const residents = persons?.reduce((acc: any, person, index, arr) => {
    acc.push(<strong
      className="anonymous">{ (index + 1) + ". " + person.initials + " " + person.name + " (" + person.sex + ")" }</strong>)
    acc.push([ "Geboren", <span className="anonymous">{ person.born }</span> ])
    acc.push([ "Ingeschreven per", person.settlementDate ])

    if (person.died !== undefined) {
      acc.push([ "✝️ Overleden", <span className="anonymous">{ person.died }</span> ])
    }

    if (index < arr.length - 1) {
      acc.push(<Hr />)
    }

    return acc
  }, [])

  const residentCount: number = caseData.bwv_personen.filter(person => person.overlijdensdatum === null).length

  if (!residentCount) {
    return null
  }

  return (
    <CaseDetailSection
      id="inschrijvingen"
      title="Ingeschreven personen"
      dataSource="BWV"
      data={ residents }
    />
  )
}

export default Residents
