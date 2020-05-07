import React, { useCallback, useEffect, useState } from "react"

type Props = {
  delay?: number
}

export const DelayedChildren: React.FC<Props> = ({ delay = 500, children }) => {
  const [isShown, setIsShown] = useState(false)

  // Wrap setter in a callback, we want to be able to safely clear a timeout on it.
  const delayedSet = useCallback(() => { setIsShown(true) }, [setIsShown])

  useEffect(() => {
    // Wait a little while to setIsShown
    const timeoutHandle = setTimeout(delayedSet, delay)
    // Clear timeout, onWillUnmount:
    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
    }
  }, [delay, delayedSet])

  return <>{ isShown && children }</>
}
