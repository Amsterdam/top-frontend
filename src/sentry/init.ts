import * as Sentry from "@sentry/browser"

const initSentry = () => {
  if (process.env.REACT_APP_SENTRY_ENV && process.env.REACT_APP_SENTRY_ENV !== "development") {
    Sentry.init({
      dsn: "https://83c49254f21cb1218d39607987208f87@sentry.data.amsterdam.nl/12",
      environment: process.env.REACT_APP_SENTRY_ENV,
      release: process.env.REACT_APP_GIT_COMMIT_HASH,
      autoSessionTracking: false
    })
  }
}

export default initSentry
