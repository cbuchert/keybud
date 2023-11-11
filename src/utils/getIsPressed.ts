import { KeyDefinition } from "../types/KeyDefinition.ts"

export const getIsPressed = (
  key: KeyDefinition | undefined,
  eventCodes: Set<KeyboardEvent["code"]>,
  pinnedCodes: Set<KeyboardEvent["code"]>
) => {
  if (!key) return false

  return new Set([...eventCodes, ...pinnedCodes]).has(key.code)
}
