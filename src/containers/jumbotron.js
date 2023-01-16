import jumboData from "../fixtures/jumbo";
import { Jumbotron } from "../components";

export function JumbotronContainer() {
  return (
    <Jumbotron.Container>
      <Jumbotron.MainTitle>
        Explore About Our Awesome Features
      </Jumbotron.MainTitle>
      <Jumbotron.MainSubTitle>
      When people browse a website, they want easy navigation, attractive design, and relevant content. As people spend less time online,
      however, music must leverage the website features users value most to hold audiences’ attention.
      </Jumbotron.MainSubTitle>
      <Jumbotron.MainTitle>
        Have you ever wondered to turn...
      </Jumbotron.MainTitle>
      <Jumbotron.MainSubTitle>
      Want to play the piano but can't find the sheet music?
      It's okay, you picked the right website
      </Jumbotron.MainSubTitle>
      {jumboData.map((item) => (
        <Jumbotron key={item.id} direction={item.direction}>
          <Jumbotron.Pane>
            <Jumbotron.Heading>{item.heading}</Jumbotron.Heading>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>

          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}
