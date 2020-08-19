import { useEffect } from "react"
import { useVisit } from "../"

export default (id: string | undefined) => {
  const visit = useVisit(id ?? "", { lazy: true })
  const { execGet } = visit
  useEffect(() => {
    if (id === undefined) return
    execGet()
  }, [id, execGet])
  return visit 
}
