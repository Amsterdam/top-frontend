import { createGlobalStyle } from "styled-components"

// @TODO: Eventually all / most of these styling should be moved into components. Only using ASC GlobalStyle
const Global = createGlobalStyle`

  h1, p, a {
    margin: 0;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 1.5em;
  }
`
export default Global
