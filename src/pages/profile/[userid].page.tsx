import { ReactElement, useEffect, useState } from "react"
import { DefaultLayout } from "../../layouts/default"
import { ProfileCenterContent, ProfileContainer, ProfileContent, ProfileHeader, ProfileRightContent, ReviewList } from "./styles"
import { CaretLeft } from "phosphor-react"
import { useRouter } from "next/router"
import { TextInput } from "../../components/TextInput"
import { GetServerSideProps } from "next"
import { api } from "../../lib/axios"
import { ReviewWithBook } from "../../types/review"
import { ReviewItem } from "./components/ReviewItem"

type ProfileParams = {
  reviews: ReviewWithBook[]
}

export default function Profile({ reviews = [] }: ProfileParams) {
  const [userReviews, setUserReviews] = useState<ReviewWithBook[]>(reviews)
  const [search, setSearch] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (!search) {
      setUserReviews(reviews)
    }

    const filteredReviews = reviews.filter(review => {
      return review.book.name.toLowerCase().includes(search.toLowerCase())
    })

    setUserReviews(filteredReviews)
  }, [reviews, search])

  return (
    <ProfileContainer>
      <ProfileHeader>
        <button onClick={() => router.back()}>
          <CaretLeft size={20} />
          Voltar
        </button>
      </ProfileHeader>

      <ProfileContent>
        <ProfileCenterContent>
          <TextInput
            value={search}
            handleChangeText={event => setSearch(event.target.value)}
            placeholder="Search for book"
            size="lg"
          />

          <ReviewList>
            {userReviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ReviewList>
        </ProfileCenterContent>

        <ProfileRightContent>
          <span>Right content</span>
        </ProfileRightContent>
      </ProfileContent>
    </ProfileContainer>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context?.params?.userid

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const [userReviews] = await Promise.all([
    getUserReviews(String(userId))
  ])

  return {
    props: {
      reviews: userReviews
    }
  }
}

const getUserReviews = async (userId: string) => {
  const response = await api.get(`http://localhost:3000/api/users/${userId}/reviews`)
  return response.data.reviews
}
