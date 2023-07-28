import { ReactElement } from "react"
import { DefaultLayout } from "../../layouts/default"
import { ExplorerContainer, Header, InputContainer, TitleContainer } from "./styles"
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
