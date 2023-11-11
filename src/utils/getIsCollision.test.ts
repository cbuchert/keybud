import { describe, expect, it } from "vitest"
import { Chord } from "../types/Chord.ts"
import { KeyMap } from "../types/KeyMap.ts"
import { getIsCollision } from "./getIsCollision.ts"

const keyMap: KeyMap = {
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

describe("getIsCollision", () => {
  it("should return false if there is no collisions", () => {
    expect(getIsCollision(new Set(), {} as Chord, keyMap)).toEqual(false)
    expect(getIsCollision(new Set(["ShiftLeft"]), {} as Chord, keyMap)).toEqual(
      false
    )
  })

  it("returns false if the active code is not in the chord", () => {
    expect(
      getIsCollision(new Set(["F1"]), { keys: new Set(["a"]) } as Chord, keyMap)
    ).toEqual(false)
    expect(
      getIsCollision(
        new Set(["F1", "ShiftLeft"]),
        { keys: new Set(["Shift", "A"]) } as Chord,
        keyMap
      )
    ).toEqual(false)
  })

  it("returns true if the active code matches the chord", () => {
    expect(
      getIsCollision(
        new Set(["KeyA"]),
        { keys: new Set(["a"]) } as Chord,
        keyMap
      )
    ).toEqual(true)
  })

  it("returns true when matching with a shifted character.", () => {
    expect(
      getIsCollision(
        new Set(["ShiftLeft", "KeyA"]),
        {
          keys: new Set(["Shift", "A"]),
        } as Chord,
        keyMap
      )
    ).toEqual(true)
  })

  it("returns gracefully when an active key code does not exist in the key map (eg. RightCtrl on an Apple Magic Keyboard).", () => {
    expect(
      getIsCollision(
        new Set(["ShiftLeft", "ShiftRight", "KeyA"]),
        {
          keys: new Set(["Shift", "A"]),
        } as Chord,
        keyMap
      )
    ).toEqual(true)
  })
})
