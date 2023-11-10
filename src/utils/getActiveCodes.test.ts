import { describe, expect, it } from "vitest"
import { getActiveCodes } from "./getActiveCodes.ts"

class TestKeyboardEvent extends Event {
  code: string
  ctrlKey: boolean
  altKey: boolean
  shiftKey: boolean
  metaKey: boolean

  constructor(
    _: string,
    init: {
      code: string
      ctrlKey?: boolean
      altKey?: boolean
      shiftKey?: boolean
      metaKey?: boolean
    }
  ) {
    super("KeyboardEvent")
    this.code = init.code
    this.ctrlKey = init.ctrlKey ?? false
    this.altKey = init.altKey ?? false
    this.shiftKey = init.shiftKey ?? false
    this.metaKey = init.metaKey ?? false
  }
}

describe("getActiveCodes", () => {
  it("returns an empty set when no keyboard event and no pinned keys are passed", () => {
    const event = null
    const pinnedKeys = new Set<KeyboardEvent["code"]>()

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set())
  })

  it("returns a set with the keyboard event code when no pinned keys are passed", () => {
    const event = new TestKeyboardEvent("keydown", { code: "KeyA" })
    const pinnedKeys = new Set<KeyboardEvent["code"]>()

    expect(getActiveCodes(event, pinnedKeys)).toEqual(new Set(["KeyA"]))
  })
})
