import { describe, expect, it } from "vitest"
import { KeyMappings } from "../types/KeyMappings.ts"
import { getActiveKeys } from "./getActiveKeys.ts"

const keyMap: KeyMappings = {
  KeyA: {
    code: "KeyA",
    keys: ["a", "A"],
    labels: ["A"],
  },
  F1: {
    code: "F1",
    keys: ["F1"],
    labels: ["F1"],
  },
  ShiftLeft: {
    code: "ShiftLeft",
    keys: ["Shift"],
    labels: ["Shift"],
    isModifier: true,
  },
}

describe("getActiveKeys", () => {
  it("should return empty if there are no codes.", () => {
    expect(getActiveKeys(new Set(), keyMap)).toEqual(new Set())
  })

  it("returns empty if the code is not in the key map.", () => {
    expect(getActiveKeys(new Set(["F2"]), keyMap)).toEqual(new Set())
  })

  it("returns a key if the active code matches a key in the key map.", () => {
    expect(getActiveKeys(new Set(["KeyA"]), keyMap)).toEqual(new Set(["a"]))
  })

  it("returns a key when matching with a shifted character.", () => {
    expect(getActiveKeys(new Set(["ShiftLeft", "KeyA"]), keyMap)).toEqual(
      new Set(["A", "Shift"])
    )
  })
})
