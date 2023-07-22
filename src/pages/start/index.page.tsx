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
import { GetServerSideProps } from "next";

type StartProps = {
  latestReviews: ReviewWithBook[]
}

export default function Start({ latestReviews }: StartProps) {
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

          {latestReviews?.map((latestReview) => (
            <RecentReviewItem key={latestReview.id}>
              <RecentReviewItemHeader>
                <ProfileInfo>
                  <Avatar src={latestReview.user.avatarUrl} alt={"Profile picture"} width={32} height={32} />
                  <div>
                    <strong>{latestReview.user.name}</strong>
                    <span>{String(latestReview.createdAt)}</span>
                  </div>
                </ProfileInfo>
                <RatingBox>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} weight={(index + 1) <= latestReview.rate ? "fill" : "regular"} />
                  ))}
                </RatingBox>
              </RecentReviewItemHeader>

              <RecentReviewItemContent>
                <Image src={handleCoverImagePath(latestReview.book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />
                <Content>
                  <div>
                    <strong>{latestReview.book.name}</strong>
                    <span>{latestReview.book.author}</span>
                  </div>
                  <p>{latestReview.description}</p>
                </Content>
              </RecentReviewItemContent>
            </RecentReviewItem>
          ))}

        </RecentReviewsList>
      </MainContent>
    </StartContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (): Promise<any> => {
  const getLatestReviewsResponse = await api.get(`http://localhost:3000/api/reviews/latest`)

  const rawReviews = getLatestReviewsResponse.data?.reviews

  const latestReviews: ReviewWithBook[] = rawReviews.map((rawReview: ReviewWithBook) => {
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
        coverUrl: rawReview.book.coverUrl,
      }
    }
  })

  return {
    props: {
      latestReviews
    }
  }
}
