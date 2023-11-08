export const getModifierKeys = (keyNames: string[]) => {
  const isAlt = keyNames.includes("Alt")
  const isShift = keyNames.includes("Shift")
  const isControl = keyNames.includes("Control")
  const isMeta = keyNames.includes("Meta")

  return { isAlt, isShift, isControl, isMeta }
}
