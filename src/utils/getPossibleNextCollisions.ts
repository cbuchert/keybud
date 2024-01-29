import { ExistingKeyChord } from "../types/ExistingKeyChord.ts"

export const getPossibleNextCollisions = (
  availableKeyChords: ExistingKeyChord[],
  activeKeys: Set<KeyboardEvent["key"]>
) => {
  return availableKeyChords.filter((chord) => {
    const hasOneMoreKey = chord.keys.size === activeKeys.size + 1

    if (!hasOneMoreKey) {
      return false
    }

    return [...activeKeys].every((activeKey) => chord.keys.has(activeKey))
  })
}
