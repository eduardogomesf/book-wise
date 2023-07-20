import Image from "next/image";
import { Navbar, SidebarContainer, Link, SignInRedirectButton } from "./styles";

import logo from '../../assets/logo.png'
import { Binoculars, ChartLineUp, SignIn, User } from "phosphor-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const router = useRouter()
  const { data: session } = useSession()

  const currentRoute = router.pathname;

  return (
    <SidebarContainer>
      <Image src={logo} alt='Logo' quality={100} />

      <Navbar>
        <Link href={"/books"} active={currentRoute === '/books'}>
          <ChartLineUp width={24} height={24} />
          Home
        </Link>
        <Link href={"/explore"} active={currentRoute === '/explore'}>
          <Binoculars width={24} height={24} />
          Explore
        </Link>
        <Link href={"/profile"} active={currentRoute === '/profile'}>
          <User width={24} height={24} />
          Profile
        </Link>
      </Navbar>

      {session ? (
        <SignInRedirectButton>
          Sign In
          <SignIn width={24} height={24} />
        </SignInRedirectButton>
      ) : (<> </>)}
    </SidebarContainer>
  )
}
