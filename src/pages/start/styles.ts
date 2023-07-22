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

export const RecentReviewItem = styled('li', {
  padding: '$6',
  borderRadius: '$md',
  backgroundColor: '$gray700',

  height: '280px',
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8'
})

export const RecentReviewItemHeader = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
})

export const ProfileInfo = styled('div', {
  display: 'flex',
  gap: '$4',
  alignItems: 'flex-start',

  '> div': {
    strong: {
      display: 'block',
      color: '$gray100',
      fontSize: '$md',
    },

    span: {
      color: '$gray400',
      fontSize: '$sm',
    }
  }
})

export const RatingBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',

  svg: {
    color: '$purple100'
  }
})

export const RecentReviewItemContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$5'
})

export const Content = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  '> div': {
    strong: {
      display: 'block',
      color: '$gray100',
      fontSize: '$lg',
    },

    span: {
      color: '$gray400',
      fontSize: '$sm',
    }
  },

  '> p': {
    color: '$gray300',
    fontSize: '$sm',
  }

})

