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
const os = parser.getOS()

export const App = () => {
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [pinnedKeys, setPinnedKeys] = useState<Set<KeyboardEvent["key"]>>(
    new Set()
  )
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
    console.log({ os })
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

  const handleClick = (keys: KeyboardEvent["key"][]) => () => {
    const isModifierKey = (key: KeyboardEvent["key"]) =>
      ["Control", "Alt", "Shift", "Meta"].includes(key)

    const hasPinnedNonModifier = [...pinnedKeys].some((key) => {
      return !isModifierKey(key)
    })

    setPinnedKeys((previousPinnedKeys) => {
      const isAlreadyPinned = keys.every((key) => pinnedKeys.has(key))
      const isNonModifier = keys.some((key) => !isModifierKey(key))

      if (isAlreadyPinned) {
        return new Set<KeyboardEvent["key"]>(
          [...previousPinnedKeys].filter((key) => !keys.includes(key))
        )
      } else if (hasPinnedNonModifier && isNonModifier) {
        return new Set([
          ...[...previousPinnedKeys].filter((key) => isModifierKey(key)),
          ...keys,
        ])
      } else {
        return new Set([...previousPinnedKeys, ...keys])
      }
    })
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
        <div>
          <p>OSes to include:</p>
          <div className={"flex gap-2"}>
            {oses.map((os) => (
              <TokenToggle
                key={os}
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
                key={browser}
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
          <div>
            <MagicKeyboard
              keyboardEvent={keyboardEvent}
              unitLength={unitLength}
              collisions={collisions}
              onKeyClick={handleClick}
              pinnedKeys={pinnedKeys}
            />
          </div>
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
      <footer className={"text-gray-400 text-xs mt-16"}>
        <p>
          Made with
          <span role={"img"} aria-label={"love"}>
            {" "}
            ❤️{" "}
          </span>
          by Chris Buchert
        </p>
        <p className={"mb-4"}>
          <a href={"https://christianbuchert.com"} target={"_blank"}>
            christianbuchert.com
          </a>
        </p>
        <p className={"mb-4"}>
          Many thanks to Lightspeed DMS for sponsoring this project
        </p>
        <p>
          <a href={"https://github.com/cbuchert/keybud"} target={"_blank"}>
            MIT Licensed and available on Github
          </a>
        </p>
      </footer>
    </div>
  )
}
