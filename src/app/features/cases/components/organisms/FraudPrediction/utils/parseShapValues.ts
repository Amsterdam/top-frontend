import capitalize from "app/features/shared/utils/capitalize"

import { BusinessRules, ShapValues } from "app/features/types"

type CombinedShapValue = {
  title: string
  shap: number
  business: number | undefined
}

type SplitCombinedShapValue = {
  positive: CombinedShapValue[]
  negative: CombinedShapValue[]
}

// We're only interested in these values:
const relevantShapValues: string[] = [
  "begindatum",
  "eigenaar",
  "woonfraude",
  "eigenaar_particulier",
  "aantal_hotline_meldingen",
  "aantal_anoniem",
  "aantal_melders",
  "aantal_overlast_meldingen",
  "ratio_anoniem",
  "aantal_achternaam_unique",
  "aantal_kinderen",
  "leeftijd_min",
  "leeftijd_max",
  "aantal_personen",
  "aantal_babies",
  "percentage_mannen",
  "percentage_babies",
  "leegstand",
  "aantal_gezinsverhouding_1",
  "ratio_gezinsverhouding_1",
  "aantal_gezinsverhouding_2",
  "ratio_gezinsverhouding_2",
  "aantal_gezinsverhouding_3",
  "ratio_gezinsverhouding_3",
  "aantal_gezinsverhouding_4",
  "ratio_gezinsverhouding_4",
  "aantal_gezinsverhouding_5",
  "ratio_gezinsverhouding_5",
  "aantal_gezinsverhouding_6",
  "ratio_gezinsverhouding_6",
  "postcode",
  "sttnaam",
  "toev",
  "inwnrs",
  "oppervlakte",
  "bouwlaag_toegang",
  "bouwlagen",
  "aantal_kamers",
  "m2_per_inwoner",
  "m2_per_adult",
  "inwoners_per_kamer",
  "adults_per_kamer",
  "achternamen_over_personen",
  "has_hotline_melding",
  "has_meerdere_hotline_meldingen",
  "has_persons_with_prev_confirmed_fraude",
  "has_persons_with_prev_suspected_fraude",
  "has_address_prev_confirmed_fraude",
  "has_address_prev_suspected_fraude"
]

// Some shap-value keys are hard to grasp.
// We translate them into something useful with this map:
const translationMap: { [translation: string]: string } = {
  "adres_id": "uniek id dat aan het adres is gekoppeld",
  "afg_code_beh": "geeft aan op welke afdeling bij de openingsreden hoort (HANZLT of VTBD)",
  "afs_oms": "reden van afsluiten zaak",
  "begin_month": "maand waarin de zaak is geopend",
  "begindatum": "datum waarop de zaak is geopend",
  "beh_code": "code die gekoppeld is aan het project",
  "beh_oms": "projectnaam",
  "categorie": "fraude categorie (illegale hotels, woningdelen, etc..)",
  "eigenaar": "eigenaar particulier, of anders de betreffende WOCO",
  "einddatum": "datum waarop de zaak is afgesloten",
  "zaak_id": "uniek id dat aan de zaak is gekoppeld",
  "eigenaar_particulier": "veld dat aangeeft of de eigenaar particulier is",
  "aantal_hotline_meldingen": "aantal hotline meldingen dat op dit adres gemaakt zijn",
  "aantal_anoniem": "aantal anonieme hotline meldingen",
  "aantal_melders": "aantal verschillende personen die een hotline melding hebben gemaakt",
  "aantal_overlast_meldingen": "het totale aantal dat het woord overlast voorkomt in alle meldingen binnen deze zaak",
  "ratio_anoniem": "aantal anonieme meldingen ten opzichte van het totaal aantal meldingen",
  "aantal_mannen": "aantal ingeschreven mannen op het adres",
  "aantal_achternaam_unique": "aantal ingeschreven met een unieke achternaam op het adres",
  "aantal_kinderen": "aantal ingeschreven kinderen op het adres",
  "leeftijd_min": "leeftijd van de jongste ingeschreven persoon op het adres",
  "leeftijd_max": "leeftijd van de oudste ingeschreven persoon op het adres",
  "leeftijd_mean": "gemiddelde leeftijd van de ingeschreven personen op het adres",
  "aantal_personen": "aantal ingeschreven personen op het adres",
  "leeftijd_std": "statistische methode om de spreiding van de leeftijd te meten op een adres ?",
  "aantal_babies": "aantal ingeschreven babies op een adres",
  "percentage_mannen": "aantal mannen ten opzichte van aantal ingeschrevenen op een adres",
  "percentage_babies": "aantal babies ten opzichte van het aantal ingeschreven op een adres",
  "leegstand": "geeft aan of er iemand staat ingeschreven op een adres",
  "aantal_gezinsverhouding_1": "geeft aan hoeveel gezinshoofden met kinderen ingeschreven staan op het adres",
  "ratio_gezinsverhouding_1": "aantal gezinshoofden met kinderen ten opzichte van het totaal aantal ingeschrevenen",
  "aantal_gezinsverhouding_2": "geeft aan hoeveel gezinshoofden met echtgenoot ingeschreven staan op het adres",
  "ratio_gezinsverhouding_2": "aantal gezinshoofden met echtgenoot ten opzichte van het totaal aantal ingeschrevenen",
  "aantal_gezinsverhouding_3": "geeft aan hoeveel gezinshoofden met echtgenoot en kinderen ingeschreven staan op het adres",
  "ratio_gezinsverhouding_3": "aantal gezinshoofden met echtgenoot en kinderen ten opzichte van het totaal aantal ingeschrevenen op het adres",
  "aantal_gezinsverhouding_4": "geeft aan hoeveel echtgenoten er ingeschreven staan op het adres",
  "ratio_gezinsverhouding_4": "aantal echtgenoten ten opzichte van het totaal aantal ingeschrevenen op het adres",
  "aantal_gezinsverhouding_5": "geeft aan hoeveel kinderen er ingeschreven staan op het adres",
  "ratio_gezinsverhouding_5": "aantal kinderen ten opzichte van het totaal aantal ingeschrevenen op het adres",
  "aantal_gezinsverhouding_6": "geeft aan hoeveel alleenstaanden er ingeschreven staan op het adres",
  "ratio_gezinsverhouding_6": "aantal alleenstaande ten opzichte van het totaal aantal ingeschrevenen op het adres",
  "wng_id": "uniek id dat aan de woning is gekoppeld",
  "postcode": "postcode",
  "sttnaam": "straatnaam",
  "hsnr": "huisnummer",
  "hsltr": "huisletter",
  "toev": "toevoeging",
  "inwnrs": "aantal ingeschreven op het adres",
  "landelijk_id": "uniek landelijk id dat gekoppeld is aan de woning",
  "pvh_omschr": "verdieping van de ingang",
  "sbw_omschr": "soort bestemming van een woning",
  "sbv_omschr": "soort bestemming van een woning (specifieker)",
  "verblijfsobject_id": "uniek id van het verblijfsobject",
  "huisnummer": "huisnummer",
  "huisletter": "huisletter",
  "huisnummer_toevoeging": "toevoeging",
  "oppervlakte": "aantal vierkante meters van de woning",
  "bouwlaag_toegang": "de bouwlaag waarop de voordeur van de woning is",
  "bouwlagen": "aantal bouwlagen  van de woning",
  "aantal_kamers": "aantal kamers van de woning",
  "m2_per_inwoner": "aantal m2 ten opzichte van het aantal ingeschreven personen",
  "m2_per_adult": "aantal m2 ten opzichte van het aantal ingeschreven volwassenen",
  "inwoners_per_kamer": "aantal inwoners ten opzichte van het aantal kamers",
  "adults_per_kamer": "aantal volwassenen ten opzichte van het aantal kamers",
  "achternamen_over_personen": "het aantal achternamen ten opzichte van het aantal personen",
  "has_hotline_melding": "geeft aan of er ooit een hotline melding gemaakt is op dit adres",
  "has_meerdere_hotline_meldingen": "geeft aan of er meer dan 1 hotline melding is gemaakt op dit adres",
  "has_persons_with_prev_confirmed_fraude": "geeft aan of er een persoon ingeschreven staat waarbij eerder woonfraude is geregistreerd",
  "has_persons_with_prev_suspected_fraude": "geeft aan of er een persoon ingeschreven staat wie eerder is verdacht van woonfraude",
  "has_address_prev_confirmed_fraude": "geeft aan of er op het adres eerder woonfraude is geregistreerd",
  "has_address_prev_suspected_fraude": "geeft aan of het adres eerder onderzocht is in een woonfraude zaak"
}

const translate = (str: string) => translationMap[str] ?? str

const humanize = (str: string) => capitalize(str.replace(/_/g, " "))

const filterPositive = (shapValue: CombinedShapValue) => shapValue.shap > 0
const filterNegative = (shapValue: CombinedShapValue) => shapValue.shap < 0

export const parseShapValues = (shapValues: ShapValues, businessRules: BusinessRules): SplitCombinedShapValue => {
  const combined = Object
    .entries(shapValues)
    // We're only interested in the relevant ones:
    .filter(([ key ]) => relevantShapValues.includes(key))
    // Map to 'CombinedShapValue'
    .map(([ key, val ]) => ({
      title: humanize(translate(key)),
      shap: val,
      business: businessRules[key] && roundIfNecessary(businessRules[key])
    }))

  // Sort, highest shap first.
  const sorted = [ ...combined ].sort((a, b) => Math.abs(a.shap) > Math.abs(b.shap) ? -1 : 1)

  // Split shapValues into positive ones and negative ones.
  return {
    positive: sorted.filter(filterPositive),
    negative: sorted.filter(filterNegative)
  }
}

// @see https://stackoverflow.com/a/11832950
// > to ensure things like 1.005 roundIfNecessary correctly, we use

export const roundIfNecessary = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100
