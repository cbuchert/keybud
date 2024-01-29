import { isEqual } from "lodash"
import { useMemo, useState } from "react"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { existingKeyChords } from "../../data/existingKeyChords"
import { useKeypress } from "../../hooks/useKeypress.ts"
import { Browser } from "../../types/Browser.ts"
import { Chord } from "../../types/Chord.ts"
import { Os } from "../../types/Os.ts"
import { getActiveKeys } from "../../utils/getActiveKeys.ts"

export const useAppViewModel = () => {
  const [customChords, setCustomChords] = useState<Chord[]>([])
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [pinnedCodes, setPinnedCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )
  const { eventCodes } = useKeypress(pinnedCodes)
  const activeKeys = useMemo(
    () =>
      getActiveKeys(
        new Set([...eventCodes, ...pinnedCodes]),
        appleQuertyKeymappings
      ),
    [eventCodes, pinnedCodes]
  )
  const collisions = useMemo(
    () =>
      existingKeyChords.filter(
        (chord) =>
          !omittedOses.includes(chord.os) &&
          !omittedBrowsers.includes(chord.browser) &&
          isEqual(activeKeys, chord.keys)
      ),
    [omittedOses, omittedBrowsers, activeKeys]
  )

  const addCustomChord = (chord: Chord) => {
    setCustomChords((prev) => [...prev, chord])
  }

  return {
    pinnedCodes,
    setPinnedCodes,
    activeKeys,
    collisions,
    eventCodes,
    omittedBrowsers,
    setOmittedBrowsers,
    omittedOses,
    setOmittedOses,
    customChords,
    addCustomChord,
  }
}
