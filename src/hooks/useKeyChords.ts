import { useMemo, useState } from "react"
import { existingKeyChords } from "../data/existingKeyChords"
import { Browser } from "../types/Browser.ts"
import { Chord } from "../types/Chord.ts"
import { Os } from "../types/Os.ts"

export const useKeyChords = (omittedOses: Os[], omittedBrowsers: Browser[]) => {
  const [customChords, setCustomChords] = useState<Chord[]>([])
  const availableKeyChords = useMemo(
    () =>
      [...existingKeyChords, ...customChords].filter((chord) => {
        return (
          !omittedOses.includes(chord.os) &&
          !omittedBrowsers.includes(chord.browser)
        )
      }),
    [customChords, omittedBrowsers, omittedOses]
  )
  const addCustomChord = (chord: Chord) => {
    setCustomChords((prev) => [...prev, chord])
  }

  return {
    addCustomChord,
    customChords,
    availableKeyChords,
  }
}
