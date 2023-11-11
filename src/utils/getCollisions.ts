import { has, isEqual } from "lodash"
import { Chord } from "../types/Chord.ts"
import { KeyMap } from "../types/KeyMap.ts"

export const getCollisions = (
  activeCodes: Set<KeyboardEvent["code"]>,
  keyChords: Chord[],
  keyMaps: KeyMap
) => {
  return keyChords.filter((chord) => {
    const isShifted =
      activeCodes.has("ShiftLeft") || activeCodes.has("ShiftRight")

    const activeCodeKeys = new Set(
      [...activeCodes]
        .filter((code) => has(keyMaps, code))
        .map((code) => {
          const keyMap = keyMaps[code]
          const shiftIndex = isShifted && keyMap.keys.length === 2 ? 1 : 0

          return keyMap.keys[shiftIndex]
        })
    )

    return isEqual(chord.keys, activeCodeKeys)
  })
}
