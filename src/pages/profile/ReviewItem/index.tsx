import Image from "next/image"
import { Rating } from "../../../components/Rating"
import { ReviewWithBook } from "../../../types/review"
import { ReviewItemContainer, ReviewItemContent } from "./styles"
import { formatDistanceToNow } from "date-fns"
import { handleCoverImagePath } from "../../../utils"

type ReviewItemProps = {
  review: ReviewWithBook
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <ReviewItemContainer>
      <span>{formatDistanceToNow(new Date(review.createdAt))}</span>
      <ReviewItemContent>
        <div>
          <Image src={handleCoverImagePath(review.book.coverUrl)} alt="Book cover" width={98} height={134} />
          <div>
            <strong>{review.book.name}</strong>
            <span>{review.book.author}</span>
            <Rating rate={review.rate} />
          </div>
        </div>
        <p>{review.description}</p>
      </ReviewItemContent>
    </ReviewItemContainer>
  )
}
