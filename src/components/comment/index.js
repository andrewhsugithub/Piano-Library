import {
  Container,
  MainTitle,
  Inner,
  Item,
  SubTitle,
  Description,
  Pane,
  Star,
  Image,
  Text,
} from "./styles/comment";

export default function Comment({ children, ...restProps }) {
  return (
    <Item {...restProps}>
      <Inner>{children}</Inner>
    </Item>
  );
}

Comment.Container = function CommentContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Comment.MainTitle = function CommentMainTitle({ children, ...restProps }) {
  return <MainTitle {...restProps}>{children}</MainTitle>;
};

Comment.SubTitle = function CommentSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Comment.Pane = function CommentPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

Comment.Description = function CommentDescription({ children, ...restProps }) {
  return <Description {...restProps}>{children}</Description>;
};

Comment.Image = function CommentImage({ children, ...restProps }) {
  return <Image {...restProps}>{children}</Image>;
};

Comment.Star = function CommentStar({ children, ...restProps }) {
  return <Star {...restProps}>{children}</Star>;
};
Comment.Text = function CommentText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
