import { Browser } from "../types/Browser.ts"
import { ChordDefinition } from "../types/ChordDefinition.ts"
import { Os } from "../types/Os.ts"

export const getCollisions = (
  event: KeyboardEvent | null,
  usedKeyChords: ChordDefinition[],
  omittedOses: Os[],
  omittedBrowsers: Browser[]
) => {
  if (!event) {
    return []
  }

  return usedKeyChords.filter(({ os, browser, chord }) => {
    const isOmittedOs = omittedOses.includes(os)
    const isOmittedBrowser = omittedBrowsers.includes(browser)

    return (
      event.key === chord.key &&
      event.altKey === Boolean(chord.altKey) &&
      event.ctrlKey === Boolean(chord.ctrlKey) &&
      event.metaKey === Boolean(chord.metaKey) &&
      event.shiftKey === Boolean(chord.shiftKey) &&
      !isOmittedOs &&
      !isOmittedBrowser
    )
  })
}
