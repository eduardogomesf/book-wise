import { styled } from "../../styles";

export const ExplorerContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

})

export const TitleContainer = styled('div', {
  display: 'flex',
  gap: '$3',
  alignItems: 'center',

  svg: {
    color: '$green100'
  },

  h1: {
    fontSize: '$2xl',
    fontWeight: '$bold',
    lineHeight: '$short',
    color: '$gray100',
  }

})

export const InputContainer = styled('div', {
  width: '27.063rem',
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
  }

})

export const TagsContainer = styled('div', {
  marginTop: '$10',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '$3',
  flexWrap: 'wrap',
})

export const Tag = styled('button', {
  all: 'unset',

  boxSizing: 'border-box',

  cursor: 'pointer',

  border: '1px solid $purple100',
  borderRadius: '$full',

  padding: '$1 $4',

  fontSize: '$md',
  fontWeight: '$regular',
  lineHeight: '$base',

  variants: {
    selected: {
      true: {
        backgroundColor: '$purple200',
        color: '$gray100',
        borderColor: '$purple200',
      },
      false: {
        backgroundColor: '$transparent',
        color: '$purple100',
      }
    }
  },

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '$purple200',
    color: '$gray100',
  }

})

export const BooksContainer = styled('div', {
  marginTop: '3rem',

  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '$5'
})

export const BookCard = styled('button', {
  all: 'unset',

  boxSizing: 'border-box',

  cursor: 'pointer',

  display: 'flex',
  gap: '$5',

  backgroundColor: '$gray700',

  borderRadius: '$md',
  padding: '$5 $4',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    '> div': {
      strong: {
        display: 'block',
        color: '$gray100',
        fontSize: '$md',
        fontWeight: '$bold',
        lineHeight: '$short',
      },

      span: {
        color: '$gray400',
        fontSize: '$sm',
        fontWeight: '$regular',
        lineHeight: '$base',
      }
    }
  }

})
