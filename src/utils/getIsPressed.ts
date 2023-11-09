import { KeyDefinition } from "../types/KeyDefinition.ts"

export const getIsPressed = (
  key: KeyDefinition | undefined,
  activeCodes: Set<KeyboardEvent["code"]>
) => {
  if (!key) return false

  return activeCodes.has(key.code)
}
