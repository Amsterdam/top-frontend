import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import smoothscroll from "smoothscroll-polyfill"
import { enableES5 } from "immer"

smoothscroll.polyfill()
enableES5()
