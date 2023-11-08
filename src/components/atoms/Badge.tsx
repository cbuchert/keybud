import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Badge: FC<Props> = ({ children }) => {
  return (
    <span className={"rounded-full bg-slate-200 text-slate-800 px-2 py-0.5"}>
      {children}
    </span>
  )
}
