import { has } from "lodash"
import { KeyMappings } from "../types/KeyMappings.ts"

export const getActiveKeys = (
  activeCodes: Set<KeyboardEvent["code"]>,
  keyMappings: KeyMappings
) => {
  const isShifted =
    activeCodes.has("ShiftLeft") || activeCodes.has("ShiftRight")

  return new Set(
    [...activeCodes]
      .filter((code) => has(keyMappings, code))
      .map((code) => {
        const keyMap = keyMappings[code]
        const shiftIndex = isShifted && keyMap.keys.length === 2 ? 1 : 0
        const character: string = keyMap.keys[
          shiftIndex
        ] as KeyboardEvent["key"]

        return character === " " ? "Space" : character
      })
  )
}
