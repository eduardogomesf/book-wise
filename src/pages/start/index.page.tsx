import { ChartLineUp } from "phosphor-react";
import { Sidebar } from "../../components/Sidebar";
import { Header, MainContent, StartContainer } from "./styles";

export default function Start() {
  return (
    <StartContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <ChartLineUp size={32} />
          <h1>
            Início
          </h1>
        </Header>
      </MainContent>
    </StartContainer>
  )
}
