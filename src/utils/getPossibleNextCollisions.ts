import { existingKeyChords } from "../data/existingKeyChords"
import { Browser } from "../types/Browser.ts"
import { Os } from "../types/Os.ts"

export const getPossibleNextCollisions = (
  omittedOses: Os[],
  omittedBrowsers: Browser[],
  activeKeys: Set<KeyboardEvent["key"]>
) => {
  return existingKeyChords.filter((chord) => {
    if (
      omittedOses.includes(chord.os) ||
      omittedBrowsers.includes(chord.browser)
    ) {
      return false
    }

    const hasOneMoreKey = chord.keys.size === activeKeys.size + 1

    if (!hasOneMoreKey) {
      return false
    }

    return [...activeKeys].every((activeKey) => chord.keys.has(activeKey))
  })
}
