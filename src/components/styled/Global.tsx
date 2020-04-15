import { createGlobalStyle } from "styled-components"

// @TODO: Eventually all / most of these styling should be moved into components. Only using ASC GlobalStyle
const Global = createGlobalStyle`

  h1, p, a {
    margin: 0;
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 1.5em;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }

  a {
    text-decoration: none;
    color: #004699;
    font-weight: bold;
  }

  // IE11
  // @TODO: Check if ASC Global Styling already sets this
  main {
    display: block;
  }
`
export default Global
