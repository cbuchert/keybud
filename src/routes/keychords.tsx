import { createFileRoute } from "@tanstack/react-router"
import { KeyChords } from "../presentation/pages/KeyChords.tsx"

export const Route = createFileRoute("/keychords")({
  component: KeyChords,
})
