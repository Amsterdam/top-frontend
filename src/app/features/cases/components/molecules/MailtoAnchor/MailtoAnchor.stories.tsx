import React from "react"
import MailtoAnchor, { Props as MailtoAnchorProps } from "app/features/cases/components/molecules/MailtoAnchor/MailtoAnchor"

const metadata = {
  title: "Feedback / MailtoAnchor",
  component: MailtoAnchor
}

export default metadata

export const Example: React.VFC<MailtoAnchorProps> = (args) => {
  args.aantalBouwlagen = undefined
  args.address = "Weesperstraat 113"
  args.gebruiksdoel = "Kantoorfunctie"
  args.isWoonboot = false
  args.oppervlak = 6474
  args.postalCode = "1018 VN"

  return <MailtoAnchor { ...args } />
}
