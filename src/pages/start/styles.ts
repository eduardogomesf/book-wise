import Link from "next/link";
import { styled } from "../../styles";

export const StartContainer = styled('div', {
  margin: '$5',

  display: 'flex'
})

export const Main = styled('main', {
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

export const ContentContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '4rem'
})

export const CenterContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const RightContent = styled('div', {})

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



