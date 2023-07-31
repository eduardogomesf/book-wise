import NextLink from 'next/link'

import { styled } from "../../styles";

export const SidebarContainer = styled('div', {
  padding: '$10 3rem $6',
  height: '96vh',
  width: '100%',
  maxWidth: '232px',
  borderRadius: '$md',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  background: `url(/sidebar-bg.png) no-repeat center center`,
})

export const Navbar = styled('nav', {
  marginTop: '4rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$1',
})

export const Link = styled(NextLink, {
  textDecoration: 'none',
  color: '$gray400',
  fontSize: '$md',

  width: '100%',
  padding: '0 $3',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$3',

  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    background: 'transparent',
    borderRadius: '$full',
  },

  '& + a': {
    marginTop: '$5',
  },

  '&:hover': {
    color: "$gray100",
    transition: 'color 0.2s ease-in-out',
  },

  variants: {
    active: {
      true: {
        color: "$gray100",

        '&::before': {
          background: '$colors$gradient-vertical',
        },
      }
    }
  }

})

export const SignInRedirectButton = styled('button', {
  all: 'unset',

  marginTop: 'auto',
  padding: '$1',
  borderRadius: '$md',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$3',

  fontSize: '$md',
  lineHeight: '$short',
  fontWeight: '$bold',
  color: '$gray200',

  cursor: 'pointer',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    transition: 'background-color 0.2s ease-in-out',
  },

  'svg': {
    color: '$green100'
  }
})

export const SignOutButton = styled('button', {
  all: 'unset',

  marginTop: 'auto',
  padding: '$1',
  borderRadius: '$md',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$3',

  fontSize: '$md',
  lineHeight: '$short',
  fontWeight: '$bold',
  color: '$gray200',

  cursor: 'pointer',

  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
  },

  'svg': {
    color: '#F75A68'
  }
})
