import { ReactElement, useState } from "react"
import { Binoculars } from "phosphor-react"
import { GetServerSideProps } from "next"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { debounce } from 'lodash'

import { BookCard, BooksContainer, ExplorerContainer, Header, ReadStamp, Tag, TagsContainer, TitleContainer } from "./styles"
import { DefaultLayout } from "../../layouts/default"
import { Rating } from "../../components/Rating"

import { api } from "../../lib/axios"
import { Category } from "../../types/category"
import { BookWithUserRating } from "../../types/book"
import { handleCoverImagePath } from "../../utils"
import { TextInput } from "../../components/TextInput"

type ExploreProps = {
  categories: Category[]
}

const updateStateUsingDebounceTechnique = debounce((value: string, setState: (value: any) => void) => {
  setState(value)
}, 500)
export default function Explore({ categories = [] }: ExploreProps) {
  const [valueInInput, setValueInInput] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { data: session } = useSession()

  function handleSelectCategory(categoryId: string) {
    const categoryIsAlreadySelected = selectedCategories.includes(categoryId)
    const numberOfSelectedCategories = selectedCategories.length

    if (categoryIsAlreadySelected) {
      if (numberOfSelectedCategories === 1) {
        setSelectedCategories([])
        return
      }

      setSelectedCategories(selectedCategories.filter(category => category !== categoryId))
    } else {
      const oldCategories = [...selectedCategories]
      setSelectedCategories([...oldCategories, categoryId])
    }
  }

  const { data: books = [] } = useQuery<BookWithUserRating[] | []>(['books', search, selectedCategories], async () => {

    const getBooksResponse = await api.get(`/books`, {
      params: {
        userId: session?.user.id,
        search,
        category: String(selectedCategories)
      }
    })

    return getBooksResponse.data.books
  })

  function resetCategories() {
    setSelectedCategories([])
  }

  function handleChangeText(event: any) {
    const value = event.target.value

    setValueInInput(value)

    updateStateUsingDebounceTechnique(value, setSearch)
  }

  return (
    <ExplorerContainer>
      <Header>
        <TitleContainer>
          <Binoculars size={32} />
          <h1>Explore</h1>
        </TitleContainer>

        <TextInput
          placeholder="Search for actor or book"
          value={valueInInput}
          handleChangeText={event => handleChangeText(event)}
          size={"md"}
        />
      </Header>

      <TagsContainer>
        <Tag
          selected={selectedCategories.length === 0}
          onClick={() => resetCategories()}
        >
          All
        </Tag>

        {categories.map(category => (
          <Tag
            key={category.id}
            onClick={() => handleSelectCategory(category.id)}
            selected={selectedCategories.includes(category.id)}
          >
            {category.name}
          </Tag>
        ))}
      </TagsContainer>

      <BooksContainer>
        {books?.map(book => (
          <BookCard key={book.id}>
            <Image src={handleCoverImagePath(book.coverUrl)} alt={"Book cover"} quality={80} width={108} height={152} />
            <div>
              <div>
                <strong>{book.name}</strong>
                <span>{book.author}</span>
              </div>
              <Rating rate={book.rate!} />
            </div>

            {book.alreadyRead && <ReadStamp>Read</ReadStamp>}
          </BookCard>
        ))}
      </BooksContainer>
    </ExplorerContainer>
  )
}

Explore.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const getCategoriesResponse = await api.get("http://localhost:3000/api/categories")

  const categories = getCategoriesResponse.data.categories

  return {
    props: {
      categories
    }
  }
}
