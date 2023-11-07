import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  mmRowGap: number
  unitLength: number
}

export const Keyboard: FC<Props> = ({ children, mmRowGap, unitLength }) => {
  return (
    <div
      className={"inline-block bg-gradient-to-b from-gray-200 to-gray-300"}
      style={{
        borderRadius: `${mmRowGap * unitLength}rem`,
      }}
    >
      <div
        className={"flex flex-col"}
        style={{
          padding: `${mmRowGap * unitLength}rem`,
          gap: `${mmRowGap * unitLength}rem`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
