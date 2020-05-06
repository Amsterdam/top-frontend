import React from "react"
import Box from "./Box"
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs"

export default {
  title: "Box",
  decorators: [withKnobs]
}

const arrayToObject = (array: Array<string|number>) => array.reduce(
  (acc, val) => ({ ...acc, [val]: val }), {}
)

const zeroToTwelve = arrayToObject([0, 1,2,3,4,5,6,7,8,9,10,11,12])
const hAlign = arrayToObject(["flex-start","flex-end","center","space-between","space-around","space-evenly"])
const vAlign = arrayToObject(["flex-start", "flex-end", "center", "baseline", "stretch", "auto"])

export const Example = () => (
  <Box
    p={select("p", zeroToTwelve, 0)}
    pt={select("pt", zeroToTwelve, 0)}
    pr={select("pr", zeroToTwelve, 0)}
    pb={select("pb", zeroToTwelve, 0)}
    pl={select("pl", zeroToTwelve, 0)}

    m={select("m", zeroToTwelve, 0)}
    mt={select("mt", zeroToTwelve, 0)}
    mr={select("mr", zeroToTwelve, 0)}
    mb={select("mb", zeroToTwelve, 0)}
    ml={select("ml", zeroToTwelve, 0)}

    width={select("width", zeroToTwelve, 0)}
    bgColor={select("bgColor", arrayToObject(["level1", "level2", "level3", "level4", "level5"]), "level1")}
    hAlign={select("hAlign", hAlign, "flex-start")}
    vAlign={select("vAlign", vAlign, "flex-start")}
  >
    { text("content", "Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod.") }
  </Box>
)

export const CombinedExample = () => (
  <Box>
    <Box width={{ mobileS: 12, tabletM: 6 }} p={2} bgColor='level3' >
      Nullam quis risus eget urna mollis ornare vel eu leo.
      Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    </Box>
    <Box width={{ mobileS: 12, tabletM: 6 }}
         p={2}
         bgColor='level2'
         hAlign={select("hAlign", hAlign, "flex-end")}
         vAlign={select("vAlign", vAlign, "flex-end")}>
      aligned
    </Box>
  </Box>
)

export const StretchedExample = () => (
  <Box>
    <Box p={2} bgColor='level3' width={select("width: 1", zeroToTwelve, 3)} stretch={boolean("stretch: 1", false)}>1</Box>
    <Box p={2} bgColor='level4' width={select("width: 2", zeroToTwelve, 3)} stretch={boolean("stretch: 2", false)}>2</Box>
    <Box p={2} bgColor='level5' width={select("width: 3", zeroToTwelve, 0)} stretch={boolean("stretch: 3", true)}>3</Box>
  </Box>
)
