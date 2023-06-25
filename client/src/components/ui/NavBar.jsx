import React, { useContext } from "react";

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const NavBar = ({ bg, variant }) => {
    const { user, setUser } = useContext(UserContext);

    const buttonLogoutHandler = () => {
        localStorage.clear();

        setUser({
            role: null
        });
    }

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
                        {
                            ["customer", "regular customer"].includes(user.role) &&
                            <LinkContainer to="/orders/add">
                                <Nav.Link href="">Создать заказ</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            ["regular customer"].includes(user.role) &&
                            <LinkContainer to="/orders/createPreOrder">
                                <Nav.Link href="">Создать предзаказ</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            ["operator", "admin"].includes(user.role) &&
                            <LinkContainer to="/products/getOneDayTillExpirationProducts">
                                <Nav.Link href="">Список товаров с истекающим сроком годности</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            ["operator"].includes(user.role) &&
                            <NavDropdown title="Списки" id="basic-nav-dropdown">
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
                            </NavDropdown>
                        }
                        {
                            ["admin"].includes(user.role) &&
                            <NavDropdown title="Списки" id="basic-nav-dropdown">
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
                                <LinkContainer to="/operators">
                                    <NavDropdown.Item>Операторы</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                        {
                            ["customer", "regular customer"].includes(user.role) &&
                            <NavDropdown title="Списки" id="basic-nav-dropdown">
                                <LinkContainer to="/products">
                                    <NavDropdown.Item>Продукты</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/suppliers">
                                    <NavDropdown.Item>Поставщики</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/categories">
                                    <NavDropdown.Item>Категории продуктов</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/orders">
                                    <NavDropdown.Item>Мои заказы</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                        {
                            ["operator", "admin"].includes(user.role) &&
                            <NavDropdown title="Дополнительно" id="basic-nav-dropdown">
                                <LinkContainer to="/products/checkIsExpired">
                                    <NavDropdown.Item>Проверить срок реализации продукта</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/products/getHoursTillExpiration">
                                    <NavDropdown.Item>Узнать количество часов до окончания срока реализации</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/products/getProductsLessCount">
                                    <NavDropdown.Item>Список товаров, количество которых меньше установленного минимума</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/products/getSuppliersThatHaveProducts">
                                    <NavDropdown.Item>Список поставщиков, товары которых в наличии</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
                {
                    user.role !== null &&
                    <Button onClick={buttonLogoutHandler}>
                        Выйти
                    </Button>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;