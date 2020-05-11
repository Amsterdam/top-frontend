import getCurrentDay from "../../../../lib/utils/day"
import isWeekDay from "../../../../lib/utils/isWeekDay"

export const getDayPartOptions = (settings: PlanningSettings) => {
  const currentDay = settings.days[getCurrentDay()]
  return isWeekDay()
    ? [ { label: "daglijst", settingsList: currentDay?.day }, { label: "avondlijst", settingsList: currentDay?.evening } ]
    : [ { label: "weekend", settingsList: currentDay?.day } ]
}
