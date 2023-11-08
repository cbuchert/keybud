import { ChordDefinition } from "./ChordDefinition.ts"

export type KeyboardProps = {
  keyboardEvent: KeyboardEvent | null
  unitLength: number
  collisions: ChordDefinition[]
  onKeyClick: (key: KeyboardEvent["key"][]) => () => void
  pinnedKeys: Set<KeyboardEvent["key"]>
}
