import { Chord } from "../../types/Chord.ts"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import _chromeKeyChords from "./chrome.json"
import _edgeKeyChords from "./edge.json"

const chromeKeyChords = _chromeKeyChords as unknown as Chord[]
const edgeKeyChords = _edgeKeyChords as unknown as Chord[]
export const existingKeyChords: ExistingKeyChord[] = [
  ...[...chromeKeyChords, ...edgeKeyChords].map((chord) => ({
    ...chord,
    keys: new Set(chord.keys),
  })),
]
