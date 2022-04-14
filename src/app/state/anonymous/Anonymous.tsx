import React, { FC, useContext } from "react"
import { AnonymousContext } from "./AnonymousProvider"

const Anonymous: FC = () => {
  const { isAnonymous } = useContext(AnonymousContext)
  return isAnonymous
    ? (
    <style>
      {
        `.anonymous, .anonymous a {
            color: transparent;
            text-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          }
          .blur {
            -webkit-filter: blur(5px);
            -moz-filter: blur(5px);
            -o-filter: blur(5px);
            -ms-filter: blur(5px);
            filter: blur(5px);
          }
        `
      }
    </style>
    ) : null
}

export default Anonymous
