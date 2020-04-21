import capitalize from "../../../../lib/utils/capitalize"

type CombinedShapValue = {
  title: string
  shap: number
  business: number|undefined
}

type SplitCombinedShapValue = {
  positive: CombinedShapValue[],
  negative: CombinedShapValue[],
}

// We're only interested in these values:
const relevantShapValues:string[] = [
  'begindatum',
  'eigenaar',
  'woonfraude',
  'eigenaar_particulier',
  'aantal_hotline_meldingen',
  'aantal_anoniem',
  'aantal_melders',
  'aantal_overlast_meldingen',
  'ratio_anoniem',
  'aantal_achternaam_unique',
  'aantal_kinderen',
  'leeftijd_min',
  'leeftijd_max',
  'aantal_personen',
  'aantal_babies',
  'percentage_mannen',
  'percentage_babies',
  'leegstand',
  'aantal_gezinsverhouding_1',
  'ratio_gezinsverhouding_1',
  'aantal_gezinsverhouding_2',
  'ratio_gezinsverhouding_2',
  'aantal_gezinsverhouding_3',
  'ratio_gezinsverhouding_3',
  'aantal_gezinsverhouding_4',
  'ratio_gezinsverhouding_4',
  'aantal_gezinsverhouding_5',
  'ratio_gezinsverhouding_5',
  'aantal_gezinsverhouding_6',
  'ratio_gezinsverhouding_6',
  'postcode',
  'sttnaam',
  'toev',
  'inwnrs',
  'oppervlakte',
  'bouwlaag_toegang',
  'bouwlagen',
  'aantal_kamers',
  'm2_per_inwoner',
  'm2_per_adult',
  'inwoners_per_kamer',
  'adults_per_kamer',
  'achternamen_over_personen',
  'has_hotline_melding',
  'has_meerdere_hotline_meldingen',
  'has_persons_with_prev_confirmed_fraude',
  'has_persons_with_prev_suspected_fraude',
  'has_address_prev_confirmed_fraude',
  'has_address_prev_suspected_fraude'
]

// Some shap-value keys are hard to grasp.
// We translate them into something useful with this map:
const translationMap: {[translation:string]: string} = {
   'aantal_gezinsverhouding_1': 'Aantal gezinshoofd met kinderen',
   'ratio_gezinsverhouding_1': 'Ratio gezinshoofd met kinderen',
   'aantal_gezinsverhouding_2': 'Aantal gezinshoofd met echtgenoot',
   'ratio_gezinsverhouding_2': 'Ration gezinshoofd met echtgenoot',
   'aantal_gezinsverhouding_3': 'Aantal gezinshoofd met echtgenoot en kinderen',
   'ratio_gezinsverhouding_3': 'Ratio gezinshoofd met echtgenoot en kinderen',
   'aantal_gezinsverhouding_4': 'Aantal Echtgenoot',
   'ratio_gezinsverhouding_4': 'Ratio Echtgenoot',
   'aantal_gezinsverhouding_5': 'Aantal kind',
   'ratio_gezinsverhouding_5': 'Ratio  kind',
   'aantal_gezinsverhouding_6': 'Aantal alleenstaande',
   'ratio_gezinsverhouding_6': 'Ratio alleenstaande'
}

const translate = (str:string) => translationMap[str] ?? str

const humanize = (str:string) => capitalize(str.replace(/_/g, ' '))

const filterPositive = (shapValue:CombinedShapValue) => shapValue.shap > 0
const filterNegative = (shapValue:CombinedShapValue) => shapValue.shap < 0

export const parseShapValues = (shapValues:ShapValues, businessRules:BusinessRules):SplitCombinedShapValue => {
  const combined = Object
    .entries(shapValues)
    // We're only interested in the relevant ones:
    .filter(([key]) => relevantShapValues.includes(key))
    // Map to 'CombinedShapValue'
    .map(([key, val]) => ({
      title: humanize(translate(key)),
      shap: val,
      business: businessRules[key] && roundIfNecessary(businessRules[key])
    }))

  // Sort, highest shap first.
  const sorted = [...combined].sort((a,b) => Math.abs(a.shap) > Math.abs(b.shap) ? -1 : 1)

  // Split shapValues into positive ones and negative ones.
  return {
    positive: sorted.filter(filterPositive),
    negative: sorted.filter(filterNegative)
  }
}

// @see https://stackoverflow.com/a/11832950
// > to ensure things like 1.005 roundIfNecessary correctly, we use
export const roundIfNecessary = (num:number) => Math.round((num + Number.EPSILON) * 100) / 100
