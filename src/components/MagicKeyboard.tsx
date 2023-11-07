import { FC } from "react"
import { magicKeyboardKeys } from "../data/magicKeyboardKeys.ts"
import { KeyboardProps } from "../types/KeyboardProps.ts"
import { Key } from "./molecules/Key.tsx"
import { KeyRow } from "./molecules/KeyRow.tsx"

export const MagicKeyboard: FC<KeyboardProps> = ({ keyboardEvent }) => {
  const handleClick = () => {}
  return (
    <div className={"inline-block"}>
      <div className={"flex flex-col gap-2 bg-gray-400 p-2"}>
        {magicKeyboardKeys.map((row, index) => {
          return (
            <KeyRow key={index}>
              {row.map((key) => {
                if (Array.isArray(key)) {
                  return (
                    <div>
                      {key.map((key) => (
                        <Key
                          keyDefinition={key}
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
                    keyboardEvent={keyboardEvent}
                    onClick={handleClick}
                  />
                )
              })}
            </KeyRow>
          )
        })}
      </div>
    </div>
  )
}
