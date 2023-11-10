export const getActiveCodes = (
  keyboardEvent: KeyboardEvent | null,
  pinnedKeys: Set<KeyboardEvent["code"]>
) => {
  const keyboardEventCodes = []

  if (keyboardEvent) {
    if (keyboardEvent.ctrlKey) {
      keyboardEventCodes.push("ControlLeft", "ControlRight")
    }
    if (keyboardEvent.altKey) {
      keyboardEventCodes.push("AltLeft", "AltRight")
    }
    if (keyboardEvent.shiftKey) {
      keyboardEventCodes.push("ShiftLeft", "ShiftRight")
    }
    if (keyboardEvent.metaKey) {
      keyboardEventCodes.push("MetaLeft", "MetaRight")
    }
    keyboardEventCodes.push(keyboardEvent.code)
  }

  return new Set<KeyboardEvent["code"]>([...keyboardEventCodes, ...pinnedKeys])
}
