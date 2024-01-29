import { FC } from "react"

type Props = {
  activeKeys: Set<string>
}

export const CurrentChord: FC<Props> = ({ activeKeys }) => {
  if (!activeKeys.size) {
    return null
  }

  return (
    <h2 className={"text-3xl font-bold mb-4"}>
      {[...activeKeys].map((key) => (key === " " ? "Space" : key)).join(" + ")}
    </h2>
  )
}
