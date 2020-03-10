import React, { FC, useState } from "react"
import styled from "styled-components"
import CopyToClipboardButton from "../global/CopyToClipboardButton"
import PlanningResultItineraries from "./PlanningResultItineraries"
import itineraryToClipboardText from "../../lib/itineraryToClipboardText"

type Props = {
  title?: string
  lists: (BWVData[] | undefined)[]
  subtitles?: string[]
  hasCopyButton?: boolean
  isEditable?: boolean
}

const Div = styled.div`
  padding: 12px
  border: solid 1px #B4B4B4
  margin-bottom: 36px
`
const H1Wrap = styled.div`
  display: flex
  justify-content: space-between
  margin: 12px 0
`
const H1 = styled.h1`
  font-size: 24px
`

const createClipboardText = (lists: BWVData[][], subtitles?: string[]) => {
  const nl = "\n"
  return lists.map((list, index) => {
    const subtitle = subtitles && subtitles[index]
    const hasSubtitle = subtitle !== undefined
    const addressesText = list.map(itineraryToClipboardText).join(nl) + nl
    return `${ hasSubtitle ? subtitle + nl : "" }${ addressesText }${ nl }`
  }).join(nl)
}

const PlanningResultLists: FC<Props> = ({ title, lists, subtitles = [], hasCopyButton = true, isEditable = true }) => {

  const hasTitle = title !== undefined
  const nonEmptyLists = lists.filter(list => list !== undefined) as BWVData[][]
  const totalLength = nonEmptyLists.flat().length
  const fullTitle = hasTitle ? `${ title } ${ totalLength > 0 ? `(${ totalLength })` : "" } ` : ""
  const [isCopied, setIsCopied] = useState(false)
  const text = createClipboardText(nonEmptyLists, subtitles)
  const onClick = () => setIsCopied(true)

  const showCopyButton = hasCopyButton && totalLength > 0

  return (
    <Div className="PlanningResultLists">
      <H1Wrap>
        { hasTitle &&
          <H1>{ fullTitle }</H1>
        }
        { showCopyButton &&
          <CopyToClipboardButton text={ text } onClick={ onClick } />
        }
      </H1Wrap>
      { lists.map((itineraries, index) => {
        const title = subtitles[index]
        return itineraries !== undefined ?
          <PlanningResultItineraries
            key={ index }
            itineraries={ itineraries }
            title={ title }
            isCopied={ isCopied }
            isEditable={ isEditable } />
          :
          null
      }) }
    </Div>
  )
}
export default PlanningResultLists
