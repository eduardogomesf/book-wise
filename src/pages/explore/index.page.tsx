import { ReactElement, useState } from "react"
import { DefaultLayout } from "../../layouts/default"
import { ExplorerContainer, Header, InputContainer, Tag, TagsContainer, TitleContainer } from "./styles"
import { Binoculars, MagnifyingGlass } from "phosphor-react"
import { GetServerSideProps } from "next"
import { Category } from "../../types/category"
import { api } from "../../lib/axios"

type ExploreProps = {
  categories: Category[]
}
export default function Explore({ categories = [] }: ExploreProps) {
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
          <input type="text" placeholder="Search for actor or book" />
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
