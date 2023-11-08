import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"
import { MagicKeyboard } from "./components/MagicKeyboard.tsx"
import { Collision } from "./components/molecules/Collision.tsx"
import chromeKeyChords from "./data/chrome.json"
import { ChordDefinition } from "./types/ChordDefinition.ts"
import { getCollisions } from "./utils/getCollisions.ts"

const parser = new UAParser()
const browser = parser.getBrowser()
const os = parser.getOS()

export const App = () => {
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)
  const [collisions, setCollisions] = useState<ChordDefinition[]>([])
  const unitLength = 0.25

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()
      setKeyboardEvent(event)
      setCollisions(getCollisions(event, chromeKeyChords as ChordDefinition[]))
    }

    document.addEventListener("keydown", handleKeyboardEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [])

  return (
    <div className={"mx-8 mt-12"}>
      <nav className={"mb-8"}>
        <h1 className={"text-6xl mb-2 font-extrabold text-slate-700"}>
          Keybud
        </h1>
        <h2 className={"text-2xl text-gray-400 mb-24 font-light italic"}>
          Let's not ignorantly clobber your user's keyboard shortcuts, together.
        </h2>
        <p className={"text-gray-400"}>
          {!keyboardEvent && "Press some keys to see what happens."}&nbsp;
        </p>
      </nav>
      <main>
        <div className={"flex gap-12"}>
          <MagicKeyboard
            keyboardEvent={keyboardEvent}
            unitLength={unitLength}
            collisions={collisions}
          />
          <div className={"flex-grow"}>
            <p className={"text-xl text-slate-600 mb-8"}>
              {collisions.length} Collisions
            </p>
            <ul className={"flex flex-col gap-12"}>
              {collisions.map((chordDefinition) => (
                <Collision
                  key={`${chordDefinition.language}-${chordDefinition.os.join(
                    ", "
                  )}-${chordDefinition.browser}-${chordDefinition.chord.key}`}
                  chordDefinition={chordDefinition}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
