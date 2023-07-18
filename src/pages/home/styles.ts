import Image from "next/image";
import { styled } from "../../styles";

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '14.125rem',

  padding: '$5',
})

export const CoverImage = styled(Image, {
  height: 'calc(100vh - (2 * $5))',
})

export const LoginBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  strong: {
    fontSize: '$lg',
  },

  span: {
    color: '$gray200',
    fontSize: '$md'
  },

  div: {
    marginTop: '$10',

    display: 'flex',
    flexDirection: 'column',
    gap: '$4'
  }

})

export const LoginButton = styled('button', {
  all: 'unset',

  boxSizing: 'border-box',
  padding: '$5',
  width: '372px',
  fontSize: '$lg',

  backgroundColor: '$gray600',
  borderRadius: '$md',

  display: 'flex',
  alignItems: 'center',
  gap: '$5',

  cursor: 'pointer',
})
