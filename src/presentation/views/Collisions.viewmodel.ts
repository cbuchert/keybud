import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useMemo } from "react"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"

export const useCollisionsViewModel = (collisions: ExistingKeyChord[]) => {
  const [chordRef] = useAutoAnimate()
  const [collisionsRef] = useAutoAnimate()
  const osCollisionCount = useMemo(
    () =>
      collisions.reduce((acc, curr) => {
        return acc.add(curr.os)
      }, new Set()).size,
    [collisions]
  )

  return {
    chordRef,
    collisionsRef,
    osCollisionCount,
  }
}
