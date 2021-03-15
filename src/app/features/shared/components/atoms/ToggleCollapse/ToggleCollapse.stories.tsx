import React, { useCallback, useState } from "react"
import ToggleCollapse, { Props as ToggleCollapseProps } from "app/features/shared/components/atoms/ToggleCollapse/ToggleCollapse"

const metadata = {
  title: "Forms / ToggleCollapse",
  component: ToggleCollapse
}

export default metadata

export const Example: React.VFC<ToggleCollapseProps> = () => {
  const [ isCollapsed, setIsCollapsed ] = useState(true)
  const toggleCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [ setIsCollapsed, isCollapsed ])

  return (
    <ToggleCollapse onClick={ toggleCollapsed } isCollapsed={ isCollapsed } />
  )
}
