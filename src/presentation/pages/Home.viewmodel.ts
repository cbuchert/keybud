import { useMemo, useState } from "react"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { useKeyChordCollisions } from "../../hooks/useKeyChordCollisions.ts"
import { useKeyChords } from "../../hooks/useKeyChords.ts"
import { useKeypress } from "../../hooks/useKeypress.ts"
import { Browser } from "../../types/Browser.ts"
import { Os } from "../../types/Os.ts"
import { getActiveKeys } from "../../utils/getActiveKeys.ts"

export const useHomeViewModel = () => {
  const [omittedOses, setOmittedOses] = useState<Os[]>([])
  const [omittedBrowsers, setOmittedBrowsers] = useState<Browser[]>([])
  const [pinnedCodes, setPinnedCodes] = useState<Set<KeyboardEvent["code"]>>(
    new Set()
  )
  const { availableKeyChords } = useKeyChords(omittedOses, omittedBrowsers)
  const { eventCodes } = useKeypress(pinnedCodes)
  const activeKeys = useMemo(
    () =>
      getActiveKeys(
        new Set([...eventCodes, ...pinnedCodes]),
        appleQuertyKeymappings
      ),
    [eventCodes, pinnedCodes]
  )
  const { possibleNextCollisions, collisions } = useKeyChordCollisions(
    availableKeyChords,
    activeKeys,
    omittedOses,
    omittedBrowsers
  )

  return {
    pinnedCodes,
    setPinnedCodes,
    activeKeys,
    collisions,
    possibleNextCollisions,
    eventCodes,
    omittedBrowsers,
    setOmittedBrowsers,
    omittedOses,
    setOmittedOses,
  }
}
