export const getDaySettingsOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  // Map day number from JS (Sunday = 0) to Python (Monday = 0)
  const weekDay = (new Date().getDay() + 6) % 7
  const daySettingsListSpecific = teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(weekDay))
  const daySettingsListGeneral = teamSettings.day_settings_list.filter(ds => ds.week_days === null || ds.week_days.length === 0)

  return (daySettingsListSpecific.length > 0 ? daySettingsListSpecific : daySettingsListGeneral).map(ds => {
    const availability = ds.max_use_limit ? (ds.max_use_limit - ds.used_today_count) : 0
    const availabilityText = availability ? `${ availability } van ${ ds.max_use_limit } beschikbaar` : "niet meer beschikbaar"

    return {
      label: ds.max_use_limit ? `${ ds.name } (${ availabilityText })` : ds.name,
      daySettingsId: ds.id
    }
  })
}
