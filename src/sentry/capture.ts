import * as Sentry from "@sentry/browser"

// eslint-disable-next-line import/no-anonymous-default-export

export default (message: string) => {
  Sentry.captureException(new Error(message))
}
