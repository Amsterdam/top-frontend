import React, { FC } from "react"
import { to } from "../../../config/page"
import { isPage } from "../../../config/page"
import NavigationWrap from "./NavigationWrap"

const NavigationPlanning: FC = () => {
  const isActive = isPage("settings")
  const text = "Settings"
  const menuItems = [{ to: to("settings"), text, isActive }]

  return <NavigationWrap menuItems={ menuItems } />
}
export default NavigationPlanning
