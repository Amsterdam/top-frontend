export const getDayPartOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  // const currentDay = settings.days[getCurrentDay()]
  console.log((new Date().getDay()))
  return teamSettings.day_settings_list.filter(ds => ds.week_day === ((new Date().getDay()))).map(ds => ({
      "label": ds.name,
      "settingsList": ds
    }))
}
