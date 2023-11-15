import { FC } from "react"

export const Attribution: FC = () => {
  return (
    <section className={"text-gray-400 text-xs mt-20"}>
      <p>
        Made with
        <span role={"img"} aria-label={"love"}>
          {" "}
          ❤️{" "}
        </span>
        by Chris Buchert
      </p>
      <p className={"mb-4"}>
        <a href={"https://christianbuchert.com"} target={"_blank"}>
          christianbuchert.com
        </a>
      </p>
      <p className={"mb-4"}>
        Many thanks to Lightspeed DMS for sponsoring this project
      </p>
      <p>
        <a href={"https://github.com/cbuchert/keybud"} target={"_blank"}>
          MIT Licensed and available on Github
        </a>
      </p>
    </section>
  )
}
