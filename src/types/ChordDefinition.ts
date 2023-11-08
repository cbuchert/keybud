import { Browser } from "../data/browsers.ts"
import { Language } from "../data/languages.ts"
import { Os } from "../data/oses.ts"
import { Chord } from "./Chord.ts"

export type ChordDefinition = {
  language: Language
  os: Os
  browser: Browser
  description: string
  chord: Chord
}
