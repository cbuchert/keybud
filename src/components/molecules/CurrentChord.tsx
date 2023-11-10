import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  activeKeyDefinitions: KeyDefinition[]
}

export const CurrentChord: FC<Props> = ({ activeKeyDefinitions }) => {
  const isShifted = activeKeyDefinitions.some(
    ({ code }) => code === "ShiftLeft" || code === "ShiftRight"
  )

  return (
    <h2 className={"text-3xl font-bold mb-4"}>
      {[
        ...new Set(
          activeKeyDefinitions
            .sort((a, b) => {
              if (a.isModifier && !b.isModifier) {
                return -1
              } else if (!a.isModifier && b.isModifier) {
                return 1
              }
              return 0
            })
            .map(({ keys }) => keys[isShifted ? (keys.length > 1 ? 1 : 0) : 0])
        ),
      ].join(" + ")}
    </h2>
  )
}
