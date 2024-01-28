import { Dispatch, FC, SetStateAction } from "react"
import { MagicKeyboard } from "../../components/organisms/MagicKeyboard.tsx"
import { Browser } from "../../types/Browser.ts"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import { Os } from "../../types/Os.ts"
import { useInteractiveKeyboardViewModel } from "./InteractiveKeyboard.viewmodel.ts"

type Props = {
  pinnedCodes: Set<string>
  setPinnedCodes: Dispatch<SetStateAction<Set<string>>>
  collisions: ExistingKeyChord[]
  eventCodes: Set<string>
  omittedOses: Os[]
  omittedBrowsers: Browser[]
  activeKeys: Set<string>
}

export const InteractiveKeyboard: FC<Props> = ({
  pinnedCodes,
  setPinnedCodes,
  collisions,
  eventCodes,
  omittedOses,
  omittedBrowsers,
  activeKeys,
}) => {
  const { possibleNextCollisions, handleClick } =
    useInteractiveKeyboardViewModel(
      omittedOses,
      omittedBrowsers,
      activeKeys,
      eventCodes,
      pinnedCodes,
      setPinnedCodes
    )
  const unitLength = 0.25

  return (
    <MagicKeyboard
      unitLength={unitLength}
      collisions={collisions}
      possibleNextCollisions={possibleNextCollisions}
      onKeyClick={handleClick}
      eventCodes={eventCodes}
      pinnedCodes={pinnedCodes}
    />
  )
}
