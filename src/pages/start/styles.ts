import Link from "next/link";
import { styled } from "../../styles";
import { Rating } from "../../components/Rating";

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

export const RecentReviewsList = styled('ul', {
  listStyle: 'none',

  display: 'flex',
  flexDirection: 'column',
  gap: '$3',

  width: '608px',
})


export const UserReviewContainer = styled('div', {
  width: '608px'
})

export const UserReviewLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const Label = styled('span', {
  color: '$gray100',
  fontSize: '$sm',
  lineHeight: '$base'
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

export const RightContent = styled('div', {
  width: '304px',
  maxWidth: '304px',
})

export const PopularBooksList = styled('div', {
  listStyle: 'none',

  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

export const PopularBooksLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  marginBottom: '$4',
})

export const PopularBookItem = styled('button', {
  all: 'unset',

  cursor: 'pointer',

  boxSizing: 'border-box',
  padding: '$5',
  borderRadius: '$md',
  border: '1px solid transparent',

  display: 'flex',
  gap: '$5',

  backgroundColor: '$gray700',

  '> div': {
    display: 'flex',
    flexDirection: 'column',

    '> strong': {
      color: '$gray100',
      fontsize: '$md',
      fontWeight: '$bold',
      lineHeight: '$short',
    },

    '> span': {
      color: '$gray400',
      fontSize: '$sm',
      lineHeight: '$base',
    },


    [`> div`]: {
      marginTop: 'auto'
    }
  },

  '&:hover': {
    border: '1px solid $gray500',
    transition: 'border-color 0.2s ease-in-out',

    transform: 'translateY(-2px)',
  }


})




