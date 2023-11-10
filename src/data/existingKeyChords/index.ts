import { Chord } from "../../types/Chord.ts"
import _chromeKeyChords from "./chrome.json"

const chromeKeyChords = _chromeKeyChords as unknown as Chord[]
export const existingKeyChords = [
  ...chromeKeyChords.map((chord) => ({
    ...chord,
    keys: new Set(chord.keys),
  })),
]
