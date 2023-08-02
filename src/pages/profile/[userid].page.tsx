import { ReactElement, useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { BookOpen, BookmarkSimple, Books, CaretLeft, UserList } from "phosphor-react"
import { useRouter } from "next/router"

import { DefaultLayout } from "../../layouts/default"
import { ProfileCenterContent, ProfileContainer, ProfileContent, ProfileHeader, ProfileRightContent, ReviewList, Separator, UserInfo, UserReadingInfoItem, UserReadingInfoList } from "./styles"
import { TextInput } from "../../components/TextInput"
import { ReviewItem } from "./components/ReviewItem"
import { Avatar } from "../../components/Avatar"

import { api } from "../../lib/axios"
import { ReviewWithBook } from "../../types/review"
import { UserProfile } from "../../types/user"
import { format } from "date-fns"

type ProfileParams = {
  reviews: ReviewWithBook[]
  userProfile: UserProfile
}

export default function Profile({ reviews = [], userProfile }: ProfileParams) {
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
            <Avatar src={userProfile.user.avatarUrl} width={72} height={72} />
            <strong>{userProfile.user.name}</strong>
            <span>Member since {format(new Date(userProfile.user.createdAt), 'MMMM, yyyy')}</span>
          </UserInfo>

          <Separator />

          <UserReadingInfoList>
            <UserReadingInfoItem>
              <BookOpen size={32} />
              <div>
                <strong>{userProfile.statistics.numberOfPagesRead}</strong>
                <span>Pages read</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <Books size={32} />
              <div>
                <strong>{userProfile.statistics.numberOfRatings}</strong>
                <span>Rated books</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <UserList size={32} />
              <div>
                <strong>{userProfile.statistics.numberOfAuthorsRead}</strong>
                <span>Authors read</span>
              </div>
            </UserReadingInfoItem>

            <UserReadingInfoItem>
              <BookmarkSimple size={32} />
              <div>
                <strong>{userProfile.statistics.mostReadCategory}</strong>
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

  const [userReviews, userProfile] = await Promise.all([
    getUserReviews(String(userId)),
    getUserProfileInfo(String(userId))
  ])

  return {
    props: {
      reviews: userReviews,
      userProfile
    }
  }
}

const getUserProfileInfo = async (userId: string) => {
  const response = await api.get(`http://localhost:3000/api/users/${userId}/profile`)
  return response.data
}

const getUserReviews = async (userId: string) => {
  const response = await api.get(`http://localhost:3000/api/users/${userId}/reviews`)
  return response.data.reviews
}
