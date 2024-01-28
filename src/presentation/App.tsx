import { Attribution } from "../components/atoms/Attribution.tsx"
import { PageTitle } from "../components/atoms/PageTitle.tsx"
import { CollisionDiscovery } from "../components/molecules/CollisionDiscovery.tsx"
import { Filters } from "../components/molecules/Filters.tsx"
import { browsers } from "../data/browsers.ts"
import { oses } from "../data/oses.ts"
import { useAppViewModel } from "./App.viewmodel.ts"
import { InteractiveKeyboard } from "./InteractiveKeyboard.tsx"

export const App = () => {
  const {
    customChords,
    pinnedCodes,
    setPinnedCodes,
    collisions,
    eventCodes,
    activeKeys,
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
            activeKeys={activeKeys}
            omittedBrowsers={omittedBrowsers}
            omittedOses={omittedOses}
          />
          <Attribution />
        </div>
        <CollisionDiscovery
          customChords={customChords}
          pinnedCodes={pinnedCodes}
          collisions={collisions}
          eventCodes={eventCodes}
          activeKeys={activeKeys}
        />
      </div>
    </div>
  )
}
