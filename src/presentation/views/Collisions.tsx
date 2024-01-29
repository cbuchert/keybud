import { FC } from "react"
import { CurrentChord } from "../../components/atoms/CurrentChord.tsx"
import { Collision } from "../../components/molecules/Collision.tsx"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import { useCollisionsViewModel } from "./Collisions.viewmodel.ts"

type Props = {
  activeKeys: Set<string>
  collisions: ExistingKeyChord[]
}

export const Collisions: FC<Props> = ({ activeKeys, collisions }) => {
  const { chordRef, collisionsRef, osCollisionCount } =
    useCollisionsViewModel(collisions)

  return (
    <div className={"flex-grow md:pr-8 overflow-y-auto"} ref={chordRef}>
      <CurrentChord activeKeys={activeKeys} />
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
