import { Language } from "../data/languages.ts"
import { Browser } from "./Browser.ts"
import { Os } from "./Os.ts"

export type Chord = {
  language: Language
  os: Os
  browser: Browser
  description: string
  keys: Set<KeyboardEvent["key"]>
}
