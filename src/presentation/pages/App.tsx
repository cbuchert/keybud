import { Attribution } from "../../components/atoms/Attribution.tsx"
import { PageTitle } from "../../components/atoms/PageTitle.tsx"
import { Filters } from "../../components/molecules/Filters.tsx"
import { browsers } from "../../data/browsers.ts"
import { oses } from "../../data/oses.ts"
import { Collisions } from "../views/Collisions.tsx"
import { InteractiveKeyboard } from "../views/InteractiveKeyboard.tsx"
import { useAppViewModel } from "./App.viewmodel.ts"

export const App = () => {
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
  } = useAppViewModel()

  return (
    <div className={"flex flex-col gap-12 lg:gap-0 mx-8"}>
      <PageTitle />
      <Filters
        oses={oses}
        omittedOses={omittedOses}
        setOmittedOses={setOmittedOses}
        browsers={browsers}
        omittedBrowsers={omittedBrowsers}
        setOmittedBrowsers={setOmittedBrowsers}
      />
      <div className={"flex gap-8"}>
        <div>
          <InteractiveKeyboard
            pinnedCodes={pinnedCodes}
            setPinnedCodes={setPinnedCodes}
            collisions={collisions}
            eventCodes={eventCodes}
            possibleNextCollisions={possibleNextCollisions}
          />
          <Attribution />
        </div>
        <Collisions collisions={collisions} activeKeys={activeKeys} />
      </div>
    </div>
  )
}
