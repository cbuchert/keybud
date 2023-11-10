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

const chords = [] as Chord[]

describe("getCollisions", () => {
  it("should return an empty array if there are no collisions", () => {
    const activeCodes = new Set<KeyboardEvent["code"]>()

    expect(getCollisions(activeCodes, chords, keyMap)).toEqual([])
  })
})
