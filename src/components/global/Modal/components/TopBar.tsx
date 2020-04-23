import styled from "styled-components"
import { constants, ascDefaultTheme } from "@datapunt/asc-ui"

export const TopBar = styled.div`
  box-sizing: border-box;

  background-color: white;    
  border-bottom: 1px solid ${ ascDefaultTheme.colors.tint.level5 };
    
  display: flex;
  height: ${ constants.HEADER_HEIGHT_SMALL }px; 
  padding: 15px;

  h4 {
    flex: 1;
    margin:0;
  }
`
