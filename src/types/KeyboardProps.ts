import { Chord } from "./Chord.ts"

export type KeyboardProps = {
  activeCodes: Set<KeyboardEvent["code"]>
  unitLength: number
  collisions: Chord[]
  onKeyClick: (code: KeyboardEvent["code"]) => () => void
  pinnedCodes: Set<KeyboardEvent["code"]>
}
