export type ReviewWithBook = {
  id: string;
  rate: number
  description: string
  createdAt: Date | string
  book: {
    id: string
    name: string
    author: string
    coverUrl: string
  }
  user: {
    id: string
    avatarUrl: string
    name: string
  }
}
