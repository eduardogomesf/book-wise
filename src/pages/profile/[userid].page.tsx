import { ReactElement, useEffect, useState } from "react"
import { DefaultLayout } from "../../layouts/default"
import { ProfileCenterContent, ProfileContainer, ProfileContent, ProfileHeader, ProfileRightContent, ReviewList, Separator, UserInfo, UserReadingInfoItem, UserReadingInfoList } from "./styles"
import { BookOpen, BookmarkSimple, Books, CaretLeft, UserList } from "phosphor-react"
import { useRouter } from "next/router"
import { TextInput } from "../../components/TextInput"
import { GetServerSideProps } from "next"
import { api } from "../../lib/axios"
import { ReviewWithBook } from "../../types/review"
import { ReviewItem } from "./components/ReviewItem"
import { Avatar } from "../../components/Avatar"

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
          <UserInfo>
            <Avatar src="https://avatars.githubusercontent.com/u/58858236?v=4" width={72} height={72} />
            <strong>Eduardo Gomes</strong>
            <span>Member since 2019</span>
          </UserInfo>

          <Separator />

          <UserReadingInfoList>
            <UserReadingInfoItem>
              <BookOpen size={32} />
              <div>
                <strong>3600</strong>
                <span>Pages read</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <Books size={32} />
              <div>
                <strong>10</strong>
                <span>Rated books</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <UserList size={32} />
              <div>
                <strong>6</strong>
                <span>Authors read</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <BookmarkSimple size={32} />
              <div>
                <strong>Computing</strong>
                <span>Most read category</span>
              </div>
            </UserReadingInfoItem>

          </UserReadingInfoList>
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
