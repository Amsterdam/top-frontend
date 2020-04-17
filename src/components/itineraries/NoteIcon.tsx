import React, { FC } from "react"
import { basepath } from "../../config/page"
import styled from "styled-components"

const Img = styled.img`
  width: 20px;
  height: 20px;
`
const NoteIcon: FC = () => <Img src={ `${ basepath }icons/note@2x.png` } />
export default NoteIcon
