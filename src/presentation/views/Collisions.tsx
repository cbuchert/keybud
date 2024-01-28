import { FC } from "react"
import { CurrentChord } from "../../components/atoms/CurrentChord.tsx"
import { Collision } from "../../components/molecules/Collision.tsx"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { Chord } from "../../types/Chord.ts"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import { useCollisionsViewModel } from "./Collisions.viewmodel.ts"

type Props = {
  customChords: Chord[]
  pinnedCodes: Set<string>
  collisions: ExistingKeyChord[]
  eventCodes: Set<string>
  activeKeys: Set<string>
}

export const Collisions: FC<Props> = ({
  collisions,
  activeKeys,
  pinnedCodes,
  eventCodes,
}) => {
  const { chordRef, collisionsRef, osCollisionCount } =
    useCollisionsViewModel(collisions)

  return (
    <div className={"flex-grow md:pr-8 overflow-y-auto"} ref={chordRef}>
      <CurrentChord
        key={"current-chord"}
        activeKeyDefinitions={[...pinnedCodes, ...eventCodes].map(
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
