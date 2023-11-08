import { ChordDefinition } from "../types/ChordDefinition.ts"

export const getCollisions = (
  event: KeyboardEvent,
  usedKeyChords: ChordDefinition[]
) => {
  return usedKeyChords.filter(({ chord }) => {
    return (
      event.key === chord.key &&
      event.altKey === Boolean(chord.altKey) &&
      event.ctrlKey === Boolean(chord.ctrlKey) &&
      event.metaKey === Boolean(chord.metaKey) &&
      event.shiftKey === Boolean(chord.shiftKey)
    )
  })
}
