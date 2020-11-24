import AuthPage from "./components/pages/login/AuthPage"
import LoginPage from "./components/pages/login/LoginPage"
import CallbackPage from "./components/pages/callback/CallbackPage"
import LogoutPage from "./components/pages/logout/LogoutPage"

export default {
  "/authentication/callback": CallbackPage,
  "/auth": AuthPage,
  "/login": LoginPage,
  "/logout": LogoutPage
}
