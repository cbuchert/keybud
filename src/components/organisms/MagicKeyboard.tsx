import { FC } from "react"
import { appleMagicKeyboardLayout } from "../../data/appleMagicKeyboardLayout.ts"
import { appleQuertyKeymap } from "../../data/appleQuertyKeymap.ts"
import { KeyboardProps } from "../../types/KeyboardProps.ts"
import { getIsPressed } from "../../utils/getIsPressed.ts"
import { getIsTaken } from "../../utils/getIsTaken.ts"
import { Key } from "../molecules/Key.tsx"
import { Keyboard } from "../molecules/Keyboard.tsx"
import { KeyRow } from "../molecules/KeyRow.tsx"

export const MagicKeyboard: FC<KeyboardProps> = ({
  activeCodes,
  unitLength,
  collisions,
  onKeyClick,
  pinnedCodes,
}) => {
  const defaultMMWidth = 15.93
  const defaultMMHeight = 15.4
  const keyMMBorderRadius = 1.5
  const keyMMGap = 2.9
  const mmRowGap = 2.9

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
                      <Key
                        key={key.code}
                        keyDefinition={appleQuertyKeymap[key.code]}
                        mmHeight={key.mmHeight || defaultMMHeight}
                        mmWidth={key.mmWidth || defaultMMWidth}
                        mmBorderRadius={keyMMBorderRadius}
                        unitLength={unitLength}
                        isPressed={getIsPressed(
                          appleQuertyKeymap[key.code],
                          activeCodes
                        )}
                        isTaken={getIsTaken(
                          key,
                          activeCodes,
                          collisions.length > 0
                        )}
                        isPinned={pinnedCodes.has(key.code)}
                        onClick={onKeyClick(key.code)}
                      />
                    ))}
                  </div>
                )
              }
              return (
                <Key
                  key={key.code}
                  keyDefinition={appleQuertyKeymap[key.code]}
                  mmHeight={key.mmHeight || defaultMMHeight}
                  mmWidth={key.mmWidth || defaultMMWidth}
                  mmBorderRadius={keyMMBorderRadius}
                  unitLength={unitLength}
                  isPressed={getIsPressed(
                    appleQuertyKeymap[key.code],
                    activeCodes
                  )}
                  isTaken={getIsTaken(key, activeCodes, collisions.length > 0)}
                  isPinned={pinnedCodes.has(key.code)}
                  onClick={onKeyClick(key.code)}
                />
              )
            })}
          </KeyRow>
        )
      })}
    </Keyboard>
  )
}
