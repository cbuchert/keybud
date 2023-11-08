import { KeyDefinition } from "../types/KeyDefinition.ts"
import { getModifierKeys } from "./getModifierKeys.ts"

export const getIsPressed = (
  { keyNames }: KeyDefinition,
  keyboardEvent: KeyboardEvent | null
) => {
  if (!keyboardEvent) {
    return false
  }

  const { isAlt, isShift, isControl, isMeta } = getModifierKeys(keyNames)

  return (
    keyNames.includes(keyboardEvent.key) ||
    keyNames.includes(keyboardEvent.key.toLocaleLowerCase()) ||
    (isAlt && keyboardEvent.altKey) ||
    (isShift && keyboardEvent.shiftKey) ||
    (isControl && keyboardEvent.ctrlKey) ||
    (isMeta && keyboardEvent.metaKey)
  )
}
