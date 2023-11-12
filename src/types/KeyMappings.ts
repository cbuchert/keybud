import { KeyDefinition } from "./KeyDefinition.ts"

export type KeyMappings = {
  [code: KeyboardEvent["code"]]: KeyDefinition
}
