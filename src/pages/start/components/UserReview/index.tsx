import Image from "next/image";
import { Rating } from "../../../../components/Rating";
import { ReviewWithBook } from "../../../../types/review";
import { handleCoverImagePath } from "../../../../utils";
import { UserReviewItem, UserReviewContent } from "./styles";

type UserReviewProps = {
  review: ReviewWithBook
}

export function UserReview({ review }: UserReviewProps) {
  return (
    <UserReviewItem>
      <Image src={handleCoverImagePath(review.book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />

      <UserReviewContent>
        <div>
          <span>{String(review.createdAt)}</span>
          <Rating rate={review.rate} />
        </div>

        <strong>{review.book.name}</strong>
        <span>{review.book.author}</span>

        <p>{review.description}</p>
      </UserReviewContent>
    </UserReviewItem>
  )
}
