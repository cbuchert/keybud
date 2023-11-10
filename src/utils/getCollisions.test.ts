import { describe, expect, it } from "vitest"
import { Chord } from "../types/Chord.ts"
import { KeyMap } from "../types/KeyMap.ts"
import { getCollisions } from "./getCollisions.ts"

const keyMap: KeyMap = {
  KeyA: {
    code: "KeyA",
    keys: ["a", "A"],
    labels: ["A"],
  },
  ShiftLeft: {
    code: "ShiftLeft",
    keys: ["Shift"],
    labels: ["Shift"],
    isModifier: true,
  },
}

const chords = [
  {
    keys: new Set(["a"]),
  },
] as Chord[]

describe("getCollisions", () => {
  it("should return an empty array if there are no collisions", () => {
    const activeCodes = new Set<KeyboardEvent["code"]>()

    expect(getCollisions(activeCodes, chords, keyMap)).toEqual([])
  })

  it("returns a collision if the active code is in the chords", () => {
    const activeCodes = new Set<KeyboardEvent["code"]>(["KeyA"])
    const expectedCollisions = [
      {
        keys: new Set(["a"]),
      },
    ] as Chord[]

    expect(getCollisions(activeCodes, chords, keyMap)).toEqual(
      expectedCollisions
    )
  })
})
