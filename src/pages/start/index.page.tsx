import { ChartLineUp, Star } from "phosphor-react";
import { Sidebar } from "../../components/Sidebar";
import { Content, Header, MainContent, ProfileInfo, RatingBox, RecentReviewItem, RecentReviewItemContent, RecentReviewItemHeader, RecentReviewsList, StartContainer } from "./styles";
import { Avatar } from "../../components/Avatar";
import { useSession } from "next-auth/react";
import { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import Image from "next/image";
import { ReviewWithBook } from "../../types/review";
import { formatDistanceToNow } from "date-fns";

export default function Start() {
  const { data: session } = useSession()

  function handleCoverImagePath(imageUrl: string) {
    return `${imageUrl.replace("public", "").replace(".jpg", ".png")}`
  }

  const { data: user } = useQuery<User | null>(['user', session?.user.id], async () => {
    if (!session) {
      return null
    }

    const getUserByIdResponse = await api.get(`/users/${session.user.id}`)

    return getUserByIdResponse.data
  })

  const { data: reviews } = useQuery<ReviewWithBook[] | []>(['reviews', session?.user.id], async () => {
    const getLatestReviewsResponse = await api.get(`/reviews/latest`)

    const rawReviews = getLatestReviewsResponse.data?.reviews

    const reviews: ReviewWithBook[] = rawReviews.map((rawReview: ReviewWithBook) => {
      return {
        id: rawReview.id,
        rate: rawReview.rate,
        description: rawReview.description,
        createdAt: formatDistanceToNow(new Date(rawReview.createdAt)),
        user: {
          id: rawReview.user.id,
          name: rawReview.user.name,
          avatarUrl: rawReview.user.avatarUrl
        },
        book: {
          id: rawReview.book.id,
          name: rawReview.book.name,
          coverUrl: handleCoverImagePath(rawReview.book.coverUrl),
        }
      }
    })

    return reviews
  })

  return (
    <StartContainer>
      <Sidebar user={user} />

      <MainContent>
        <Header>
          <ChartLineUp size={32} />
          <h1>
            Home
          </h1>
        </Header>

        <RecentReviewsList>
          <span>Latest reviews</span>

          {reviews?.map((review) => (
            <RecentReviewItem key={review.id}>
              <RecentReviewItemHeader>
                <ProfileInfo>
                  <Avatar src={review.user.avatarUrl} alt={"Profile picture"} width={32} height={32} />
                  <div>
                    <strong>{review.user.name}</strong>
                    <span>{String(review.createdAt)}</span>
                  </div>
                </ProfileInfo>
                <RatingBox>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} weight={(index + 1) <= review.rate ? "fill" : "regular"} />
                  ))}
                </RatingBox>
              </RecentReviewItemHeader>

              <RecentReviewItemContent>
                <Image src={review.book.coverUrl} alt={"Book cover"} quality={80} width={108} height={152} />
                <Content>
                  <div>
                    <strong>{review.book.name}</strong>
                    <span>{review.book.author}</span>
                  </div>
                  <p>{review.description}</p>
                </Content>
              </RecentReviewItemContent>
            </RecentReviewItem>
          ))}

        </RecentReviewsList>
      </MainContent>
    </StartContainer>
  )
}
