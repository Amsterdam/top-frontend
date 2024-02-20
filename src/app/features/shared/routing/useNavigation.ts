import { useNavigate } from "react-router-dom"
import { Routes } from "app/config/routes"
import { to, RouteParams } from "./to"

export type NavigateToFunction = <T extends Routes, K extends keyof T>(
  path: K,
  params?: RouteParams<T, K>
) => void;

const useNavigation = () => {
  const navigate = useNavigate()

  const navigateTo = <T extends Routes, K extends keyof T>(
    path: K,
    params?: RouteParams<T, K>
  ) => {
    navigate(to(path, params))
  }

  return { navigateTo }
}

export default useNavigation
