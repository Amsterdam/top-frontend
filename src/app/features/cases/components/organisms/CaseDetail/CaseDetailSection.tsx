import React, { FC } from "react"
import { Heading } from "@amsterdam/asc-ui"

import { KeyValueDetail } from "app/features/types"
import InlineSkeleton from "app/features/shared/components/atoms/InlineSkeleton/InlineSkeleton"
import Label from "app/features/shared/components/atoms/Label/Label"
import Value from "app/features/shared/components/atoms/Value/Value"
import formatBoolean from "app/features/shared/utils/formatBoolean"

import {
  CenteredAnchor,
  Grid,
  HrWide,
  Section,
  SectionRow,
  SourceInfo,
  TwoColumns
} from "app/features/cases/components/organisms/CaseDetail/CaseDetailSectionStyles"

export type Props = {
  id?: string
  title?: string
  dataSource?: string
  data?: KeyValueDetail[]
  footer?: { title: string, link: string }
  isBusy?: boolean
}

/**
 * Displays a set of case details in a table. Can show the source of the data and whether data is still loading.
 */
const CaseDetailSection: FC<Props> = ({ id, dataSource, title, data, footer, isBusy, children }) => {
  const hasTitle = title !== undefined
  const showFooter = footer !== undefined

  return (
    <Section id={ id !== undefined ? id : "" }>
      { hasTitle &&
      <Heading forwardedAs="h2">{ title }</Heading>
      }
      <SectionRow>
        { dataSource &&
        <>
          <SourceInfo>Bron: { dataSource }</SourceInfo>
          <HrWide />
        </>
        }
        { children }
        <Grid>
          { data?.map((keyValue, index) => {
            const hasLabel = Array.isArray(keyValue)

            const key = Array.isArray(keyValue) ? keyValue[0] : keyValue
            let value = Array.isArray(keyValue) ? keyValue[1] : keyValue

            if (typeof value === "boolean") {
              value = formatBoolean(value)
            }

            const keyValuePair = <React.Fragment key={ String(key) + index }>
              { hasLabel ?
                <>
                  <Label>{ key }</Label>
                  { isBusy ? <InlineSkeleton /> : (value == null) ? <Value valid={ false } /> : <span>{ value }</span> }
                </>
                :
                <TwoColumns key={ String(key) + index }>{ value }</TwoColumns>
              }
            </React.Fragment>

            const sourceLabel = (
              <TwoColumns key={ String(value) + index }>
                { (index > 0 && !dataSource) && <HrWide /> }
                <SourceInfo>Bron: { value }</SourceInfo>
              </TwoColumns>
            )

            return key === "Databron" ? sourceLabel : keyValuePair
          }) }
        </Grid>
      </SectionRow>
      { showFooter &&
      <SectionRow>
        <CenteredAnchor href={ footer!.link }>{ footer!.title }</CenteredAnchor>
      </SectionRow>
      }
    </Section>
  )
}

export default CaseDetailSection
