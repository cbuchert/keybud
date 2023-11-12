import { Chord } from "../types/Chord.ts"
import { KeyMappings } from "../types/KeyMappings.ts"

export const getChordCodes = (chord: Chord, keyMappings: KeyMappings) => {
  const chordKeyMappings = [...chord.keys].flatMap((key) => {
    return Object.values(keyMappings).filter((keyMap) => {
      return keyMap.keys.includes(key)
    })
  })

  return new Set(chordKeyMappings.map((keyMap) => keyMap.code))
}
