import { FC } from "react"
import { magicKeyboardKeys } from "../data/magicKeyboardKeys.ts"
import { KeyboardProps } from "../types/KeyboardProps.ts"
import { getIsPressed } from "../utils/getIsPressed.ts"
import { getIsTaken } from "../utils/getIsTaken.ts"
import { Key } from "./molecules/Key.tsx"
import { Keyboard } from "./molecules/Keyboard.tsx"
import { KeyRow } from "./molecules/KeyRow.tsx"

export const MagicKeyboard: FC<KeyboardProps> = ({
  keyboardEvent,
  unitLength,
  collisions,
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
      {magicKeyboardKeys.map((row, index) => {
        return (
          <KeyRow key={index} unitLength={unitLength} mmKeyGap={keyMMGap}>
            {row.map((key, i) => {
              if (Array.isArray(key)) {
                return (
                  <div key={`row-${index}-group-${i}`}>
                    {key.map((key, j) => (
                      <Key
                        key={`${key.label[0]}-${i}-${j}`}
                        keyDefinition={key}
                        defaultMMHeight={defaultMMHeight}
                        defaultMMWidth={defaultMMWidth}
                        mmBorderRadius={keyMMBorderRadius}
                        unitLength={unitLength}
                        isPressed={getIsPressed(key, keyboardEvent)}
                        isTaken={getIsTaken(key, keyboardEvent, collisions)}
                      />
                    ))}
                  </div>
                )
              }
              return (
                <Key
                  key={`${key.label[0]}-${i}`}
                  keyDefinition={key}
                  defaultMMHeight={defaultMMHeight}
                  defaultMMWidth={defaultMMWidth}
                  mmBorderRadius={keyMMBorderRadius}
                  unitLength={unitLength}
                  isPressed={getIsPressed(key, keyboardEvent)}
                  isTaken={getIsTaken(key, keyboardEvent, collisions)}
                />
              )
            })}
          </KeyRow>
        )
      })}
    </Keyboard>
  )
}
