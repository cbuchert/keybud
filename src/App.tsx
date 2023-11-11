import { useState } from "react"
import { TokenToggle } from "./components/atoms/TokenToggle.tsx"
import { Collision } from "./components/molecules/Collision.tsx"
import { CurrentChord } from "./components/molecules/CurrentChord.tsx"
import { MagicKeyboard } from "./components/organisms/MagicKeyboard.tsx"
import { appleQuertyKeymap } from "./data/appleQuertyKeymap.ts"
import { browsers } from "./data/browsers.ts"
import { existingKeyChords } from "./data/existingKeyChords"
import { oses } from "./data/oses.ts"
import { useKeypress } from "./hooks/useKeypress.ts"
import { Browser } from "./types/Browser.ts"
import { Os } from "./types/Os.ts"
import { getActiveCodes } from "./utils/getActiveCodes.ts"
import { getIsCollision } from "./utils/getIsCollision.ts"
import { isModifierKey } from "./utils/isModifierKey.ts"

export const App = () => {
  const keyboardEvent = useKeypress()
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [pinnedCodes, setPinnedCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )
  const activeCodes = getActiveCodes(keyboardEvent, pinnedCodes)
  const collisions = existingKeyChords.filter(
    (chord) =>
      !omittedOses.includes(chord.os) &&
      !omittedBrowsers.includes(chord.browser) &&
      getIsCollision(activeCodes, chord, appleQuertyKeymap)
  )
  const unitLength = 0.25
  const osCollisionCount = collisions.reduce((acc, curr) => {
    return acc.add(curr.os)
  }, new Set<string>()).size

  const handleClick = (code: KeyboardEvent["code"]) => () => {
    const hasPinnedNonModifier = [...pinnedCodes].some((code) => {
      return !isModifierKey(code)
    })

    setPinnedCodes((previousPinnedCodes) => {
      const isAlreadyPinned = pinnedCodes.has(code)
      const isNonModifier = !isModifierKey(code)

      if (isAlreadyPinned) {
        return new Set(
          [...previousPinnedCodes].filter((pinnedCode) => pinnedCode !== code)
        )
      } else if (hasPinnedNonModifier && isNonModifier) {
        return new Set([
          ...[...previousPinnedCodes].filter((code) => isModifierKey(code)),
          code,
        ])
      } else {
        return new Set([...previousPinnedCodes, code])
      }
    })
  }

  return (
    <div className={"mx-8 mt-12"}>
      <header className={"mb-8"}>
        <h1 className={"text-6xl mb-2 font-extrabold text-slate-700"}>
          Keybud
        </h1>
        <h2 className={"text-2xl text-gray-400 mb-24 font-light italic"}>
          Let's not ignorantly clobber your user's keyboard shortcuts, together.
        </h2>
      </header>
      <main>
        <div className={"mb-8"}>
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
        </div>
        <div className={"flex gap-12"}>
          <div>
            <MagicKeyboard
              activeCodes={activeCodes}
              unitLength={unitLength}
              collisions={collisions}
              onKeyClick={handleClick}
              pinnedCodes={pinnedCodes}
            />
          </div>
          <div className={"flex-grow"}>
            <CurrentChord
              activeKeyDefinitions={[...activeCodes].map(
                (code) => appleQuertyKeymap[code]
              )}
            />
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
                  key={`${chordDefinition.language}_${chordDefinition.os}_${
                    chordDefinition.browser
                  }_${[...chordDefinition.keys].join("-")}-${i}`}
                  chordDefinition={chordDefinition}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className={"text-gray-400 text-xs mt-24"}>
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
