import getCurrentDay from "app/features/shared/utils/day"
import isWeekDay from "app/features/shared/utils/isWeekDay"

export const getDayPartOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  // const currentDay = settings.days[getCurrentDay()]
  console.log((new Date().getDay()))
  return teamSettings.day_settings_list.filter(ds => ds.week_day === ((new Date().getDay()) - 0)).map(ds => ({
      "label": ds.name,
      "settingsList": ds
    }))
}
