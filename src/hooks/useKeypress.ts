import { isEqual } from "lodash"
import { useEffect, useState } from "react"
import { getCodeIsModifier } from "../utils/getCodeIsModifier.ts"
import { getKeyboardEventCodes } from "../utils/getKeyboardEventCodes.ts"

export const useKeypress = (pinnedCodes: Set<KeyboardEvent["code"]>) => {
  const [eventCodes, setEventCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()

      setEventCodes((previousCodes) => {
        const codes = new Set(
          [...getKeyboardEventCodes(event)].filter((code) => {
            const isNonModifier = !getCodeIsModifier(code)
            const hasPinnedNonModifier = [...pinnedCodes].some(
              (pinnedCode) => !getCodeIsModifier(pinnedCode)
            )

            return !(isNonModifier && hasPinnedNonModifier)
          })
        )

        // Clear the keyboard if the event is repeated.
        if (isEqual(previousCodes, codes)) {
          return new Set()
        }

        return codes
      })
    }

    document.addEventListener("keydown", handleKeyboardEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [pinnedCodes])

  return eventCodes
}
