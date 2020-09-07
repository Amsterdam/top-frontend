import React, { FC } from "react"
import { Icon } from "@datapunt/asc-ui"

// TODO: Use Info icon from @datapunt/asc-assets
const InfoIcon: FC = () => (
  <Icon
    inline
    size={ 20 }
    iconUrl={ `${ process.env.PUBLIC_URL }/icons/Info.svg` }
  />
)
export default InfoIcon
