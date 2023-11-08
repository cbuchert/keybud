import { Os } from "../data/oses.ts"
import { ChordDefinition } from "../types/ChordDefinition.ts"

export const getCollisions = (
  event: KeyboardEvent | null,
  usedKeyChords: ChordDefinition[],
  omittedOses: Os[]
) => {
  if (!event) {
    return []
  }

  return usedKeyChords.filter(({ os, chord }) => {
    const isOmittedOs = omittedOses.includes(os)

    return (
      event.key === chord.key &&
      event.altKey === Boolean(chord.altKey) &&
      event.ctrlKey === Boolean(chord.ctrlKey) &&
      event.metaKey === Boolean(chord.metaKey) &&
      event.shiftKey === Boolean(chord.shiftKey) &&
      !isOmittedOs
    )
  })
}
