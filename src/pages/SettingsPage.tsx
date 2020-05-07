import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import NavigationPlanning from "../components/global/navigation/NavigationPlanning"
import Settings from "../components/planning/Settings"
import { IsFetchingSpinner } from "../components/atoms/PageSpinner/IsFetchingSpinner"

type Props = RouteComponentProps

const SettingsPage: FC<Props> = () => (
    <>
      <NavigationPlanning />
      <IsFetchingSpinner>
        <Settings />
      </IsFetchingSpinner>
    </>
  )

export default SettingsPage
