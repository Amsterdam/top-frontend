// @TODO: idealy this hook would be unnecessary
// check the following link for a deeper explanation of the problem it is trying to fix
// @LINK: https://github.com/facebook/create-react-app/issues/6880

import { useCallback } from "react"

// @LINK: https://stackoverflow.com/questions/29689966/typescript-how-to-define-type-for-a-function-callback-as-any-function-type-no
type FEmptyVoid = () => void
type FEmptyReturn = () => any
type FArgVoid = (...args: any[]) => void
type FArgReturn = (...args: any[]) => any
type F = FEmptyVoid | FEmptyReturn | FArgVoid | FArgReturn

const useMakeStable = (f: F) => useCallback(f, [])
export default useMakeStable
