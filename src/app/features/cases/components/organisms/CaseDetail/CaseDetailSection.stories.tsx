import React from "react"
import CaseDetailSection, { Props as CaseDetailSectionProps } from "app/features/cases/components/organisms/CaseDetail/CaseDetailSection"

const metadata = {
  title: "Domain / CaseDetailSection",
  component: CaseDetailSection,
  argTypes: {
    experimental: { description: "Whether the section contains experimental data. Will add a subtitle if truthy, and a footer message in red if text." }
  }
}

export default metadata

export const Example: React.VFC<CaseDetailSectionProps> = (args) => {
  args.id = "general"
  args.title = "Algemeen"
  args.dataSource = "BAG"
  args.data = [
    [ "Straat", "Weesperstraat" ],
    [ "Huisnummer", 113 ],
    [ "Toevoeging", "" ],
    [ "Plaats", "Amsterdam" ],
    [ "Eigenaar", undefined ],
    [ "B&B-vergunning", false ]
  ]
  args.footer = {
    title: "Bekijk in Data en Informatie",
    link: "https://data.amsterdam.nl/data/bag/verblijfsobject/id0363010000864314/"
  }

  return <CaseDetailSection { ...args } />
}
