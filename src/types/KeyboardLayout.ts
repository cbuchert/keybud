type Code = KeyboardEvent["code"]
type Key = {
  code: Code
  mmWidth?: number
  mmHeight?: number
}
export type KeyboardLayout = (Key | Key[])[][]
