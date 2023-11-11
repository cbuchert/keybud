export const getIsTaken = (
  key: { code: KeyboardEvent["code"] } | undefined,
  eventCodes: Set<KeyboardEvent["code"]>,
  pinnedCodes: Set<KeyboardEvent["code"]>,
  hasChordCollisions: boolean
) => {
  if (!key) return false

  return (
    hasChordCollisions && new Set([...eventCodes, pinnedCodes]).has(key.code)
  )
}
