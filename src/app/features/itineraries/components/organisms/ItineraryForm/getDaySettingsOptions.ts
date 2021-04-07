export const getDaySettingsOptions = (teamSettings: Components.Schemas.TeamSettings) => {
  const daySettingsList = teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(new Date().getDay()))
  return (daySettingsList.length > 0 ? daySettingsList : teamSettings.day_settings_list.filter(ds => ds.week_days === null)).map(ds => ({
    label: ds.name,
    daySettingsId: ds.id
  }))
}
