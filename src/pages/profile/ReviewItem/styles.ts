import { styled } from "../../../styles"

export const ReviewItemContainer = styled("div", {
  width: '100%',

  span: {
    color: '$gray300',
    fontSize: '$sm',
    lineHeight: '$base',
  },

})

export const ReviewItemContent = styled('div', {
  marginTop: '$2',
  padding: '$6',

  backgroundColor: '$gray700',
  borderRadius: '$md',

  '> div': {
    display: 'flex',
    gap: '$6',

    '> div': {
      display: 'flex',
      flexDirection: 'column',

      '> strong': {
        color: '$gray100',
        fontSize: '$lg',
        fontWeight: '$bold',
        lineHeight: '$short',
      },

      '> span': {
        color: '$gray400',
        fontSize: '$sm',
        fontWeight: '$regular',
        lineHeight: '$base',
        marginBottom: 'auto',
      },
    }
  },


  p: {
    marginTop: '$6',
    color: '$gray300',
    fontSize: '$sm',
    lineHeight: '$base',
  }
})
