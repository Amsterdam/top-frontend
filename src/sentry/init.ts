import * as Sentry from "@sentry/browser"

const initSentry = () => {
  if (process.env.REACT_APP_SENTRY_ENV && process.env.REACT_APP_SENTRY_ENV !== "development") {
    Sentry.init({
      dsn: "https://889f135ead3a4523aa463e38e87e6a92@sentry.data.amsterdam.nl/47",
      environment: process.env.REACT_APP_SENTRY_ENV,
      release: process.env.REACT_APP_GIT_COMMIT_HASH
    })
  }
}

export default initSentry
