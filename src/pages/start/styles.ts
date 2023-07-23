import Link from "next/link";
import { styled } from "../../styles";

export const StartContainer = styled('div', {
  margin: '$5',

  display: 'flex'
})

export const MainContent = styled('main', {
  marginLeft: '6rem',
  marginTop: '3.125rem',

  display: 'flex',
  flexDirection: 'column',
  gap: '$10'
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  svg: {
    color: '$green100'
  },

  h1: {
    color: '$gray100',
    fontSize: '$lg',
    fontWeight: '$bold'
  }
})

export const RecentReviewsList = styled('ul', {
  listStyle: 'none',

  display: 'flex',
  flexDirection: 'column',
  gap: '$3',

  width: '608px',

  '> span': {
    color: '$gray100',
    fontSize: '$sm',
  }
})


export const UserReviewContainer = styled('div', {
  width: '608px'
})

export const UserReviewLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  span: {
    color: '$gray100',
    fontSize: '$sm',
    lineHeight: '$base'
  },

})

export const RedirectButton = styled(Link, {
  all: 'unset',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  color: '$purple100',
  fontSize: '$sm',
  fontWeight: '$bold',
  lineHeight: '$base',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    transition: 'background-color 0.2s ease-in-out',
  },
})

export const UserReviewItem = styled('button', {
  all: 'unset',

  cursor: 'pointer',

  boxSizing: 'border-box',
  marginTop: '$4',
  padding: '$6 $5',
  width: '100%',

  backgroundColor: '$gray600',
  borderRadius: '$md',

  display: 'flex',
  gap: '$6',
})

export const UserReviewContent = styled('div', {
  flex: 1,

  overflow: 'hidden',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '> span': {
      color: '$gray300',
      fontSize: '$sm',
      lineHeight: '$base'
    }
  },

  '> strong': {
    display: 'block',
    marginTop: '$3',

    color: '$gray100',
    lineHeight: '$short',
    fontSize: '$md',
    fontWeight: '$bold',
  },

  '> span': {
    display: 'block',

    color: '$gray400',
    lineHeight: '$base',
    fontSize: '$sm',
    fontWeight: '$regular',
  },

  '> p': {
    marginTop: '$6',

    color: '$gray300',
    lineHeight: '$base',
    fontSize: '$sm',
    fontWeight: '$regular',
  }
})

