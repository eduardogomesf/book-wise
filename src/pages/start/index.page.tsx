import { CaretRight, ChartLineUp } from "phosphor-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import {
  CenterContent,
  ContentContainer,
  Header,
  Label,
  PopularBookItem,
  PopularBooksLabelContainer,
  PopularBooksList,
  RecentReviewsList,
  RedirectButton,
  RightContent,
  UserReviewContainer,
  UserReviewLabelContainer
} from "./styles";

import { api } from "../../lib/axios";
import { ReviewWithBook } from "../../types/review";
import { authOptions } from "../api/auth/[...nextauth].api";
import { mapReviewForStartPage } from "../../mappers/review";
import { RecentReview } from "./components/RecentReview";
import { UserReview } from "./components/UserReview";
import Image from "next/image";
import { Rating } from "../../components/Rating";
import { handleCoverImagePath } from "../../utils";
import { Book } from "../../types/book";
import { DefaultLayout } from "../../layouts/default";
import { ReactElement } from "react";

type StartProps = {
  latestReviews: ReviewWithBook[]
  userLastReview: ReviewWithBook
  popularBooks: Book[]
}

export default function Start({ latestReviews = [], userLastReview, popularBooks = [] }: StartProps) {
  const { data: session } = useSession()

  return (
    <>
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

            {popularBooks && popularBooks.map((book) => (
              <PopularBookItem key={book.id}>
                <Image src={handleCoverImagePath(book.coverUrl)} alt={"Book cover"} quality={80} width={64} height={94} />
                <div>
                  <strong>{book.name}</strong>
                  <span>{book.author}</span>

                  <div>
                    <Rating rate={book.rate ?? 0} />
                  </div>
                </div>
              </PopularBookItem>
            ))}
          </PopularBooksList>
        </RightContent>
      </ContentContainer>

    </>
  )
}

Start.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }): Promise<any> => {
  const session = await getServerSession(req, res, authOptions)

  const userId = session?.user?.id ?? null

  let userLastReview = null

  if (userId) {
    userLastReview = await getUserLatestReview(userId)
  }

  const [
    latestReviews,
    popularBooks
  ] = await Promise.all([
    getLatestReviews(userId),
    getPopularBooks()
  ])

  return {
    props: {
      latestReviews,
      userLastReview,
      popularBooks
    }
  }
}

const getLatestReviews = async (userId: string | null | number) => {
  const getLatestReviewsResponse = await api.get(`http://localhost:3000/api/reviews/latest`, {
    params: {
      userId
    }
  })
  const rawReviews = getLatestReviewsResponse.data?.reviews

  const latestReviews: ReviewWithBook[] = rawReviews.map((rawReview: ReviewWithBook) => mapReviewForStartPage(rawReview))
  return latestReviews
}

const getUserLatestReview = async (userId: string | number) => {
  const userLastReviewResponse = await api.get(`http://localhost:3000/api/users/${userId}/reviews/last`)

  const rawUserLastReview = userLastReviewResponse.data?.lastReview

  if (!rawUserLastReview) {
    return null
  }

  return mapReviewForStartPage(rawUserLastReview)
}

const getPopularBooks = async () => {
  const response = await api.get(`http://localhost:3000/api/books/popular`)
  return response.data.books
}
