import { isEqual } from "lodash"
import { useCallback, useMemo, useState } from "react"
import { Attribution } from "./components/atoms/Attribution.tsx"
import { TokenToggle } from "./components/atoms/TokenToggle.tsx"
import { Collisions } from "./components/organisms/Collisions.tsx"
import { MagicKeyboard } from "./components/organisms/MagicKeyboard.tsx"
import { appleQuertyKeymappings } from "./data/appleQuertyKeymappings.ts"
import { browsers } from "./data/browsers.ts"
import { existingKeyChords } from "./data/existingKeyChords"
import { oses } from "./data/oses.ts"
import { useKeypress } from "./hooks/useKeypress.ts"
import { Browser } from "./types/Browser.ts"
import { Os } from "./types/Os.ts"
import { getActiveKeys } from "./utils/getActiveKeys.ts"
import { getCodeIsModifier } from "./utils/getCodeIsModifier.ts"
import { getPossibleNextCollisions } from "./utils/getPossibleNextCollisions.ts"

export const App = () => {
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [pinnedCodes, setPinnedCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )
  const eventCodes = useKeypress(pinnedCodes)
  const activeKeys = useMemo(
    () =>
      getActiveKeys(
        new Set([...eventCodes, ...pinnedCodes]),
        appleQuertyKeymappings
      ),
    [eventCodes, pinnedCodes, appleQuertyKeymappings]
  )
  const collisions = useMemo(
    () =>
      existingKeyChords.filter(
        (chord) =>
          !omittedOses.includes(chord.os) &&
          !omittedBrowsers.includes(chord.browser) &&
          isEqual(activeKeys, chord.keys)
      ),
    [existingKeyChords, omittedOses, omittedBrowsers, activeKeys]
  )
  const possibleNextCollisions = useMemo(
    () => getPossibleNextCollisions(omittedOses, omittedBrowsers, activeKeys),
    [omittedOses, omittedBrowsers, activeKeys]
  )
  const unitLength = 0.25

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

  return (
    <div className={"flex gap-12 lg:gap-0 flex-col lg:flex-row"}>
      <div className={"mx-8 mt-12 mb-8"}>
        <header className={"mb-8"}>
          <h1 className={"text-6xl mb-2 font-extrabold text-slate-700"}>
            Keybud
          </h1>
          <h2 className={"text-2xl text-gray-400 mb-24 font-light italic"}>
            Let's not ignorantly clobber your user's keyboard shortcuts,
            together.
          </h2>
        </header>
        <main>
          <div className={"mb-12"}>
            <div className={"mb-4"}>
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
          <div>
            <MagicKeyboard
              unitLength={unitLength}
              collisions={collisions}
              possibleNextCollisions={possibleNextCollisions}
              onKeyClick={handleClick}
              eventCodes={eventCodes}
              pinnedCodes={pinnedCodes}
            />
            <Attribution />
          </div>
        </main>
      </div>
      <Collisions
        activeCodes={[...eventCodes, ...pinnedCodes]}
        activeKeys={activeKeys}
        collisions={collisions}
      />
    </div>
  )
}
