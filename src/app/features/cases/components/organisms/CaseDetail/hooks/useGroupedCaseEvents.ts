import { useCaseEvents } from "app/state/rest"

export type TimelineEventItem = {
  type: string
  caseEvents: Components.Schemas.CaseEvent[]
}

type CaseEvent = Components.Schemas.CaseEvent

const shouldBeGrouped = (item: CaseEvent) => item.type !== "GENERIC_TASK"
const equalItems = (i: TimelineEventItem | undefined, ii: CaseEvent) => i !== undefined && i.type === ii.type

const useGroupedCaseEvents = (caseId: string) => {
  const { data } = useCaseEvents(caseId)

  return [
    data?.reduce((acc, item) => {
      const last = acc[acc.length - 1]
      // group
      if (shouldBeGrouped(item) && equalItems(last, item)) {
        last.caseEvents.push(item)
      }
      // new row
      else {
        acc.push({
          type: item.type,
          caseEvents: [ item ]
        })
      }
      return acc
    }, [] as TimelineEventItem[])
  ] as const
}

export default useGroupedCaseEvents
