export type KeyDefinition = {
  code: KeyboardEvent["code"]
  isModifier?: boolean
  labels: [string] | [string, string]
}
