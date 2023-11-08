import { isEqual, pick } from "lodash"
import { useEffect, useState } from "react"
import UAParser from "ua-parser-js"
import { TokenToggle } from "./components/atoms/TokenToggle.tsx"
import { MagicKeyboard } from "./components/MagicKeyboard.tsx"
import { Collision } from "./components/molecules/Collision.tsx"
import { KeyboardEventChord } from "./components/molecules/KeyboardEventChord.tsx"
import { browsers } from "./data/browsers.ts"
import chromeKeyChords from "./data/chrome.json"
import { oses } from "./data/oses.ts"
import { Browser } from "./types/Browser.ts"
import { ChordDefinition } from "./types/ChordDefinition.ts"
import { Os } from "./types/Os.ts"
import { getCollisions } from "./utils/getCollisions.ts"

const parser = new UAParser()
const browser = parser.getBrowser()
const os = parser.getOS()

export const App = () => {
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [keyboardEvent, setKeyboardEvent] = useState<KeyboardEvent | null>(null)
  const collisions = getCollisions(
    keyboardEvent,
    chromeKeyChords as ChordDefinition[],
    omittedOses,
    omittedBrowsers
  )
  const unitLength = 0.25

  const osCollisionCount = collisions.reduce((acc, curr) => {
    return acc.add(curr.os)
  }, new Set<string>()).size

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
        <div>
          <p>OSes to include:</p>
          <div className={"flex gap-2"}>
            {oses.map((os) => (
              <TokenToggle
                isChecked={!omittedOses.includes(os)}
                onChange={() => {
                  setOmittedOses((previousOmittedOses) => {
                    return previousOmittedOses.includes(os)
                      ? previousOmittedOses.filter(
                          (omittedOs) => os !== omittedOs
                        )
                      : [...previousOmittedOses, os]
                  })
                }}
              >
                {os}
              </TokenToggle>
            ))}
          </div>
        </div>
        <div>
          <p>Browsers to include:</p>
          <div className={"flex gap-2"}>
            {browsers.map((browser) => (
              <TokenToggle
                isChecked={!omittedBrowsers.includes(browser)}
                onChange={() => {
                  setOmittedBrowsers((previousOmittedBrowsers) => {
                    return previousOmittedBrowsers.includes(browser)
                      ? previousOmittedBrowsers.filter(
                          (omittedBrowser) => browser !== omittedBrowser
                        )
                      : [...previousOmittedBrowsers, browser]
                  })
                }}
              >
                {browser}
              </TokenToggle>
            ))}
          </div>
        </div>
      </nav>
      <main>
        <div className={"flex gap-12"}>
          <MagicKeyboard
            keyboardEvent={keyboardEvent}
            unitLength={unitLength}
            collisions={collisions}
          />
          <div className={"flex-grow"}>
            <KeyboardEventChord event={keyboardEvent} />
            {keyboardEvent && (
              <p className={"text-xl text-slate-400 mb-8"}>
                {collisions.length} collision{collisions.length !== 1 && "s"}
                {osCollisionCount > 1 &&
                  ` on ${osCollisionCount} OS${osCollisionCount !== 1 && "s"}`}
              </p>
            )}
            <ul className={"flex flex-col gap-12"}>
              {collisions.map((chordDefinition, i) => (
                <Collision
                  key={`${chordDefinition.language}-${chordDefinition.os}-${chordDefinition.browser}-${chordDefinition.chord.key}-${i}`}
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
