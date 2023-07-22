import { ChartLineUp, Star } from "phosphor-react";
import { Sidebar } from "../../components/Sidebar";
import { Content, Header, MainContent, ProfileInfo, RatingBox, RecentReviewItem, RecentReviewItemContent, RecentReviewItemHeader, RecentReviewsList, StartContainer } from "./styles";
import { Avatar } from "../../components/Avatar";
import { useSession } from "next-auth/react";
import { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import Image from "next/image";

export default function Start() {
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

      <MainContent>
        <Header>
          <ChartLineUp size={32} />
          <h1>
            Início
          </h1>
        </Header>

        <RecentReviewsList>
          <span>Latest reviews</span>

          <RecentReviewItem>
            <RecentReviewItemHeader>
              <ProfileInfo>
                <Avatar src={"https://avatars.githubusercontent.com/u/58858236?v=4"} alt={"Any"} width={32} height={32} />
                <div>
                  <strong>Jaxson Dias</strong>
                  <span>Ontem</span>
                </div>
              </ProfileInfo>
              <RatingBox>
                <Star size={16} weight={true ? "fill" : "regular"} />
                <Star size={16} weight={true ? "fill" : "regular"} />
                <Star size={16} weight={true ? "fill" : "regular"} />
                <Star size={16} weight={true ? "fill" : "regular"} />
                <Star size={16} weight={false ? "fill" : "regular"} />
              </RatingBox>
            </RecentReviewItemHeader>

            <RecentReviewItemContent>
              <Image src={"https://avatars.githubusercontent.com/u/58858236?v=4"} alt={"Any"} quality={100} width={108} height={152} />
              <Content>
                <div>
                  <strong>O Hobbit</strong>
                  <span>J.R.R. Tolkien</span>
                </div>
                <p>
                  Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh...
                </p>
              </Content>
            </RecentReviewItemContent>
          </RecentReviewItem>

        </RecentReviewsList>
      </MainContent>
    </StartContainer>
  )
}
