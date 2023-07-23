import Image from "next/image"
import { Avatar } from "../../../../components/Avatar"
import { Rating } from "../../../../components/Rating"
import {
  BookCoverContainer,
  Content,
  ProfileInfo,
  RecentReviewContainer,
  RecentReviewItemContent,
  RecentReviewItemHeader
} from "./styles"

import { ReviewWithBook } from "../../../../types/review"
import { handleCoverImagePath } from "../../../../utils"
import { ElementType } from "react"

type RecentReviewItemProps = {
  review: ReviewWithBook
  as?: ElementType
}

export function RecentReview({ review, as = 'div' }: RecentReviewItemProps) {
  return (
    <RecentReviewContainer as={as}>
      <RecentReviewItemHeader>
        <ProfileInfo>
          <Avatar src={review.user.avatarUrl} width={32} height={32} />
          <div>
            <strong>{review.user.name}</strong>
            <span>{String(review.createdAt)}</span>
          </div>
        </ProfileInfo>
        <Rating rate={review.rate} />
      </RecentReviewItemHeader>

      <RecentReviewItemContent>
        <BookCoverContainer>
          <Image src={handleCoverImagePath(review.book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />
        </BookCoverContainer>
        <Content>
          <div>
            <strong>{review.book.name}</strong>
            <span>{review.book.author}</span>
          </div>
          <p>{review.description}</p>
        </Content>
      </RecentReviewItemContent>
    </RecentReviewContainer>
  )
}
