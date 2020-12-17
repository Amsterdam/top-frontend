export const getDaySettingsOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  const daySettingsList = teamSettings.day_settings_list.filter(ds => ds.week_day === (new Date().getDay()))
  return (daySettingsList.length > 0 ? daySettingsList : teamSettings.day_settings_list.filter(ds => ds.week_day === null)).map(ds => ({
    label: ds.name,
    daySettingsId: ds.id
  }))
}
