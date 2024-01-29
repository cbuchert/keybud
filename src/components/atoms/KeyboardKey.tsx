import classNames from "classnames"
import { FC } from "react"
import { KeyDefinition } from "../../types/KeyDefinition.ts"

type Props = {
  keyDefinition?: KeyDefinition
  mmWidth: number
  mmHeight: number
  mmBorderRadius: number
  unitLength: number
  isPressed: boolean
  isTaken: boolean
  isTakenNext: boolean
  isPinned: boolean
  onClick: () => void
}

export const KeyboardKey: FC<Props> = ({
  keyDefinition,
  mmHeight,
  mmWidth,
  mmBorderRadius,
  unitLength,
  isPressed,
  isTaken,
  isTakenNext,
  isPinned,
  onClick,
}) => {
  const keyWidth = mmWidth * unitLength
  const keyHeight = mmHeight * unitLength
  const primaryKeyFontsizeMultiplier = 4
  const secondaryKeyFontSizeMultiplier = 3.5

  if (!keyDefinition) {
    return (
      <button
        type={"button"}
        className={"rounded border border-dashed border-gray-400"}
        style={{
          gap: `${unitLength * 0.5}rem`,
          width: `${keyWidth}rem`,
          height: `${keyHeight}rem`,
          borderRadius: `${mmBorderRadius * unitLength}rem`,
        }}
      />
    )
  }

  const {
    labels: [primaryLabel, secondaryLabel],
  } = keyDefinition

  const textAndBackgroundColor = (() => {
    if (isPinned) {
      if (isTaken) {
        return "bg-red-700 text-white"
      }

      return "bg-slate-600 text-slate-100"
    }

    if (isPressed) {
      if (isTaken) {
        return "bg-red-400 text-white"
      }

      return "bg-sky-300 text-slate-900"
    }

    if (isTakenNext) {
      return "bg-red-100 text-red-900"
    }

    return "bg-white text-gray-500"
  })()

  return (
    <button
      type={"button"}
      className={classNames(
        "flex flex-col justify-center items-center border border-gray-400 transition-all transform-gpu",
        textAndBackgroundColor,
        isPressed ? "shadow-md" : "shadow-sm"
      )}
      onClick={onClick}
      style={{
        gap: `${unitLength * 0.5}rem`,
        width: `${keyWidth}rem`,
        height: `${keyHeight}rem`,
        borderRadius: `${mmBorderRadius * unitLength}rem`,
      }}
    >
      {secondaryLabel && (
        <span
          style={{
            fontSize: `${unitLength * secondaryKeyFontSizeMultiplier}rem`,
          }}
        >
          {secondaryLabel}
        </span>
      )}
      <span
        style={{
          fontSize: `${
            unitLength *
            (secondaryLabel
              ? secondaryKeyFontSizeMultiplier
              : primaryKeyFontsizeMultiplier)
          }rem`,
        }}
      >
        {primaryLabel}
      </span>
    </button>
  )
}
