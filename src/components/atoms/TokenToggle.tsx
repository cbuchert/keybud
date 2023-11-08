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
        "rounded-full px-4 py-1 transition-all",
        isChecked ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
      )}
      onClick={onChange}
    >
      {children}
    </button>
  )
}
