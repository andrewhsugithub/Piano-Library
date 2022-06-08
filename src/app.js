import { JumbotronContainer } from "./containers/jumbotron";
import { FooterContainer } from "./containers/footer";
import { ContactContainer } from "./containers/contact";
export default function App() {
  return ( 
      <>
        <JumbotronContainer />
        <ContactContainer />
        <FooterContainer />
      </>
    );
}