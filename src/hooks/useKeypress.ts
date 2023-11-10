import { isEqual, pick } from "lodash"
import { useEffect, useState } from "react"

export const useKeypress = () => {
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()
      console.log(event)

      // Clear the keyboard if the event is repeated.
      setKeyboardEvent((previousEvent) => {
        return isEqual(
          pick(previousEvent, [
            "key",
            "ctrlKey",
            "altKey",
            "shiftKey",
            "metaKey",
          ]),
          pick(event, ["key", "ctrlKey", "altKey", "shiftKey", "metaKey"])
        )
          ? null
          : event
      })
    }

    document.addEventListener("keydown", handleKeyboardEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [])

  return keyboardEvent
}
