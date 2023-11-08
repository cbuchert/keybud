export const browsers = ["Chrome", "Firefox", "Safari", "Edge"] as const

export type Browser = (typeof browsers)[number]
