import { Language } from "../data/languages.ts"
import { Browser } from "./Browser.ts"
import { Chord } from "./Chord.ts"
import { Os } from "./Os.ts"

export type ChordDefinition = {
  language: Language
  os: Os
  browser: Browser
  description: string
  chord: Chord
}
