export const getDaySettingsOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  const weekDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const daySettingsListSpecific = teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(weekDay))
  const daySettingsListGeneral = teamSettings.day_settings_list.filter(ds => ds.week_days === null || ds.week_days.length === 0)

  return (daySettingsListSpecific.length > 0 ? daySettingsListSpecific : daySettingsListGeneral).map(ds => ({
      label: `${ ds.name } (${ (ds.max_use_limit ?? 0) - ds.used_today_count } van ${ ds.max_use_limit } beschikbaar)`,
      daySettingsId: ds.id
    })
  )
}
