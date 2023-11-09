import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  activeKeyDefinitions: KeyDefinition[]
}

export const CurrentChord: FC<Props> = ({ activeKeyDefinitions }) => {
  return (
    <h2 className={"text-3xl font-bold mb-4"}>
      {activeKeyDefinitions.map(({ code }) => code).join(" + ")}
    </h2>
  )
}
