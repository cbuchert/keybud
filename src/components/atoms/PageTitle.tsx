import { FC } from "react"

export const PageTitle: FC = () => {
  return (
    <header className={"mb-20 mt-8"}>
      <h1 className={"text-6xl mb-2 font-extrabold text-slate-700"}>Keybud</h1>
      <h2 className={"text-2xl mb-4 text-gray-400 font-light italic"}>
        Let's not ignorantly clobber your user's existing keyboard shortcuts,
        together.
      </h2>
      <p>
        Read the{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent"
          className={
            "text-blue-600 hover:text-blue-700 active:text-blue-500 transition-colors"
          }
        >
          KeyboardEvent
        </a>{" "}
        docs on MDN
      </p>
    </header>
  )
}
