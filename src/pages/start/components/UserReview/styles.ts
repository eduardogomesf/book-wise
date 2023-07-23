import { styled } from "../../../../styles"

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
