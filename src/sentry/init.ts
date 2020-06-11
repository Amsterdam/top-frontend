import * as Sentry from "@sentry/browser"
import { dsn } from "../config/sentry"

export default () => Sentry.init({ dsn })
