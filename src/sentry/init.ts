import * as Sentry from "@sentry/browser"

export default () => {
  Sentry.init({
    dsn: "https://889f135ead3a4523aa463e38e87e6a92@sentry.data.amsterdam.nl/47"
  })
}
