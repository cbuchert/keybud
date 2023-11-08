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

  return false
}
