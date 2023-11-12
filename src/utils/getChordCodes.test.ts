import { describe, expect, it } from "vitest"
import { Chord } from "../types/Chord.ts"
import { KeyMappings } from "../types/KeyMappings.ts"
import { getChordCodes } from "./getChordCodes.ts"

const keyMap: KeyMappings = {
  keyA: { code: "keyA", labels: ["A"], keys: ["a", "A"] },
  ShiftLeft: { code: "ShiftLeft", labels: ["Shift"], keys: ["Shift"] },
  ShiftRight: { code: "ShiftRight", labels: ["Shift"], keys: ["Shift"] },
}

describe("getChordCodes", () => {
  it("returns a single code for a single key non-modifier chord.", () => {
    const chord = { keys: ["a"] } as unknown as Chord

    expect(getChordCodes(chord, keyMap)).toEqual(new Set(["keyA"]))
  })

  it("returns two codes for a single key modifier chord.", () => {
    const chord = { keys: ["Shift"] } as unknown as Chord

    expect(getChordCodes(chord, keyMap)).toEqual(
      new Set(["ShiftLeft", "ShiftRight"])
    )
  })

  it("returns three codes for a chord with a modifier and a non-modifier.", () => {
    const chord = { keys: ["Shift", "a"] } as unknown as Chord

    expect(getChordCodes(chord, keyMap)).toEqual(
      new Set(["ShiftLeft", "ShiftRight", "keyA"])
    )
  })
})
