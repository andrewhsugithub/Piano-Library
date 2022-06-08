﻿import {
    Container,
    MainTitle,
    Item,
    Inner,
    Pane,
    Link,
    Email,
    Image,
    Icon,
    Name
} from "./styles/contact";

export default function Contact({
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

Contact.Container = function ContactContainer({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
};

Contact.MainTitle = function ContactMainTitle({ children, ...restProps }) {
    return <MainTitle {...restProps}>{children}</MainTitle>;
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

Contact.Name = function ContactName({ children, ...restProps }) {
    return <Name {...restProps}>{children}</Name>;
};