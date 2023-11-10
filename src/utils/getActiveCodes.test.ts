import { describe, expect, it } from "vitest"
import { getActiveCodes } from "./getActiveCodes.ts"

describe("getActiveCodes", () => {
  it("returns an empty set when no keyboard event and no pinned keys are passed", () => {
    const event = null
    const pinnedKeys = new Set<KeyboardEvent["code"]>()

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set())
  })

  it("returns a set with the keyboard event code when no pinned keys are passed", () => {
    const event = new KeyboardEvent("keydown", { code: "KeyA" })
    const pinnedKeys = new Set<KeyboardEvent["code"]>()

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set(["KeyA"]))
  })

  it("returns a set with the pinned keys when no keyboard event is passed", () => {
    const event = null
    const pinnedKeys = new Set<KeyboardEvent["code"]>(["KeyA"])

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set(["KeyA"]))
  })
})
