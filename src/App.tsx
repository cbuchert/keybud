import { isEqual, pick } from "lodash"
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
  const osCollisionCount = collisions.reduce((acc, curr) => {
    return acc + curr.os.length
  }, 0)

  useEffect(() => {
    console.log({ browser, os })
  }, [])

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()
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

      setCollisions(getCollisions(event, chromeKeyChords as ChordDefinition[]))
    }

    document.addEventListener("keydown", handleKeyboardEvent)

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [])

  const generateKeyCombo = (event: KeyboardEvent | null) => {
    if (!event)
      return (
        <p className={"text-gray-400"}>Press some keys to see what happpens.</p>
      )
    const modifiers = [
      { key: "ctrlKey", label: "Ctrl" },
      { key: "altKey", label: "Alt" },
      { key: "shiftKey", label: "Shift" },
      { key: "metaKey", label: "Meta" },
    ] as { key: keyof KeyboardEvent; label: string }[]

    const activeModifiers = modifiers
      .filter((modifierKey) => event[modifierKey.key])
      .map((modifierKey) => modifierKey.label)
    const keyCombo =
      (activeModifiers.length ? activeModifiers.join(" + ") + " + " : "") +
      `${event.key === " " ? "Space" : event.key}`

    return <h2 className={"text-3xl font-bold mb-4"}>{keyCombo}</h2>
  }

  return (
    <div className={"mx-8 mt-12"}>
      <nav className={"mb-8"}>
        <h1 className={"text-6xl mb-2 font-extrabold text-slate-700"}>
          Keybud
        </h1>
        <h2 className={"text-2xl text-gray-400 mb-24 font-light italic"}>
          Let's not ignorantly clobber your user's keyboard shortcuts, together.
        </h2>
      </nav>
      <main>
        <div className={"flex gap-12"}>
          <MagicKeyboard
            keyboardEvent={keyboardEvent}
            unitLength={unitLength}
            collisions={collisions}
          />
          <div className={"flex-grow"}>
            {generateKeyCombo(keyboardEvent)}
            {keyboardEvent && (
              <p className={"text-xl text-slate-400 mb-8"}>
                {collisions.length} collision{collisions.length !== 1 && "s"}
                {osCollisionCount > 1 &&
                  ` on ${osCollisionCount} OS${osCollisionCount !== 1 && "s"}`}
              </p>
            )}
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
