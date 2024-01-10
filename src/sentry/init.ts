import * as Sentry from "@sentry/browser"
import { env } from "app/config/env"

const initSentry = () => {
  if (env.REACT_APP_SENTRY_ENV && env.REACT_APP_SENTRY_ENV !== "development") {
    Sentry.init({
      dsn: "https://889f135ead3a4523aa463e38e87e6a92@sentry-new.data.amsterdam.nl/47",
      environment: env.REACT_APP_SENTRY_ENV,
      release: env.REACT_APP_GIT_COMMIT_HASH,
      autoSessionTracking: false
    })
  }
}

export default initSentry
