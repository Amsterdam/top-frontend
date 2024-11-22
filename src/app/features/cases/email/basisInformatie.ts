import formatBoolean from "app/features/shared/utils/formatBoolean"

export const email = "Terugmelding.Basisinformatie@amsterdam.nl"

export const subject = "Terugmelding Basisinformatie"

export const body = (
  isWoonboot: boolean,
  address: string,
  postalCode: string,
  gebruiksdoel?: string,
  gebruik?: string,
  aantalBouwlagen?: number,
  etage?: number,
  aantalKamers?: number,
  oppervlak?: number,
  woonbootStatus?: string
) =>
  `Beste collega,

Wij hebben een afwijking in de woninggegevens geconstateerd op het volgende adres:

${ address }
${ postalCode } Amsterdam

Ons systeem toont bij dit adres op dit moment de volgende gegevens uit BAG:

${ !isWoonboot ?

    `Gebruiksdoel: ${ gebruiksdoel || "–" }
Soort object (feitelijk gebruik): ${ gebruik || "–" }
Aantal bouwlagen: ${ aantalBouwlagen !== undefined ? aantalBouwlagen : "–" }
Verdieping toegang: ${ etage !== undefined ? etage : "–" }
Aantal kamers: ${ aantalKamers !== undefined ? aantalKamers : "–" }
Woonoppervlak: ${ oppervlak !== undefined ? `${ oppervlak } m² ` : "–" }`
    :
    `Status: ${ woonbootStatus || "–" }`
  }

We hebben bij onze controle de volgende afwijkingen geconstateerd:

[--- VUL HIER DE GECONSTATEERDE AFWIJKING IN ---]

Vriendelijke groet,

[--- VUL HIER JE NAAM IN ---]

Gemeente Amsterdam
Afdeling Wonen
Telefoon: 020 2514192
`.replace(/\n/g, escape("\r\n"))
