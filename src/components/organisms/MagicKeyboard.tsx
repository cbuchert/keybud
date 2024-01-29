import { FC } from "react"
import { appleMagicKeyboardLayout } from "../../data/appleMagicKeyboardLayout.ts"
import { appleQuertyKeymappings } from "../../data/appleQuertyKeymappings.ts"
import { Key } from "../../types/Key.ts"
import { KeyboardProps } from "../../types/KeyboardProps.ts"
import { getChordCodes } from "../../utils/getChordCodes.ts"
import { getIsPressed } from "../../utils/getIsPressed.ts"
import { getIsTaken } from "../../utils/getIsTaken.ts"
import { Keyboard } from "../atoms/Keyboard.tsx"
import { KeyboardKey } from "../atoms/KeyboardKey.tsx"
import { KeyRow } from "../atoms/KeyRow.tsx"

export const MagicKeyboard: FC<KeyboardProps> = ({
  unitLength,
  collisions,
  possibleNextCollisions,
  onKeyClick,
  eventCodes,
  pinnedCodes,
}) => {
  const keyMMGap = 2.9
  const mmRowGap = 2.9
  const keyMMBorderRadius = 1.5

  const KeyElement: FC<{ actualKey: Key }> = ({ actualKey }) => {
    const defaultMMWidth = 15.93
    const defaultMMHeight = 15.4

    return (
      <KeyboardKey
        keyDefinition={appleQuertyKeymappings[actualKey.code]}
        mmHeight={actualKey.mmHeight || defaultMMHeight}
        mmWidth={actualKey.mmWidth || defaultMMWidth}
        mmBorderRadius={keyMMBorderRadius}
        unitLength={unitLength}
        isPressed={getIsPressed(
          appleQuertyKeymappings[actualKey.code],
          eventCodes,
          pinnedCodes
        )}
        isTaken={getIsTaken(
          actualKey,
          new Set([...eventCodes, ...pinnedCodes]),
          collisions.length > 0
        )}
        isTakenNext={possibleNextCollisions.some((chord) =>
          getIsTaken(
            actualKey,
            getChordCodes(chord, appleQuertyKeymappings),
            true
          )
        )}
        isPinned={pinnedCodes.has(actualKey.code)}
        onClick={onKeyClick(actualKey.code)}
      />
    )
  }

  return (
    <Keyboard
      unitLength={unitLength}
      mmRowGap={mmRowGap}
      keyMMBorderRadius={keyMMBorderRadius}
    >
      {appleMagicKeyboardLayout.map((row, index) => {
        return (
          <KeyRow key={index} unitLength={unitLength} mmKeyGap={keyMMGap}>
            {row.map((key, i) => {
              if (Array.isArray(key)) {
                return (
                  <div key={`row-${index}-group-${i}`}>
                    {key.map((key) => (
                      <KeyElement key={key.code} actualKey={key} />
                    ))}
                  </div>
                )
              }
              return <KeyElement key={key.code} actualKey={key} />
            })}
          </KeyRow>
        )
      })}
    </Keyboard>
  )
}
