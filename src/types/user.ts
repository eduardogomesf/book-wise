export type User = {
  id: string
  email: string
  name: string
  avatarUrl: string
}

export type UserProfile = {
  user: User & { createdAt: string }
  statistics: {
    mostReadCategory: string
    numberOfRatings: number
    numberOfPagesRead: number
    numberOfAuthorsRead: number
  }
}
