import classNames from "classnames"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export const Badge: FC<Props> = ({ children, className }) => {
  return (
    <span className={classNames("rounded-full px-2 py-0.5", className)}>
      {children}
    </span>
  )
}
