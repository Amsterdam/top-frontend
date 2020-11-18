import currentDate from "app/features/shared/utils/currentDate"

export const mapPostValues = ({ team_members, startAddress, numAddresses, daySettings: { daySettingsId } }: any) => ({
    created_at: currentDate(),
    team_members: team_members.map(({ id }: { id: string }) => ({ user: { id } })),
    start_case: {
      case_id: startAddress
    },
    target_length: numAddresses,
    day_settings_id: daySettingsId
})
