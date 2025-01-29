import { useCase } from "app/state/rest"
import { BagData, BagDataError } from "app/features/types"
import CaseDetailSection from "../CaseDetailSection"
import Owner from "./Owner"


type Props = {
  caseId: string
}

const Residence: React.FC<Props> = ({ caseId }) => {
  const { data: caseData } = useCase(caseId)

  if (!caseData) {
    return null
  }

  const hasBagData = (caseData.bag_data as BagDataError).error === undefined
  const bagData = (hasBagData ? caseData.bag_data : {}) as BagData
  const isWoonboot = Boolean(hasBagData && bagData?.ligplaatsIdentificatie)
  const isWoning = !isWoonboot
  const woningTitle = isWoning ? "Woning" : "Ligplaats"

  // Woning
  const woningBestemming = bagData?.gebruiksdoelOmschrijvingen && bagData?.gebruiksdoelOmschrijvingen.length ? bagData?.gebruiksdoelOmschrijvingen.join(", ") : undefined
  const wozSoortObjectOmschrijving = bagData?.wozSoortObjectOmschrijving
  const status = bagData?.verblijfsobjectStatusOmschrijving
  const toegang = bagData?.toegangOmschrijvingen && bagData?.toegangOmschrijvingen.length ? bagData.toegangOmschrijvingen.join(", ") : undefined
  const verdiepingToegang = bagData?.verblijfsobjectVerdiepingToegang
  const aantalKamers = bagData?.verblijfsobjectAantalKamers 
  const oppervlakte = bagData?.verblijfsobjectOppervlakte
  const aantalBouwlagen = bagData?.verblijfsobjectAantalBouwlagen
  
  
  const woningFields = [
    // [ "Databron", "BRK" ],
    // <Owner caseData={ caseData } />,
    [ "Databron", "BAG" ],
    [ "Gebruiksdoel", woningBestemming ],
    [ "Soort object (feitelijk gebruik) volgens de WOZ", wozSoortObjectOmschrijving ],
    [ "Status", status ],
    [ "Woonoppervlak", oppervlakte ? `${ oppervlakte } m²` : undefined ],
    [ "Aantal kamers", aantalKamers ],
    [ "Verdieping toegang", verdiepingToegang ],
    [ "Toegang", toegang ],
    [ "Aantal bouwlagen", aantalBouwlagen ]
  ]

  // Woonboot
  const woonbootFields = [
    [ "Databron", "BAG" ],
    [ "Status", bagData?.ligplaatsStatusOmschrijving ],
    <Owner caseData={ caseData } />
  ]

  const errorFields = [
    [ "Foutmelding", "Er is iets fout gegaan bij het ophalen van de BAG-gegevens." ]
  ]

  // Footer
  const woningUrl = `https://data.amsterdam.nl/adressen/${ bagData?.identificatie }/`

  const dataFields = isWoning ? woningFields : woonbootFields

  const data = hasBagData ? dataFields : errorFields

  return (
    <CaseDetailSection
      title={ woningTitle }
      data={ data }
      footer={ bagData?.identificatie ? { link: woningUrl, title: "Bekijk op Data en informatie" } : undefined }
    />
  )
}

export default Residence
