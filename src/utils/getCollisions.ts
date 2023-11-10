import { Chord } from "../types/Chord.ts"
import { KeyMap } from "../types/KeyMap.ts"

export const getCollisions = (
  activeCodes: Set<KeyboardEvent["code"]>,
  keyChords: Chord[],
  keyMap: KeyMap
) => {
  const isShifted =
    activeCodes.has("ShiftLeft") || activeCodes.has("ShiftRight")
  // Do we need to handle CapsLock?

  return keyChords.filter(({ keys }) => {
    return (
      [...activeCodes].every((code) => {
        // If the key code doesn't not exist on the key map, ignore it.
        if (!keyMap[code]) return true

        const key =
          keyMap[code].keys[
            keyMap[code].keys.length === 1 ? 0 : isShifted ? 1 : 0
          ]

        return key && keys.has(key)
      }) && keys.size === activeCodes.size
    )
  })
}
