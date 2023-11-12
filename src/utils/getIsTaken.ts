export const getIsTaken = (
  key: { code: KeyboardEvent["code"] } | undefined,
  activeCodes: Set<KeyboardEvent["code"]>,
  hasChordCollisions: boolean
) => {
  if (!key) return false

  return hasChordCollisions && activeCodes.has(key.code)
}
