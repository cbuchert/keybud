import classNames from "classnames"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  mmKeyGap: number
  unitLength: number
}

export const KeyRow: FC<Props> = ({ children, mmKeyGap, unitLength }) => {
  return (
    <div
      className={classNames("flex")}
      style={{
        gap: `${mmKeyGap * unitLength}rem`,
      }}
    >
      {children}
    </div>
  )
}
