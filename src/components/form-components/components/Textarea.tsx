import styled, {css} from "styled-components"
import {themeColor} from "@datapunt/asc-ui"
import {focusStyleOutline} from "@datapunt/asc-ui/es/utils"

type StyleProps = {
  error?: string | boolean
}

// NOTE: asc-ui does not export a Textarea yet. That's why we mimic one here.
// (Created an issue here: https://github.com/Amsterdam/amsterdam-styled-components/issues/480)
//
// Heavily inspired by:
// https://github.com/Amsterdam/amsterdam-styled-components/blob/master/packages/asc-ui/src/components/Input/InputStyle.ts

const Textarea = styled.textarea<StyleProps>`
  appearance: none;
  font-size: 1rem;
  border: solid 1px ${themeColor('tint', 'level5')};
  border-radius: 0;
  box-sizing: border-box;
  line-height: 18px;
  padding: 10px;
  width: 100%;
  ${focusStyleOutline(2, 0.5)}
  
  ${({ error }) => !error && css`
      &:hover {
        border-color: ${themeColor('tint', 'level6')};
      }
  `}
  ${({ error }) => error && css`
      border-color: ${themeColor('secondary', 'main')};
  `}
`

export default Textarea
