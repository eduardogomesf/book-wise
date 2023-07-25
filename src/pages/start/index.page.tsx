import { CaretRight, ChartLineUp } from "phosphor-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { Sidebar } from "../../components/Sidebar";
import {
  CenterContent,
  ContentContainer,
  Header,
  Main,
  RecentReviewsList,
  RedirectButton,
  RightContent,
  StartContainer,
  UserReviewContainer,
  UserReviewLabelContainer
} from "./styles";

import { User } from "../../types/user";
import { api } from "../../lib/axios";
import { ReviewWithBook } from "../../types/review";
import { authOptions } from "../api/auth/[...nextauth].api";
import { mapReviewForStartPage } from "../../mappers/review";
import { RecentReview } from "./components/RecentReview";
import { UserReview } from "./components/UserReview";

type StartProps = {
  latestReviews: ReviewWithBook[]
  userLastReview: ReviewWithBook
}

export default function Start({ latestReviews, userLastReview }: StartProps) {
  const { data: session } = useSession()

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

      <Main>
        <Header>
          <ChartLineUp size={32} />
          <h1>
            Start
          </h1>
        </Header>

        <ContentContainer>
          <CenterContent>
            {session && userLastReview && (
              <UserReviewContainer>
                <UserReviewLabelContainer>
                  <span>Your last review</span>

                  <RedirectButton href={""}>
                    See all
                    <CaretRight size={16} />
                  </RedirectButton>
                </UserReviewLabelContainer>

                <UserReview review={userLastReview} />
              </UserReviewContainer>
            )}


            <RecentReviewsList>
              <span>Latest reviews</span>
              {latestReviews?.map((latestReview) => (
                <RecentReview review={latestReview} key={latestReview.id} as="li" />
              ))}
            </RecentReviewsList>
          </CenterContent>

          <RightContent>
          </RightContent>
        </ContentContainer>


      </Main>
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
