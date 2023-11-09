export const getIsTaken = (
  key: { code: KeyboardEvent["code"] } | undefined,
  aciveCodes: Set<KeyboardEvent["code"]>,
  hasChordCollisions: boolean
) => {
  if (!key) return false

  return hasChordCollisions && aciveCodes.has(key.code)
}
