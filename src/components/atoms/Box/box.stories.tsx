import React from "react"
import Box from "./Box"
import { number, array, withKnobs, select, text } from "@storybook/addon-knobs"
import { Responsive } from "../responsive"

export default {
  title: "Box",
  decorators: [withKnobs]
}


// TODO make utility for these `select` values :-)

export const Example = () => (
  // @ts-ignore
  <Box
    p={select("p", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    pt={select("pt", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    pr={select("pr", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    pb={select("pb", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    pl={select("pl", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}

    m={select("m", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    mt={select("mt", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    mr={select("mr", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    mb={select("mb", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    ml={select("ml", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}

    width={select("width", { "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "11": 11, "12": 12, undefined: undefined }, undefined)}
    bgColor={select("bgColor", { "level1":"level1", "level2":"level2", "level3":"level3", "level4":"level4", "level5":"level5", "undefined": undefined }, undefined)}
    hAlign={select("hAlign", { "flex-start": "flex-start", "flex-end": "flex-end", "center": "center", "space-between": "space-between", "space-around": "space-around", "space-evenly": "space-evenly", "undefined": undefined }, undefined)}
    vAlign={select("vAlign", { "flex-start": "flex-start", "flex-end": "flex-end", "center": "center", "baseline": "baseline", "stretch": "stretch", "auto": "auto", "undefined": undefined }, undefined)}
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
    <Box width={{ mobileS: 12, tabletM: 6 }} p={2} bgColor='level2' vAlign='flex-end' hAlign='flex-end'>
      aligned
    </Box>
  </Box>
)
