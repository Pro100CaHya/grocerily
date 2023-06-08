import React, { useContext } from "react";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../context/UserContext";

const NavBar = ({ bg, variant }) => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Navbar
            bg={bg}
            expand="lg"
            variant={variant}
            fixed="top"
        >
            <Container>
                <Navbar.Brand href="#home">Grocerily</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Списки" id="basic-nav-dropdown">
                            {
                                user.role === "operator" &&
                                    <>
                                        <LinkContainer to="/products">
                                            <NavDropdown.Item>Продукты</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/remnants">
                                            <NavDropdown.Item>Остатки</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/suppliers">
                                            <NavDropdown.Item>Поставщики</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/categories">
                                            <NavDropdown.Item>Категории продуктов</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orders">
                                            <NavDropdown.Item>Заказы</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/customers">
                                            <NavDropdown.Item>Клиенты</NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;