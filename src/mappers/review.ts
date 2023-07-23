import { formatDistanceToNow } from "date-fns";
import { ReviewWithBook } from "../types/review";

export function mapReviewForStartPage(review: ReviewWithBook) {
  return {
    id: review.id,
    rate: review.rate,
    description: review.description,
    createdAt: formatDistanceToNow(new Date(review.createdAt), { addSuffix: true }),
    user: {
      id: review.user.id,
      name: review.user.name,
      avatarUrl: review.user.avatarUrl
    },
    book: {
      id: review.book.id,
      name: review.book.name,
      coverUrl: review.book.coverUrl,
      author: review.book.author,
    }
  }
}
