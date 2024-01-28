import { Dispatch, FC, SetStateAction } from "react"
import { Browser } from "../../types/Browser.ts"
import { Os } from "../../types/Os.ts"
import { ToggleButton } from "../atoms/ToggleButton.tsx"

type Props = {
  oses: readonly Os[]
  omittedOses: Os[]
  setOmittedOses: Dispatch<SetStateAction<Os[]>>
  browsers: readonly Browser[]
  omittedBrowsers: Browser[]
  setOmittedBrowsers: Dispatch<SetStateAction<Browser[]>>
}

export const Filters: FC<Props> = ({
  oses,
  omittedOses,
  setOmittedOses,
  browsers,
  omittedBrowsers,
  setOmittedBrowsers,
}) => {
  return (
    <div className={"mb-12"}>
      <div className={"mb-4"}>
        <p>OSes to include:</p>
        <div className={"flex gap-2"}>
          {oses.map((os) => (
            <ToggleButton
              key={os}
              isChecked={!omittedOses.includes(os)}
              onChange={() => {
                setOmittedOses((previousOmittedOses) => {
                  return previousOmittedOses.includes(os)
                    ? previousOmittedOses.filter(
                        (omittedOs) => os !== omittedOs
                      )
                    : [...previousOmittedOses, os]
                })
              }}
            >
              {os}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <p>Browsers to include:</p>
        <div className={"flex gap-2"}>
          {browsers.map((browser) => (
            <ToggleButton
              key={browser}
              isChecked={!omittedBrowsers.includes(browser)}
              onChange={() => {
                setOmittedBrowsers((previousOmittedBrowsers) => {
                  return previousOmittedBrowsers.includes(browser)
                    ? previousOmittedBrowsers.filter(
                        (omittedBrowser) => browser !== omittedBrowser
                      )
                    : [...previousOmittedBrowsers, browser]
                })
              }}
            >
              {browser}
            </ToggleButton>
          ))}
        </div>
      </div>
    </div>
  )
}
