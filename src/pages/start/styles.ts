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
