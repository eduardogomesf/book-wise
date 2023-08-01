import { styled } from "../../styles";

export const ProfileContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: '$10'
})

export const ProfileHeader = styled("header", {
  display: "flex",
  justifyContent: 'flex-start',
  alignItems: 'center',

  button: {
    all: 'unset',
    boxSizing: 'border-box',

    cursor: 'pointer',

    padding: '$1 $2',

    backgroundColor: 'transparent',
    border: 'none',

    display: 'flex',
    alignItems: 'center',
    gap: '$3',

    color: '$gray200',
    fontSize: '$md',
    fontWeight: '$bold',
    lineHeight: '$base',

    svg: {
      color: '$gray200'
    },

    transition: 'background-color 0.2s ease-in-out',

    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
    },
  }
})

export const ProfileContent = styled("div", {
  display: "flex",
  alignItems: 'flex-start',
  gap: '4rem'
})

export const ProfileCenterContent = styled("div", {
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',

  width: '624px',
})

export const ReviewList = styled("div", {
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$6',

  marginTop: '$10',

  width: '100%',
})

export const ProfileRightContent = styled("div", {
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$8',

  width: '308px',

  borderLeft: '1px solid $gray700',
})

export const UserInfo = styled("div", {
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',

  '> strong': {
    display: 'block',
    marginTop: '$5',

    color: '$gray100',
    fontSize: '$md',
    fontWeight: '$bold',
    lineHeight: '$short',
  },

  '> span': {
    color: '$gray400',
    fontSize: '$sm',
    fontWeight: '$regular',
    lineHeight: '$base',
  }
})

export const Separator = styled("div", {
  height: '4px',
  width: '32px',
  borderRadius: '$full',

  background: '$gradient-horizontal',
})

export const UserReadingInfoList = styled("div", {
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '$10',
})

export const UserReadingInfoItem = styled("div", {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',

  svg: {
    color: '$green100'
  },

  div: {
    strong: {
      display: 'block',

      color: '$gray200',
      lineHeight: '$short',
      fontSize: '$md',
      fontWeight: '$bold',
    },

    span: {
      color: '$gray300',
      fontSize: '$sm',
      fontWeight: '$regular',
      lineHeight: '$base',
    }
  }
})


