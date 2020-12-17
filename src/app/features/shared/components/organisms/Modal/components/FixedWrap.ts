import styled from "styled-components"

export const FixedWrap = styled.div`    
  z-index: 99999; // HeaderWrap has z-index of 9999, we have top that. 
    
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
  display: flex;
  flex-direction: column;     
`
