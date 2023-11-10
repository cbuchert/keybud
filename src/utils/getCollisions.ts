import { Browser } from "../types/Browser.ts"
import { Chord } from "../types/Chord.ts"
import { KeyMap } from "../types/KeyMap.ts"
import { Os } from "../types/Os.ts"

export const getCollisions = (
  activeCodes: Set<KeyboardEvent["code"]>,
  keyChords: Chord[],
  keyMap: KeyMap,
  omittedOses: Os[],
  omittedBrowsers: Browser[]
) => {
  const isShifted =
    activeCodes.has("ShiftLeft") || activeCodes.has("ShiftRight")
  // Do we need to handle CapsLock?

  return keyChords.filter(({ os, browser, keys }) => {
    const isOmittedOs = omittedOses.includes(os)
    const isOmittedBrowser = omittedBrowsers.includes(browser)

    if (isOmittedOs || isOmittedBrowser) {
      return false
    }

    return (
      [...activeCodes].every((code) => {
        const key =
          keyMap[code].keys[
            keyMap[code].keys.length === 1 ? 0 : isShifted ? 1 : 0
          ]

        return key && keys.has(key)
      }) && keys.size === activeCodes.size
    )
  })
}
