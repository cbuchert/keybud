import { createRootRoute, Outlet } from "@tanstack/react-router"
import { Attribution } from "../components/atoms/Attribution.tsx"
import { PageTitle } from "../components/atoms/PageTitle.tsx"

export const Route = createRootRoute({
  component: () => (
    <div className={"flex flex-col gap-12 lg:gap-0 mx-8"}>
      <PageTitle />
      <Outlet />
      <Attribution />
    </div>
  ),
})
