export const getKeyboardEventCodes = (event: KeyboardEvent | null) => {
  const keyboardEventCodes = []

  if (event) {
    if (event.ctrlKey) {
      keyboardEventCodes.push("ControlLeft", "ControlRight")
    }
    if (event.altKey) {
      keyboardEventCodes.push("AltLeft", "AltRight")
    }
    if (event.shiftKey) {
      keyboardEventCodes.push("ShiftLeft", "ShiftRight")
    }
    if (event.metaKey) {
      keyboardEventCodes.push("MetaLeft", "MetaRight")
    }
    keyboardEventCodes.push(event.code)
  }

  return new Set<KeyboardEvent["code"]>([...keyboardEventCodes])
}
