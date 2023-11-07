import classNames from "classnames"
import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  keyDefinition: KeyDefinition
  onClick: () => void
  keyboardEvent: KeyboardEvent | null
}

export const Key: FC<Props> = ({
  keyDefinition: { keyNames, label, width = 1 },
  onClick,
  keyboardEvent,
}) => {
  const isAlt = keyNames.includes("Alt")
  const isShift = keyNames.includes("Shift")
  const isControl = keyNames.includes("Control")
  const isMeta = keyNames.includes("Meta")

  // Determine if the key is pressed based on the chord
  const isPressed = (() => {
    if (!keyboardEvent) {
      return false
    }

    return (
      keyNames.includes(keyboardEvent.key) ||
      (isAlt && keyboardEvent.altKey) ||
      (isShift && keyboardEvent.shiftKey) ||
      (isControl && keyboardEvent.ctrlKey) ||
      (isMeta && keyboardEvent.metaKey)
    )
  })()
  const [primaryLabel, secondaryLabel] = label

  return (
    <button
      type={"button"}
      className={classNames(
        "flex flex-col justify-center items-center rounded h-12 w-12 text-gray-600",
        isPressed ? "bg-blue-400" : "bg-white"
      )}
      onClick={onClick}
    >
      {secondaryLabel && <span className={"text-sm"}>{secondaryLabel}</span>}
      <span>{primaryLabel}</span>
    </button>
  )
}
