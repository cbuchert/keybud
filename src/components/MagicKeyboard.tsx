import { FC } from "react"
import { magicKeyboardKeys } from "../data/magicKeyboardKeys.ts"
import { KeyboardProps } from "../types/KeyboardProps.ts"
import { Key } from "./molecules/Key.tsx"
import { Keyboard } from "./molecules/Keyboard.tsx"
import { KeyRow } from "./molecules/KeyRow.tsx"

export const MagicKeyboard: FC<KeyboardProps> = ({ keyboardEvent }) => {
  const defaultMMWidth = 15.93
  const defaultMMHeight = 15.4
  const keyMMBorderRadius = 1.5
  const keyMMGap = 2.5
  const unitLength = 0.25
  const mmRowGap = 2.5
  const handleClick = () => {}

  return (
    <Keyboard unitLength={unitLength} mmRowGap={mmRowGap}>
      {magicKeyboardKeys.map((row, index) => {
        return (
          <KeyRow key={index} unitLength={unitLength} mmKeyGap={keyMMGap}>
            {row.map((key) => {
              if (Array.isArray(key)) {
                return (
                  <div>
                    {key.map((key) => (
                      <Key
                        keyDefinition={key}
                        defaultMMHeight={defaultMMHeight}
                        defaultMMWidth={defaultMMWidth}
                        mmBorderRadius={keyMMBorderRadius}
                        unitLength={unitLength}
                        keyboardEvent={keyboardEvent}
                        onClick={handleClick}
                      />
                    ))}
                  </div>
                )
              }
              return (
                <Key
                  keyDefinition={key}
                  defaultMMHeight={defaultMMHeight}
                  defaultMMWidth={defaultMMWidth}
                  mmBorderRadius={keyMMBorderRadius}
                  unitLength={unitLength}
                  keyboardEvent={keyboardEvent}
                  onClick={handleClick}
                />
              )
            })}
          </KeyRow>
        )
      })}
    </Keyboard>
  )
}
