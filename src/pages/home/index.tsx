import Image from "next/image";
import { signIn } from 'next-auth/react'

import { Container, CoverImage, LoginBox, LoginButton } from "./styles";

import bookWiseCover from "../../assets/book-wise-cover.png";
import googleIcon from '../../assets/google-icon.svg'
import githubIcon from '../../assets/github-icon.svg'
import rocketLaunchIcon from '../../assets/rocket-launch-icon.svg'

export default function Home() {

  async function handleGithubSignIn() {
    await signIn('github')
  }

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
          <LoginButton type="button">
            <Image src={googleIcon} alt="Google Logo" width={32} height={32} />
            Sign in with Google
          </LoginButton>
          <LoginButton type="button" onClick={() => handleGithubSignIn()}>
            <Image src={githubIcon} alt="Github Logo" width={32} height={32} />
            Sign in with Github
          </LoginButton>
          <LoginButton type="button">
            <Image src={rocketLaunchIcon} alt="Rocket Launch Logo" width={32} height={32} />
            Access as a visitor
          </LoginButton>
        </div>
      </LoginBox>
    </Container>
  )
}
