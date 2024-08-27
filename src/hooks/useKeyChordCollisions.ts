import { isEqual } from "lodash"
import { useMemo } from "react"
import { Browser } from "../types/Browser.ts"
import { Chord } from "../types/Chord.ts"
import { Os } from "../types/Os.ts"
import { getPossibleNextCollisions } from "../utils/getPossibleNextCollisions.ts"

export const useKeyChordCollisions = (
  availableKeyChords: Chord[],
  activeKeys: Set<string>,
  omittedOses: Os[],
  omittedBrowsers: Browser[]
) => {
  const possibleNextCollisions = useMemo(
    () => getPossibleNextCollisions(availableKeyChords, activeKeys),
    [availableKeyChords, activeKeys]
  )
  const collisions = useMemo(
    () =>
      availableKeyChords.filter(
        (chord) =>
          !omittedOses.includes(chord.os) &&
          !omittedBrowsers.includes(chord.browser) &&
          isEqual(activeKeys, chord.keys)
      ),
    [availableKeyChords, omittedOses, omittedBrowsers, activeKeys]
  )

  return { possibleNextCollisions, collisions }
}
