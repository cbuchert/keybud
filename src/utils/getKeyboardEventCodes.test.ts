import { describe, expect, it } from "vitest"
import { getKeyboardEventCodes } from "./getKeyboardEventCodes.ts"

describe("getKeyboardEventCodes", () => {
  it("returns an empty set when no keyboard event and no pinned keys are passed", () => {
    const event = null

    expect(getKeyboardEventCodes(event)).toEqual(new Set())
  })

  it("returns a set with the keyboard event code when no pinned keys are passed", () => {
    const event = new KeyboardEvent("keydown", { code: "KeyA" })

    expect(getKeyboardEventCodes(event)).toEqual(new Set(["KeyA"]))
  })

  it("returns a set with the pinned keys when no keyboard event is passed", () => {
    const event = null

    expect(getKeyboardEventCodes(event)).toEqual(new Set())
  })

  it("return a set of modifier keys from the keyboard event.", () => {
    const event = new KeyboardEvent("keydown", {
      code: "KeyA",
      ctrlKey: true,
      altKey: true,
      shiftKey: true,
      metaKey: true,
    })

    expect(getKeyboardEventCodes(event)).toEqual(
      new Set([
        "ControlLeft",
        "ControlRight",
        "AltLeft",
        "AltRight",
        "ShiftLeft",
        "ShiftRight",
        "MetaLeft",
        "MetaRight",
        "KeyA",
      ])
    )
  })
})
