import { FC } from "react"

type Props = {
  event: KeyboardEvent | null
}
export const KeyboardEventChord: FC<Props> = ({ event }) => {
  if (!event)
    return (
      <p className={"text-gray-400"}>Press some keys to see what happpens.</p>
    )
  const modifiers = [
    { key: "ctrlKey", label: "Ctrl" },
    { key: "altKey", label: "Alt" },
    { key: "shiftKey", label: "Shift" },
    { key: "metaKey", label: "Meta" },
  ] as { key: keyof KeyboardEvent; label: string }[]
  const activeModifiers = modifiers
    .filter((modifierKey) => event[modifierKey.key])
    .map((modifierKey) => modifierKey.label)
  const key = (() => {
    if (
      event.key === "Control" ||
      event.key === "Alt" ||
      event.key === "Shift" ||
      event.key === "Meta"
    ) {
      return ""
    }

    const concatenator = activeModifiers.length ? " + " : ""

    return `${concatenator} ${event.key === " " ? "Space" : event.key}`
  })()

  const keyCombo =
    (activeModifiers.length ? activeModifiers.join(" + ") : "") + key

  return <h2 className={"text-3xl font-bold mb-4"}>{keyCombo}</h2>
}
