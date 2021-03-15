import React from "react"
import EyeButton from "./EyeButton"

const metadata = {
  component: EyeButton,
  title: "Buttons / EyeButton"
}

export default metadata

export const Example: React.VFC<{}> = () => {
  let isOpen = true

  return (
    <EyeButton
      onClick={ () => isOpen = !isOpen }
      isOpen={ isOpen }
    />
  )
}
