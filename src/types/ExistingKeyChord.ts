import { Chord } from "./Chord.ts"

export type ExistingKeyChord = Chord & {
  keys: Set<string>
}
