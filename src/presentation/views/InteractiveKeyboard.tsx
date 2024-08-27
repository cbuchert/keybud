import { Dispatch, FC, SetStateAction } from "react"
import { MagicKeyboard } from "../../components/organisms/MagicKeyboard.tsx"
import { ExistingKeyChord } from "../../types/ExistingKeyChord.ts"
import { useInteractiveKeyboardViewModel } from "./InteractiveKeyboard.viewmodel.ts"

type Props = {
  pinnedCodes: Set<string>
  setPinnedCodes: Dispatch<SetStateAction<Set<string>>>
  collisions: ExistingKeyChord[]
  eventCodes: Set<string>
  possibleNextCollisions: ExistingKeyChord[]
}

export const InteractiveKeyboard: FC<Props> = ({
  pinnedCodes,
  setPinnedCodes,
  collisions,
  eventCodes,
  possibleNextCollisions,
}) => {
  const { handleClick } = useInteractiveKeyboardViewModel(
    eventCodes,
    pinnedCodes,
    setPinnedCodes
  )
  const unitLength = 0.25

  return (
    <div>
      <MagicKeyboard
        unitLength={unitLength}
        collisions={collisions}
        possibleNextCollisions={possibleNextCollisions}
        onKeyClick={handleClick}
        eventCodes={eventCodes}
        pinnedCodes={pinnedCodes}
      />
    </div>
  )
}
