import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import { LocationProvider } from "@reach/router"
import { addDecorator } from "@storybook/react"
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui"

const extendedTheme = {
  globalStyle: "",
}

function withGlobalStyles (storyFn) {
  return (
    <ThemeProvider overrides={extendedTheme}>
      <LocationProvider>
        <GlobalStyle />
        {storyFn()}
      </LocationProvider>
    </ThemeProvider>
  )
}

addDecorator(withGlobalStyles)

export const parameters = {
  viewMode: "docs",
  viewport: {
    viewports: {
      mobileS: {
        name: "mobileS",
        styles: {
          width: "320px",
          height: "768px",
        },
      },
      mobileM: {
        name: "mobileM",
        styles: {
          width: "375px",
          height: "768px",
        },
      },
      mobileL: {
        name: "mobileL",
        styles: {
          width: "414px",
          height: "768px",
        },
      },
      tabletS: {
        name: "tabletS",
        styles: {
          width: "540px",
          height: "768px",
        },
      },
      tabletM: {
        name: "tabletM",
        styles: {
          width: "768px",
          height: "768px",
        },
      },
      laptop: {
        name: "laptop",
        styles: {
          width: "1024px",
          height: "768px",
        },
      },
      laptopM: {
        name: "laptopM",
        styles: {
          width: "1200px",
          height: "768px",
        },
      },
      laptopL: {
        name: "laptopL",
        styles: {
          width: "1430px",
          height: "768px",
        },
      },
      desktop: {
        name: "desktop",
        styles: {
          width: "1920px",
          height: "768px",
        },
      },
      desktopL: {
        name: "desktopL",
        styles: {
          width: "2560px",
          height: "768px",
        }
      }
    }
  },
}
