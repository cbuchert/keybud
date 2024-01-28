import { FC } from "react"
import { Chord } from "../../types/Chord.ts"

type Props = {
  chord: Chord
}

export const CustomChord: FC<Props> = ({}) => {
  return <li>Chord.</li>
}
