export const oses = ["Windows", "Mac OS", "Linux"] as const

export type Os = (typeof oses)[number]
