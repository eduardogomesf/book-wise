import { Sidebar } from "../../components/Sidebar";
import { DefaultLayoutContainer, DefaultLayoutMain } from "./styles";

type DefaultLayoutProps = {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <DefaultLayoutContainer>
      <Sidebar />

      <DefaultLayoutMain>
        {children}
      </DefaultLayoutMain>
    </DefaultLayoutContainer>
  )
}
