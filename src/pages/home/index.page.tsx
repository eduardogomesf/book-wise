import Image from "next/image";
import { signIn, useSession } from 'next-auth/react'

import { Container, CoverImage, LoginBox, LoginButton } from "./styles";

import bookWiseCover from "../../assets/book-wise-cover.png";
import googleIcon from '../../assets/google-icon.svg'
import githubIcon from '../../assets/github-icon.svg'
import rocketLaunchIcon from '../../assets/rocket-launch-icon.svg'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth].api";

export default function Home() {

  const { data: session } = useSession()

  const router = useRouter()

  async function handleGithubSignIn() {
    await signIn('github')
  }

  async function handleAccessAsVisitor() {
    await router.push('/start')
  }

  useEffect(() => {
    if (session?.user) {
      //router.push('/start')
    }
  }, [session, router])

  return (
    <Container>
      <CoverImage
        src={bookWiseCover}
        quality={100}
        priority
        alt="Cover"
      />
      <LoginBox>
        <strong>Welcome!</strong>
        <span>Sign in or access as a visitor.</span>

        <div>
          <LoginButton type="button" onClick={() => handleGithubSignIn()}>
            <Image src={githubIcon} alt="Github Logo" width={32} height={32} />
            Sign in with Github
          </LoginButton>
          <LoginButton type="button" onClick={handleAccessAsVisitor}>
            <Image src={rocketLaunchIcon} alt="Rocket Launch Logo" width={32} height={32} />
            Access as a visitor
          </LoginButton>
        </div>
      </LoginBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }): Promise<any> => {
  const session = await getServerSession(req, res, authOptions)

  if (session?.user) {
    return {
      redirect: {
        destination: '/start',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
