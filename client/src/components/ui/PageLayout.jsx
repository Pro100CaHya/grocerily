import React from "react";
import { Container } from "react-bootstrap";

const PageLayout = ({ children, title }) => {
    return (
        <Container
            fluid="sm"
            className="py-5 d-flex flex-column"
        >
            <h1 className="pt-5 text-center">
                {title}
            </h1>
            <Container
                fluid
                className="flex-grow-1 flex-shrink-0"
            >
                {children}
            </Container>
        </Container>
    );
};

export default PageLayout;