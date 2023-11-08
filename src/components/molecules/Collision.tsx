import { FC } from "react"
import { ChordDefinition } from "../../types/ChordDefinition.ts"
import { Badge } from "../atoms/Badge.tsx"

type Props = {
  chordDefinition: ChordDefinition
}

export const Collision: FC<Props> = ({ chordDefinition }) => {
  return (
    <li>
      <div className={"grid grid-cols-2 gap-4"}>
        <div>
          <p className={"text-gray-600 font-semibold text-lg"}>Languages:</p>
          <Badge>{chordDefinition.language}</Badge>
        </div>
        <div>
          <p className={"text-gray-600 font-semibold text-lg"}>
            Browser support:
          </p>
          <p className={"flex gap-2"}>
            {chordDefinition.os.map((browser) => (
              <Badge key={browser}>{browser}</Badge>
            ))}
          </p>
        </div>
        <div className={"col-span-2"}>
          <p className={"text-gray-600 font-semibold text-lg"}>Description:</p>
          <p className={"text-gray-400"}>{chordDefinition.description}</p>
        </div>
      </div>
    </li>
  )
}
