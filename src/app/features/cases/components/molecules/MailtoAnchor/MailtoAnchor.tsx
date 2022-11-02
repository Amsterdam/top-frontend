import React, { FC } from "react"

import StyledLink from "app/features/shared/components/atoms/StyledLink/StyledLink"
import { body, email, subject } from "app/features/cases/email/basisInformatie"

export type Props = {
  address: string
  postalCode: string
  isWoonboot: boolean
  aantalBouwlagen?: number
  aantalKamers?: number
  etage?: number
  gebruik?: string
  gebruiksdoel?: string
  oppervlak?: number
  woonbootAanduiding?: boolean
  woonbootIndicatie?: boolean
  woonbootStatus?: string
}

const MailtoAnchor: FC<Props> = (
  {
    address,
    postalCode,
    gebruiksdoel,
    gebruik,
    aantalBouwlagen,
    etage,
    aantalKamers,
    oppervlak,
    isWoonboot,
    woonbootStatus,
    woonbootIndicatie,
    woonbootAanduiding
  }
) => {
  const href = `mailto:${ email }?subject=${ subject }&body=${ body(isWoonboot, address, postalCode, gebruiksdoel, gebruik, aantalBouwlagen, etage, aantalKamers, oppervlak, woonbootStatus, woonbootIndicatie, woonbootAanduiding) }`
  const text = "Meld BAG afwijkingen"

  return (
    <StyledLink href={ href } target="_blank" rel="noopener noreferrer">
      { text }
    </StyledLink>
  )
}

export default MailtoAnchor
