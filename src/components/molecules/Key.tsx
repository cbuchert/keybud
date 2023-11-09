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
  isPinned: boolean
  onClick: () => void
}

export const Key: FC<Props> = ({
  keyDefinition,
  mmHeight,
  mmWidth,
  mmBorderRadius,
  unitLength,
  isPressed,
  isTaken,
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

  return (
    <button
      type={"button"}
      className={classNames(
        "flex flex-col justify-center items-center text-gray-500 border border-gray-400 transition-all transform-gpu",
        isPinned
          ? "bg-slate-600 text-slate-100"
          : isPressed
          ? isTaken
            ? "bg-red-400 text-gray-900"
            : "bg-sky-300 text-gray-900"
          : "bg-white",
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
