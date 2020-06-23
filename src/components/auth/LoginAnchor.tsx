import React, { FC, useMemo } from "react"
import { isLocal } from "../../config/environment"
import { getOIDCProviderUrl, authOIDDummyCode } from "../../config/api"
import { to } from "../../config/page"
import { Button } from "@datapunt/asc-ui"

const LoginAnchor: FC = () => {
  const gripUri = useMemo(getOIDCProviderUrl, [])
  const href = isLocal ? to(`authentication/callback?code=${ authOIDDummyCode }`) : gripUri
  return <Button href={ href } as="a">Log in met je ADW account</Button>
}
export default LoginAnchor
