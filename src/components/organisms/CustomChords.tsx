import { FC } from "react"
import { Chord } from "../../types/Chord.ts"
import { CustomChord } from "../molecules/CustomChord.tsx"

type Props = {
  chords: (Chord & { id: string })[]
}

export const CustomChords: FC<Props> = ({ chords }) => {
  return (
    <div>
      <h2>Your Custom Key Chords</h2>
      <ul>
        {chords.map(({ id, ...chord }) => (
          <CustomChord chord={chord} key={id} />
        ))}
      </ul>
    </div>
  )
}
