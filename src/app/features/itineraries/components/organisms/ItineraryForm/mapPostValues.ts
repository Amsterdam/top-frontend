import currentDate from "app/features/shared/utils/currentDate"
import { wrapInNameObject, wrapInNameObjects } from "app/features/shared/utils/wrapInNameObjects"

export const mapPostValues = ({ teamSettings, team_members, postalCodeRange, startAddress, openingsDate, numAddresses, projects, dayPart: { settingsList } }: any) => ({
    created_at: currentDate(),
    team_members: team_members.map(({ id }: { id: string }) => ({ user: { id } })),
    postal_code_settings: postalCodeRange,
    settings: {
      start_case: {
        case_id: startAddress
      },
      opening_date: openingsDate,
      target_length: numAddresses,
      projects: wrapInNameObjects(settingsList?.projects),
      primary_stadium:  wrapInNameObject(settingsList?.primary_stadium),
      secondary_stadia: wrapInNameObjects(settingsList?.secondary_stadia),
      exclude_stadia: wrapInNameObjects(settingsList?.exclude_stadia),
      team_settings: teamSettings
    }
})
