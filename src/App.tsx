import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"
import { MagicKeyboard } from "./components/MagicKeyboard.tsx"

const parser = new UAParser()
const browser = parser.getBrowser()
const os = parser.getOS()

export const App = () => {
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()
      setKeyboardEvent(event)
      console.log(event.key)
    }

    document.addEventListener("keydown", handleKeyboardEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [])

  return (
    <>
      <MagicKeyboard keyboardEvent={keyboardEvent} />
    </>
  )
}
