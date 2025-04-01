import styled from "styled-components"

export type Props = {
  variant?: "primary" | "secondary" | "tint"
};

const Badge = styled.span<Props>`
  display: inline-block;
  background-color: ${(props) =>
    props.variant === "primary"
      ? "#004699"
      : props.variant === "secondary"
      ? "#EC0000"
      : "#767676"};
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  color: #FFFFFF;
`

export default Badge
