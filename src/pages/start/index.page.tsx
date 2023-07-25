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
  Label,
  Main,
  PopularBookItem,
  PopularBooksLabelContainer,
  PopularBooksList,
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
import Image from "next/image";
import { Rating } from "../../components/Rating";
import { handleCoverImagePath } from "../../utils";

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

  const books = latestReviews.map((review) => review.book).slice(0, 5)

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
                  <Label>Your last review</Label>

                  <RedirectButton href={""}>
                    See all
                    <CaretRight size={16} />
                  </RedirectButton>
                </UserReviewLabelContainer>

                <UserReview review={userLastReview} />
              </UserReviewContainer>
            )}


            <RecentReviewsList>
              <Label>Latest reviews</Label>
              {latestReviews?.map((latestReview) => (
                <RecentReview review={latestReview} key={latestReview.id} as="li" />
              ))}
            </RecentReviewsList>
          </CenterContent>

          <RightContent>
            <PopularBooksList>
              <PopularBooksLabelContainer>
                <Label>Popular books</Label>

                <RedirectButton href={""}>
                  See all
                  <CaretRight size={16} />
                </RedirectButton>
              </PopularBooksLabelContainer>

              {books && books.map((book) => (
                <PopularBookItem key={book.id}>
                  <Image src={handleCoverImagePath(book.coverUrl)} alt={"Book cover"} quality={80} width={64} height={94} />
                  <div>
                    <strong>{book.name}</strong>
                    <span>{book.author}</span>

                    <div>
                      <Rating rate={4} />
                    </div>
                  </div>
                </PopularBookItem>
              ))}
            </PopularBooksList>
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
