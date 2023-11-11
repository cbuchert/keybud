import { Chord } from "./Chord.ts"

export type KeyboardProps = {
  unitLength: number
  collisions: Chord[]
  onKeyClick: (code: KeyboardEvent["code"]) => () => void
  eventCodes: Set<KeyboardEvent["code"]>
  pinnedCodes: Set<KeyboardEvent["code"]>
}
