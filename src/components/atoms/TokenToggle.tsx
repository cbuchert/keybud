import classNames from "classnames"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  isChecked: boolean
  onChange: () => void
}

export const TokenToggle: FC<Props> = ({ children, isChecked, onChange }) => {
  return (
    <button
      type={"button"}
      className={classNames(
        "rounded-full px-4 py-1 transition-all flex gap-3 items-center",
        isChecked ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
      )}
      onClick={onChange}
    >
      <span className={"w-2.5"}>{isChecked ? "☑" : "☐"}</span>
      {children}
    </button>
  )
}
