import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  activeKeyDefinitions: KeyDefinition[]
}

export const CurrentChord: FC<Props> = ({ activeKeyDefinitions }) => {
  const isShifted = activeKeyDefinitions.some((keyDefinition) => {
    if (!keyDefinition) {
      return false
    }

    return (
      keyDefinition.code === "ShiftLeft" || keyDefinition.code === "ShiftRight"
    )
  })

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
            .filter(Boolean)
            .map(({ keys }) => {
              const key = keys[isShifted ? (keys.length > 1 ? 1 : 0) : 0]

              return key === " " ? "Space" : key
            })
        ),
      ].join(" + ")}
    </h2>
  )
}
