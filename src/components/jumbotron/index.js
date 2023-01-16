import {
  Container,
  MainTitle,
  MainSubTitle,
  Item,
  Inner,
  Pane,
  Heading,
  Title,
  SubTitle,
  Image,
} from "./styles/jumbotron";

export default function Jumbotron({
  children,
  direction = "row",
  ...restProps
}) {
  return (
    <Item {...restProps}>
      <Inner direction={direction}>{children}</Inner>
    </Item>
  );
}

Jumbotron.Container = function JumbotronContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Jumbotron.MainTitle = function JumbotronMainTitle({ children, ...restProps }) {
  return <MainTitle {...restProps}>{children}</MainTitle>;
};

Jumbotron.MainSubTitle = function JumbotronMainSubTitle({
  children,
  ...restProps
}) {
  return <MainSubTitle {...restProps}>{children}</MainSubTitle>;
};

Jumbotron.Pane = function JumbotronPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

Jumbotron.Heading = function JumbotronHeading({ children, ...restProps }) {
  return <Heading {...restProps}>{children}</Heading>;
};

Jumbotron.Title = function JumbotronTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Jumbotron.SubTitle = function JumbotronSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Jumbotron.Image = function JumbotronImage({ ...restProps }) {
  return <Image {...restProps} />;
};
