import React from "react"
import styled from "styled-components"

import Badge, { Props as BadgeProps } from "app/features/shared/components/atoms/Badge/Badge"

type Props = {
  stadium: string
  stadiaLabels?: Components.Schemas.StadiumLabel[]
  variant?: BadgeProps["variant"]
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const StadiumBadge: React.FC<Props> = ({ stadium, variant }) =>
    (<Column>
      <Badge variant={ variant ?? "primary" }>
        { stadium }
      </Badge>
    </Column>)

export default StadiumBadge
