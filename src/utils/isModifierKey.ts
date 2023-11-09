export const isModifierKey = (code: KeyboardEvent["code"]) => {
  return [
    "ControlLeft",
    "AltLeft",
    "ShiftLeft",
    "MetaLeft",
    "ControlRight",
    "AltRight",
    "ShiftRight",
    "MetaRight",
  ].includes(code)
}
