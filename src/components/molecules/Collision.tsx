import { FC } from "react"
import { Chord } from "../../types/Chord.ts"
import { Badge } from "../atoms/Badge.tsx"

type Props = {
  chordDefinition: Chord
}

export const Collision: FC<Props> = ({ chordDefinition }) => {
  return (
    <li>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-2"}>
          <Badge className={"bg-slate-300 text-slate-900"}>
            {chordDefinition.os}
          </Badge>
          <Badge className={"bg-slate-200 text-slate-800"}>
            {chordDefinition.browser}
          </Badge>
        </div>
        <div>
          <p className={"text-gray-600 font-semibold text-lg"}>Description:</p>
          <p className={"text-gray-400"}>{chordDefinition.description}</p>
        </div>
      </div>
    </li>
  )
}
