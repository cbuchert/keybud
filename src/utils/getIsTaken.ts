import { ChordDefinition } from "../types/ChordDefinition.ts"
import { KeyDefinition } from "../types/KeyDefinition.ts"
import { getModifierKeys } from "./getModifierKeys.ts"

export const getIsTaken = (
  key: KeyDefinition,
  keyboardEvent: KeyboardEvent | null,
  chordCollisions: ChordDefinition[]
) => {
  if (!keyboardEvent) {
    return false
  }

  const { isAlt, isShift, isControl, isMeta } = getModifierKeys(key.keyNames)

  return chordCollisions.some(({ chord }) => {
    const isKey = key.keyNames.includes(chord.key)
    const isAltKey = Boolean(chord.altKey) === isAlt
    const isShiftKey = Boolean(chord.shiftKey) === isShift
    const isControlKey = Boolean(chord.ctrlKey) === isControl
    const isMetaKey = Boolean(chord.metaKey) === isMeta

    return isKey || isAltKey || isShiftKey || isControlKey || isMetaKey
  })
}
