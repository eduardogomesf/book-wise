import Image from "next/image";
import { Navbar, SidebarContainer, Link, SignInRedirectButton, SignOutButton } from "./styles";

import logo from '../../assets/logo.png'
import { Binoculars, ChartLineUp, SignIn, SignOut, User as UserIcon } from "phosphor-react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "../Avatar";
import { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export function Sidebar() {
  const router = useRouter()
  const { data: session } = useSession()

  const currentRoute = router.pathname;

  const { data: user } = useQuery<User | null>(['user', session?.user.id], async () => {
    if (!session) {
      return null
    }

    const getUserByIdResponse = await api.get(`/users/${session.user.id}`)

    return getUserByIdResponse.data
  })

  async function handleSignInRedirect() {
    if (!session) {
      await router.push('/')
    }
  }

  function getFirstName(name: string) {
    const names = name.split(' ')
    return names[0]
  }

  async function handleSignOut() {
    if (session && session.user) {
      await signOut({ callbackUrl: '/' })
    }
  }

  return (
    <SidebarContainer>
      <Image src={logo} alt='Logo' quality={100} />

      <Navbar>
        <Link href={"/start"} active={currentRoute === '/start'}>
          <ChartLineUp width={24} height={24} />
          Home
        </Link>
        <Link href={"/explore"} active={currentRoute === '/explore'}>
          <Binoculars width={24} height={24} />
          Explore
        </Link>
        <Link href={"/profile"} active={currentRoute === '/profile'}>
          <UserIcon width={24} height={24} />
          Profile
        </Link>
      </Navbar>

      {user ? (
        <SignOutButton onClick={handleSignOut}>
          <Avatar src={String(user?.avatarUrl)} width={32} height={32} />
          {getFirstName(user.name)}
          <SignOut width={24} height={24} />
        </SignOutButton>
      ) : (
        <SignInRedirectButton onClick={handleSignInRedirect}>
          Sign in
          <SignIn width={24} height={24} />
        </SignInRedirectButton>
      )}
    </SidebarContainer>
  )
}
