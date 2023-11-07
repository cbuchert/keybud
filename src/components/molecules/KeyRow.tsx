import classNames from "classnames"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const KeyRow: FC<Props> = ({ children }) => {
  return <div className={classNames("flex gap-2")}>{children}</div>
}
