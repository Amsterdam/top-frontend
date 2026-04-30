import { fixDateFormat } from "app/features/settings/utils/fixDateFormat"
import { mapCombiteamToBoolean } from "../mappers/combiteam.mapper"

export const prepareDaySettingsPayload = (data: any) => {
  const values = { ...data }

  if (data.postal_codes_type === "postcode") {
    values.districts = []
  } else if (data.postal_codes_type === "stadsdeel") {
    values.postal_code_ranges = []
  }

  values.opening_date = fixDateFormat(values.opening_date)

  values.housing_corporation_combiteam = mapCombiteamToBoolean(
    values.housing_corporation_combiteam
  )

  return values
}