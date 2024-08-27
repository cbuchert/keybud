/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as KeychordsImport } from './routes/keychords'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const KeychordsRoute = KeychordsImport.update({
  path: '/keychords',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/keychords': {
      id: '/keychords'
      path: '/keychords'
      fullPath: '/keychords'
      preLoaderRoute: typeof KeychordsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, KeychordsRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/keychords"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/keychords": {
      "filePath": "keychords.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
