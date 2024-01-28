import { FC } from "react"
import { Chord } from "../../types/Chord.ts"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import { Collisions } from "./Collisions.tsx"

type Props = {
  customChords: Chord[]
  pinnedCodes: Set<string>
  collisions: ExistingKeyChord[]
  eventCodes: Set<string>
  activeKeys: Set<string>
}

export const CollisionDiscovery: FC<Props> = ({
  pinnedCodes,
  collisions,
  activeKeys,
  eventCodes,
}) => {
  return (
    <Collisions
      activeCodes={[...eventCodes, ...pinnedCodes]}
      activeKeys={activeKeys}
      collisions={collisions}
    />
  )
}
