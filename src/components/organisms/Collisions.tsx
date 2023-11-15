import autoAnimate from "@formkit/auto-animate"
import { FC, useEffect, useMemo, useRef } from "react"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { Chord } from "../../types/Chord.ts"
import { Collision } from "../molecules/Collision.tsx"
import { CurrentChord } from "../molecules/CurrentChord.tsx"

type Props = {
  activeCodes: KeyboardEvent["code"][]
  activeKeys: Set<KeyboardEvent["key"]>
  collisions: Chord[]
}

export const Collisions: FC<Props> = ({
  activeCodes,
  activeKeys,
  collisions,
}) => {
  const chordRef = useRef<HTMLDivElement>(null)
  const collisionsRef = useRef<HTMLUListElement>(null)
  const osCollisionCount = useMemo(
    () =>
      collisions.reduce((acc, curr) => {
        return acc.add(curr.os)
      }, new Set()).size,
    [collisions]
  )

  useEffect(() => {
    chordRef.current && autoAnimate(chordRef.current)
    collisionsRef.current && autoAnimate(collisionsRef.current)
  }, [chordRef, collisionsRef])

  return (
    <div className={"flex-grow"} ref={chordRef}>
      <CurrentChord
        activeKeyDefinitions={activeCodes.map(
          (code) => appleQuertyKeymappings[code]
        )}
      />
      {activeKeys.size === 0 ? (
        <p className={"text-slate-400 mb-8"}>
          Press or click some keys and see what happens.
        </p>
      ) : (
        <p className={"text-xl text-slate-400 mb-8"}>
          {collisions.length} collision{collisions.length !== 1 && "s"}
          {osCollisionCount > 1 &&
            ` on ${osCollisionCount} OS${osCollisionCount !== 1 && "s"}`}
        </p>
      )}
      <ul className={"flex flex-col gap-12"} ref={collisionsRef}>
        {collisions.map((chordDefinition, i) => (
          <Collision
            key={`${chordDefinition.language}_${chordDefinition.os}_${
              chordDefinition.browser
            }_${[...chordDefinition.keys].join("-")}-${i}`}
            chordDefinition={chordDefinition}
          />
        ))}
      </ul>
    </div>
  )
}
