import * as Sentry from "@sentry/browser"
import { dsn } from "../config/sentry"
import { isDevelopment, isAcc, isProduction } from "../config/environment"

export default () => {
  if (isDevelopment === false) {
    const environment = isProduction ? "production" : isAcc ? "acceptance" : undefined
    // @TODO: Pass Git commit hash as third argument
    Sentry.init({
      dsn,
      environment
    })
  }
}
