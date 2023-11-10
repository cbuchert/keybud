export type KeyDefinition = {
  code: KeyboardEvent["code"]
  keys: [KeyboardEvent["key"]] | [KeyboardEvent["key"], KeyboardEvent["key"]]
  isModifier?: boolean
  labels: [string] | [string, string]
}
