import styled from "styled-components"
import { Button, themeColor } from "@datapunt/asc-ui"

const StyledButton = styled(Button)`
  border: solid 1px ${ themeColor("tint", "level6") };   
`

export default StyledButton
