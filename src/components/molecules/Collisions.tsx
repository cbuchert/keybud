import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FC, useMemo } from "react"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { Chord } from "../../types/Chord.ts"
import { CurrentChord } from "../atoms/CurrentChord.tsx"
import { Collision } from "./Collision.tsx"

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
  const [chordRef] = useAutoAnimate()
  const [collisionsRef] = useAutoAnimate()
  const osCollisionCount = useMemo(
    () =>
      collisions.reduce((acc, curr) => {
        return acc.add(curr.os)
      }, new Set()).size,
    [collisions]
  )

  return (
    <div
      className={
        "flex-grow lg:pt-[25.5rem] md:pr-8 pb-48 lg:h-[100vh] overflow-y-auto"
      }
      ref={chordRef}
    >
      <CurrentChord
        key={"current-chord"}
        activeKeyDefinitions={activeCodes.map(
          (code) => appleQuertyKeymappings[code]
        )}
      />
      {activeKeys.size === 0 ? (
        <p className={"text-slate-400 mb-8"} key={"press-a-key"}>
          Press or click some keys and see what happens.
        </p>
      ) : (
        <p className={"text-xl text-slate-400 mb-8"} key={"collision-counts"}>
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
