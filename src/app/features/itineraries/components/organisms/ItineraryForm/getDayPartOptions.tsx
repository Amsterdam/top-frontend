import getCurrentDay from "app/features/shared/utils/day"
import isWeekDay from "app/features/shared/utils/isWeekDay"

export const getDayPartOptions = (settings: Components.Schemas.PlannerSettings) => {
  const currentDay = settings.days[getCurrentDay()]
  return isWeekDay()
    ? [ { label: "daglijst", settingsList: currentDay.day }, { label: "avondlijst", settingsList: currentDay.evening } ]
    : [ { label: "weekend", settingsList: currentDay.day } ]
}
