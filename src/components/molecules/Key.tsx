import classNames from "classnames"
import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  keyDefinition: KeyDefinition
  defaultMMWidth: number
  defaultMMHeight: number
  mmBorderRadius: number
  unitLength: number
  onClick: () => void
  keyboardEvent: KeyboardEvent | null
}

export const Key: FC<Props> = ({
  keyDefinition: { keyNames, label, mmWidth, mmHeight },
  defaultMMHeight,
  defaultMMWidth,
  mmBorderRadius,
  unitLength,
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
      keyNames.includes(keyboardEvent.key.toLocaleLowerCase()) ||
      (isAlt && keyboardEvent.altKey) ||
      (isShift && keyboardEvent.shiftKey) ||
      (isControl && keyboardEvent.ctrlKey) ||
      (isMeta && keyboardEvent.metaKey)
    )
  })()
  const [primaryLabel, secondaryLabel] = label

  const keyWidth = (mmWidth || defaultMMWidth) * unitLength
  const keyHeight = (mmHeight || defaultMMHeight) * unitLength

  return (
    <button
      type={"button"}
      className={classNames(
        "flex flex-col justify-center items-center text-gray-600 border border-gray-400",
        isPressed ? "bg-sky-300" : "bg-white"
      )}
      style={{
        width: `${keyWidth}rem`,
        height: `${keyHeight}rem`,
        borderRadius: `${mmBorderRadius * unitLength}rem`,
      }}
      onClick={onClick}
    >
      {secondaryLabel && <span className={"text-sm"}>{secondaryLabel}</span>}
      <span>{primaryLabel}</span>
    </button>
  )
}
