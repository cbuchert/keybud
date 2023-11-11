export const getCodeIsModifier = (code: KeyboardEvent["code"]) => {
  return new Set([
    "ControlLeft",
    "AltLeft",
    "ShiftLeft",
    "MetaLeft",
    "ControlRight",
    "AltRight",
    "ShiftRight",
    "MetaRight",
  ]).has(code)
}
