import {
  Container,
  MainTitle,
  SubTitle,
  Item,
  IdPackage,
  Inner,
  Pane,
  Link,
  Email,
  Image,
  Icon,
  IconLink,
  Name,
} from "./styles/contact";

export default function Contact({ children, ...restProps }) {
  return (
    <Item {...restProps}>
      <Inner>{children}</Inner>
    </Item>
  );
}

Contact.Container = function ContactContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Contact.MainTitle = function ContactMainTitle({ children, ...restProps }) {
  return <MainTitle {...restProps}>{children}</MainTitle>;
};

Contact.SubTitle = function ContactSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Contact.Pane = function ContactPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

Contact.Link = function ContactLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Contact.Email = function ContactEmail({ children, ...restProps }) {
  return <Email {...restProps}>{children}</Email>;
};

Contact.Image = function ContactImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Contact.Icon = function ContactIcon({ ...restProps }) {
  return <Icon {...restProps} />;
};

Contact.IconLink = function ContactIcon({ children, ...restProps }) {
  return <IconLink {...restProps}>{children}</IconLink>;
};

Contact.Name = function ContactName({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};

Contact.IdPackage = function ContactIdPackage({ children, ...restProps }) {
  return <IdPackage {...restProps}>{children}</IdPackage>;
};
