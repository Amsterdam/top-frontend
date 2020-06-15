import * as Sentry from "@sentry/browser"
import { dsn } from "../config/sentry"

const environment = process.env.NODE_ENV
const release = process.env.GIT_COMMIT

export default () => {
  if (environment !== "development") {
    Sentry.init({
      dsn,
      environment,
      release
    })
  }
}
