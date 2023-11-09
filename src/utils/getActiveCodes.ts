export const getActiveCodes = (
  keyboardEvent: KeyboardEvent | null,
  pinnedKeys: Set<KeyboardEvent["code"]>
) => {
  const keyboardEventCodes = []

  if (keyboardEvent) {
    if (keyboardEvent.ctrlKey) {
      keyboardEventCodes.push("ControlLeft")
    }
    if (keyboardEvent.altKey) {
      keyboardEventCodes.push("AltLeft")
    }
    if (keyboardEvent.shiftKey) {
      keyboardEventCodes.push("ShiftLeft")
    }
    if (keyboardEvent.metaKey) {
      keyboardEventCodes.push("MetaLeft")
    }
    keyboardEventCodes.push(keyboardEvent.code)
  }

  return new Set<KeyboardEvent["code"]>([...keyboardEventCodes, ...pinnedKeys])
}
