import { CaretRight, ChartLineUp } from "phosphor-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { Sidebar } from "../../components/Sidebar";
import { Avatar } from "../../components/Avatar";
import {
  BookCoverContainer,
  Content, Header,
  MainContent,
  ProfileInfo,
  RecentReviewItem,
  RecentReviewItemContent,
  RecentReviewItemHeader,
  RecentReviewsList,
  RedirectButton,
  StartContainer,
  UserReviewContainer,
  UserReviewContent,
  UserReviewItem,
  UserReviewLabelContainer
} from "./styles";

import { User } from "../../types/user";
import { api } from "../../lib/axios";
import { ReviewWithBook } from "../../types/review";
import { authOptions } from "../api/auth/[...nextauth].api";
import { mapReviewForStartPage } from "../../mappers/review";
import { Rating } from "../../components/Rating";

type StartProps = {
  latestReviews: ReviewWithBook[]
  userLastReview: ReviewWithBook
}

export default function Start({ latestReviews, userLastReview }: StartProps) {
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

  console.log(userLastReview)
  return (
    <StartContainer>
      <Sidebar user={user} />

      <MainContent>
        <Header>
          <ChartLineUp size={32} />
          <h1>
            Start
          </h1>
        </Header>

        {session && userLastReview && (
          <UserReviewContainer>
            <UserReviewLabelContainer>
              <span>Your last review</span>

              <RedirectButton href={""}>
                See all
                <CaretRight size={16} />
              </RedirectButton>
            </UserReviewLabelContainer>

            <UserReviewItem>
              <Image src={handleCoverImagePath(userLastReview.book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />

              <UserReviewContent>
                <div>
                  <span>{String(userLastReview.createdAt)}</span>
                  <Rating rate={userLastReview.rate} />
                </div>

                <strong>{userLastReview.book.name}</strong>
                <span>{userLastReview.book.author}</span>

                <p>{userLastReview.description}</p>
              </UserReviewContent>
            </UserReviewItem>
          </UserReviewContainer>
        )}


        <RecentReviewsList>
          <span>Latest reviews</span>

          {latestReviews?.map((latestReview) => (
            <RecentReviewItem key={latestReview.id}>
              <RecentReviewItemHeader>
                <ProfileInfo>
                  <Avatar src={latestReview.user.avatarUrl} width={32} height={32} />
                  <div>
                    <strong>{latestReview.user.name}</strong>
                    <span>{String(latestReview.createdAt)}</span>
                  </div>
                </ProfileInfo>
                <Rating rate={latestReview.rate} />
              </RecentReviewItemHeader>

              <RecentReviewItemContent>
                <BookCoverContainer>
                  <Image src={handleCoverImagePath(latestReview.book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />
                </BookCoverContainer>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }): Promise<any> => {
  const session = await getServerSession(req, res, authOptions)

  const userId = session?.user?.id ?? null

  const getLatestReviewsResponse = await api.get(`http://localhost:3000/api/reviews/latest`, {
    params: {
      userId
    }
  })

  let userLastReview = null

  if (userId) {
    const userLastReviewResponse = await api.get(`http://localhost:3000/api/users/${userId}/reviews/last`)

    const rawUserLastReview = userLastReviewResponse.data?.lastReview

    if (rawUserLastReview) {
      userLastReview = mapReviewForStartPage(rawUserLastReview)
    }
  }

  const rawReviews = getLatestReviewsResponse.data?.reviews
  const latestReviews: ReviewWithBook[] = rawReviews.map((rawReview: ReviewWithBook) => mapReviewForStartPage(rawReview))

  return {
    props: {
      latestReviews,
      userLastReview
    }
  }
}
