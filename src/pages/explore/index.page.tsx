import { ReactElement, useEffect, useState } from "react"
import { DefaultLayout } from "../../layouts/default"
import { BookCard, BooksContainer, ExplorerContainer, Header, InputContainer, Tag, TagsContainer, TitleContainer } from "./styles"
import { Binoculars, MagnifyingGlass } from "phosphor-react"
import { GetServerSideProps } from "next"
import { Category } from "../../types/category"
import { api } from "../../lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Book } from "../../types/book"
import Image from "next/image"
import { handleCoverImagePath } from "../../utils"
import { Rating } from "../../components/Rating"

type ExploreProps = {
  categories: Category[]
}
export default function Explore({ categories = [] }: ExploreProps) {
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])

  function handleSelectCategory(categoryId: string) {
    const categoryIsAlreadySelected = selectedCategories.includes(categoryId)
    const numberOfSelectedCategories = selectedCategories.length

    if (categoryIsAlreadySelected) {
      if (numberOfSelectedCategories === 1) {
        setSelectedCategories(['All'])
        return
      }

      setSelectedCategories(selectedCategories.filter(category => category !== categoryId))
    } else {
      const oldCategories = selectedCategories.filter(category => category !== 'All')
      setSelectedCategories([...oldCategories, categoryId])
    }
  }

  const { data: books = [] } = useQuery<Book[] | []>(['books'], async () => {

    const getBooksResponse = await api.get(`/books/popular`)

    return getBooksResponse.data.books
  })

  function resetCategories() {
    setSelectedCategories(['All'])
  }

  return (
    <ExplorerContainer>
      <Header>
        <TitleContainer>
          <Binoculars size={32} />
          <h1>Explore</h1>
        </TitleContainer>

        <InputContainer>
          <input
            type="text"
            placeholder="Search for actor or book"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <MagnifyingGlass size={32} />
        </InputContainer>
      </Header>

      <TagsContainer>
        <Tag
          selected={selectedCategories.includes('All')}
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
