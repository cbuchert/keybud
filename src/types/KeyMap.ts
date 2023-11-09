import { KeyDefinition } from "./KeyDefinition.ts"

export type KeyMap = {
  [code: KeyboardEvent["code"]]: KeyDefinition
}
