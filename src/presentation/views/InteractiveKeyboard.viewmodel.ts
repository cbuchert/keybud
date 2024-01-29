import { Dispatch, SetStateAction, useCallback } from "react"
import { getCodeIsModifier } from "../../utils/getCodeIsModifier.ts"

export const useInteractiveKeyboardViewModel = (
  eventCodes: Set<string>,
  pinnedCodes: Set<string>,
  setPinnedCodes: Dispatch<SetStateAction<Set<string>>>
) => {
  const handleClick = useCallback(
    (code: KeyboardEvent["code"]) => () => {
      const hasActiveNonModifier = [...eventCodes, ...pinnedCodes].some(
        (code) => {
          return !getCodeIsModifier(code)
        }
      )
      const eventCodesContainNonModifier = [...eventCodes].some(
        (code) => !getCodeIsModifier(code)
      )

      setPinnedCodes((previousPinnedCodes) => {
        const isAlreadyPinned = pinnedCodes.has(code)
        const isNonModifier = !getCodeIsModifier(code)

        if (isAlreadyPinned) {
          return new Set(
            [...previousPinnedCodes].filter((pinnedCode) => pinnedCode !== code)
          )
        } else if (isNonModifier && eventCodesContainNonModifier) {
          return previousPinnedCodes
        } else if (hasActiveNonModifier && isNonModifier) {
          return new Set([
            ...[...previousPinnedCodes].filter((code) =>
              getCodeIsModifier(code)
            ),
            code,
          ])
        } else {
          return new Set([...previousPinnedCodes, code])
        }
      })
    },
    [eventCodes, pinnedCodes, setPinnedCodes]
  )

  return {
    handleClick,
  }
}
