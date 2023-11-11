export const getIsTaken = (
  key: { code: KeyboardEvent["code"] } | undefined,
  activeChords: Set<KeyboardEvent["code"]>,
  hasChordCollisions: boolean
) => {
  if (!key) return false

  return hasChordCollisions && activeChords.has(key.code)
}
