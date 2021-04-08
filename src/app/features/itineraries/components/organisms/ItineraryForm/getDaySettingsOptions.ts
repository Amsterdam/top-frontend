export const getDaySettingsOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  const daySettingsListSpecific = teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(new Date().getDay()))
  const daySettingsListRest = teamSettings.day_settings_list.filter(ds => ds.week_days === null || ds.week_days.length === 0)

  return (daySettingsListSpecific.length > 0 ? daySettingsListSpecific : daySettingsListRest).map(ds => ({
    label: ds.name,
    daySettingsId: ds.id
  }))
}
