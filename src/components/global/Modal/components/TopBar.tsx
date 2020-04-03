import styled from "styled-components"
import {constants} from "@datapunt/asc-ui"
import {ascDefaultTheme} from "@datapunt/asc-core"

export const TopBar = styled.div`
  box-sizing: border-box;

  background-color: white;
  position: relative;   // relative, because we want to  position the close icon absolutely within it.  
    
  height: ${constants.HEADER_HEIGHT_SMALL}px; 
  padding: 15px;
     
  border-bottom: 1px solid ${ascDefaultTheme.colors.tint.level5};
  
  h4 {
    margin:0;
  }
`
