import { styled } from "../../styles";

export const InputContainer = styled('div', {
  padding: '$4 $5',

  backgroundColor: 'none',
  border: '1px solid $gray500',
  borderRadius: '$sm',

  display: "flex",
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',

  input: {
    backgroundColor: 'transparent',

    border: 'none',
    width: '100%',

    fontSize: '$sm',
    fontWeight: '$regular',
    color: '$green100',

    '&::placeholder': {
      color: '$gray400',
    },

    '&:focus': {
      outline: 'none',
    }
  },

  svg: {
    color: '$gray500',
  },

  '&:focus-within': {
    borderColor: '$green200',

    svg: {
      color: '$green200',
    }
  },

  variants: {
    size: {
      md: {
        width: '27.063rem',
      },
      lg: {
        width: '100%',
      }
    }
  }

})
