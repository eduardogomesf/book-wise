import { ReactElement } from "react"
import { DefaultLayout } from "../../layouts/default"
import { ExplorerContainer, Header, InputContainer, Tag, TagsContainer, TitleContainer } from "./styles"
import { Binoculars, MagnifyingGlass } from "phosphor-react"

export default function Explore() {
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
        <Tag selected={true}>All</Tag>

        <Tag selected={false}>Computing</Tag>

        <Tag selected={false}>Education</Tag>

        <Tag selected={false}>Fictitious</Tag>

        <Tag selected={false}>Science Fiction</Tag>
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
