import jumboData from "../fixtures/jumbo";
import { Jumbotron } from "../components";

export function JumbotronContainer() {
  return (
    <Jumbotron.Container>
      <Jumbotron.MainTitle>
        Explore About Our Awesome Features
      </Jumbotron.MainTitle>
      <Jumbotron.MainSubTitle>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eum
        modi, adipisci facilis.
      </Jumbotron.MainSubTitle>
      <Jumbotron.MainTitle>
        Have you ever wondered to turn...
      </Jumbotron.MainTitle>
      <Jumbotron.MainSubTitle>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eum
        modi, adipisci facilis.
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
