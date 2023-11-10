import { FC } from "react"
import { Chord } from "../../types/Chord.ts"
import { Badge } from "../atoms/Badge.tsx"

type Props = {
  chordDefinition: Chord
}

export const Collision: FC<Props> = ({ chordDefinition }) => {
  return (
    <li>
      <div className={"grid grid-cols-3 gap-4"}>
        <div>
          <p className={"text-gray-600 font-semibold text-lg"}>Languages:</p>
          <Badge>{chordDefinition.language}</Badge>
        </div>
        <div>
          <p className={"text-gray-600 font-semibold text-lg"}>Browser:</p>
          <Badge key={chordDefinition.browser}>{chordDefinition.browser}</Badge>
        </div>
        <div className={"col-span-3"}>
          <p className={"text-gray-600 font-semibold text-lg"}>Description:</p>
          <p className={"text-gray-400"}>{chordDefinition.description}</p>
        </div>
      </div>
    </li>
  )
}
