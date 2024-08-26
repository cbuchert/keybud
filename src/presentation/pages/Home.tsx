import { Filters } from "../../components/molecules/Filters.tsx"
import { browsers } from "../../data/browsers.ts"
import { oses } from "../../data/oses.ts"
import { Collisions } from "../views/Collisions.tsx"
import { InteractiveKeyboard } from "../views/InteractiveKeyboard.tsx"
import { useHomeViewModel } from "./Home.viewmodel.ts"

export const Home = () => {
  const {
    pinnedCodes,
    setPinnedCodes,
    activeKeys,
    collisions,
    possibleNextCollisions,
    eventCodes,
    omittedBrowsers,
    setOmittedBrowsers,
    omittedOses,
    setOmittedOses,
  } = useHomeViewModel()

  return (
    <div>
      <Filters
        oses={oses}
        omittedOses={omittedOses}
        setOmittedOses={setOmittedOses}
        browsers={browsers}
        omittedBrowsers={omittedBrowsers}
        setOmittedBrowsers={setOmittedBrowsers}
      />
      <div className={"flex gap-8"}>
        <InteractiveKeyboard
          pinnedCodes={pinnedCodes}
          setPinnedCodes={setPinnedCodes}
          collisions={collisions}
          eventCodes={eventCodes}
          possibleNextCollisions={possibleNextCollisions}
        />
        <Collisions collisions={collisions} activeKeys={activeKeys} />
      </div>
    </div>
  )
}
