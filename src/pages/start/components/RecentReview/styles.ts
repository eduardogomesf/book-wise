import { styled } from "../../../../styles"

export const RecentReviewContainer = styled('div', {
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

export const RecentReviewItemContent = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$5'
})

export const BookCoverContainer = styled('button', {
  all: 'unset',

  cursor: 'pointer',
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
