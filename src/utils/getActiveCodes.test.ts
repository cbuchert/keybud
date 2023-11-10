import { describe, expect, it } from "vitest"
import { getActiveCodes } from "./getActiveCodes.ts"

describe("getActiveCodes", () => {
  it("returns an empty set when no keyboard event and no pinned keys are passed", () => {
    const event = null
    const pinnedKeys = new Set<KeyboardEvent["code"]>()

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set())
  })
})
