import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import { CaseReason, Project } from "app/features/types"
import Tag from "app/features/shared/components/atoms/Tag/Tag"
import styles from "./ItineraryItemCard.module.css"

type Props = {
  address: string | JSX.Element
  backgroundColor?: string
  badge?: JSX.Element
  buttons?: (onDeleteButtonClick: () => void) => JSX.Element
  daySettings?: Components.Schemas.DaySettings
  href?: string
  isVisited?: boolean
  notes?: JSX.Element
  postalCode: string | JSX.Element
  reason: CaseReason
  project?: Project
  tags?: Components.Schemas.CaseTag[]
  teamMembersList?: string
  hasPriority?: boolean
  hasWarrant?: boolean
  deleted?: boolean
}

const ItineraryItemCard: React.FC<Props> = ({
  address,
  backgroundColor,
  badge,
  buttons,
  daySettings,
  href,
  isVisited,
  notes,
  postalCode,
  project,
  reason,
  tags = [],
  teamMembersList,
  hasPriority,
  hasWarrant,
  deleted = false
}) => {
  const navigate = useNavigate()
  const [isBeingDeleted, setIsBeingDeleted] = useState(false)

  const setBeingDeleted = useCallback(
    () => setIsBeingDeleted(true),
    [setIsBeingDeleted]
  )

  const handleClick = useCallback(() => {
    if (href) {
      return navigate(href)
    }
  }, [href, navigate])

  return (
    <article
      className={styles.card}
      style={{
        opacity: deleted ? 0.4 : 1,
        backgroundColor: backgroundColor || "#FFFFFF"
      }}
    >
      <div className={styles.flex}>
        <div
          className={styles.cardMain}
          onClick={handleClick}
          style={{ opacity: isVisited || isBeingDeleted ? 0.4 : 1 }}
        >
          <h1 className={styles.addressTitle}>{address}</h1>
          <p className={styles.postalCode}>{postalCode}</p>
          <p className={styles.reason}>
            {reason?.name}
            {project?.name ? `: ${project?.name}` : ""}
          </p>
        </div>
        <div className={styles.cardActions}>
          {buttons && buttons(setBeingDeleted)}
        </div>
      </div>
      <div className={styles.cardMain}>
        <div className={styles.cardBadges}>
          {badge}
          {hasPriority && <StadiumBadge stadium="Prio" variant="secondary" />}
          {hasWarrant && <StadiumBadge stadium="Machtiging" variant="tint" />}
          {tags.map((tag) => (
            <Tag key={tag.id} color="rgb(255, 145, 0)">
              {tag.name}
            </Tag>
          ))}
        </div>
        {notes}
        {teamMembersList && (
          <p className={styles.cardText}>In looplijst van {teamMembersList}.</p>
        )}
      </div>
    </article>
  )
}

export default ItineraryItemCard
