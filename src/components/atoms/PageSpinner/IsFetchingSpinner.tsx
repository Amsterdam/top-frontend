import React from "react"
import { useIsFetching } from "../../../state/useIsFetching"
import { PageSpinner } from "./PageSpinner"

export const IsFetchingSpinner: React.FC = ({ children }) => {
  const isFetching = useIsFetching()
  return (
    <PageSpinner isSpinning={isFetching}>
      {children}
    </PageSpinner>)
}
