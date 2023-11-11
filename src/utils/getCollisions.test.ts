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

const chords = [
  {
    keys: new Set(["a"]),
  },
  {
    keys: new Set(["Shift", "A"]),
  },
] as Chord[]

describe("getCollisions", () => {
  it("should return an empty array if there are no collisions", () => {
    expect(getCollisions(new Set(), chords, keyMap)).toEqual([])
    expect(getCollisions(new Set(["ShiftLeft"]), chords, keyMap)).toEqual([])
  })

  it("returns an empty array if the active code is not in the chords", () => {
    expect(getCollisions(new Set(["F1"]), chords, keyMap)).toEqual([])
    expect(getCollisions(new Set(["F1", "ShiftLeft"]), chords, keyMap)).toEqual(
      []
    )
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

  it("returns a collision with a shifted character.", () => {
    const activeCodes = new Set<KeyboardEvent["code"]>(["ShiftLeft", "KeyA"])
    const expectedCollisions = [
      {
        keys: new Set(["Shift", "A"]),
      },
    ] as Chord[]

    expect(getCollisions(activeCodes, chords, keyMap)).toEqual(
      expectedCollisions
    )
  })

  it("returns gracefully when an active key code does not exist in the key map (eg. RightCtrl on an Apple Magic Keyboard).", () => {
    const activeCodes = new Set<KeyboardEvent["code"]>([
      "ShiftLeft",
      "ShiftRight",
      "KeyA",
    ])
    const expectedCollisions = [
      {
        keys: new Set(["Shift", "A"]),
      },
    ] as Chord[]

    expect(getCollisions(activeCodes, chords, keyMap)).toEqual(
      expectedCollisions
    )
  })
})
