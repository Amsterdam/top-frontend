const THEME_SUBLET_ID = "6" // Onderhuur

export const isSubletting = (teamSettings?: Components.Schemas.TeamSettings | Components.Schemas.DaySettings["team_settings"]) => (
  teamSettings?.zaken_team_name === THEME_SUBLET_ID
)

export default isSubletting
