import { ChordDefinition } from "./ChordDefinition.ts"

export type KeyboardProps = {
  activeCodes: Set<KeyboardEvent["code"]>
  unitLength: number
  collisions: ChordDefinition[]
  onKeyClick: (code: KeyboardEvent["code"]) => () => void
  pinnedCodes: Set<KeyboardEvent["code"]>
}
