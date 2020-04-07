import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import NavigationPlanning from "../components/global/NavigationPlanning"
import Settings from "../components/planning/Settings"

type Props = RouteComponentProps

const SettingsPage: FC<Props> = () => (
    <>
      <NavigationPlanning />
      <Settings />
    </>
  )

export default SettingsPage
