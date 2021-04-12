import config from "app/config/config"

export const filterEmptyPostalCodes = (settings: any) =>
  ({
    ...settings,
    postal_code_ranges: settings.postal_code_ranges?.filter((i: any) => {
      if (i == null || !Object.keys(i).includes("range_end") || !Object.keys(i).includes("range_start")) {
        return false
      }
      if (!i.range_end) {
        i.range_end = config.settings.postalCodeMax
      }
      if (!i.range_start) {
        i.range_start = config.settings.postalCodeMin
      }
      Object.keys(i).filter(x => ![ "range_start", "range_end" ].includes(x)).map(d => delete i[d])
      return true
    }) ?? []
  })
