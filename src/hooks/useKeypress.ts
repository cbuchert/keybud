import { useEffect, useState } from "react"
import { getCodeIsModifier } from "../utils/getCodeIsModifier.ts"
import { getKeyboardEventCodes } from "../utils/getKeyboardEventCodes.ts"

export const useKeypress = (pinnedCodes: Set<KeyboardEvent["code"]>) => {
  const [eventCodes, setEventCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )

  useEffect(() => {
    const handleKeyPressEvent = (event: KeyboardEvent) => {
      event.preventDefault()

      setEventCodes(() => {
        return new Set(
          [...getKeyboardEventCodes(event)].filter((code) => {
            const isNonModifier = !getCodeIsModifier(code)
            const hasPinnedNonModifier = [...pinnedCodes].some(
              (pinnedCode) => !getCodeIsModifier(pinnedCode)
            )

            return !(isNonModifier && hasPinnedNonModifier)
          })
        )
      })
    }

    const handleKeyUpEvent = (event: KeyboardEvent) => {
      event.preventDefault()

      setEventCodes(new Set())
    }

    document.addEventListener("keydown", handleKeyPressEvent)
    document.addEventListener("keyup", handleKeyUpEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyPressEvent)
      document.removeEventListener("keyup", handleKeyUpEvent)
    }
  }, [pinnedCodes])

  return eventCodes
}
