import { Chord } from "./Chord.ts"

export type ChordDefinition = {
  language: "en"
  os: ("Windows" | "Mac OS" | "Linux")[]
  browser: "Chrome" | "Firefox" | "Safari" | "Edge"
  description: string
  chord: Chord
}
