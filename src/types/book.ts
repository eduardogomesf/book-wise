export type Book = {
  id: string
  name: string
  author: string
  coverUrl: string
  numberOfRatings?: number
  rate?: number
}

export type BookWithUserRating = Book & {
  alreadyRead: boolean
}
