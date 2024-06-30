import React, { useContext, useState } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    const { isLogin, logout, roles } = useContext(LoginContext);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showCollapse, setShowCollapse] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
        setShowCollapse(false);
    };

    const handleShowOffcanvas = () => {
        setShowOffcanvas(true);
        setShowCollapse(false);
    };

    return (
        <header className="main-header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/img/logo_ex8.png" alt="logo" width="88" height="auto" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShowOffcanvas} />
                    <Navbar.Collapse id="basic-navbar-nav" in={showCollapse}>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/IntroPage">소개</Nav.Link>
                            <Nav.Link as={Link} to="/page/starCard/starList">홍보</Nav.Link>
                            <Nav.Link as={Link} to="/event">이벤트</Nav.Link>
                            <Nav.Link as={Link} to="/review">후기</Nav.Link>
                            <Nav.Link as={Link} to="/qna/qnaList">Q&A</Nav.Link>
                            <Nav.Link as={Link} to="/an">공지사항</Nav.Link>
                        </Nav>
                        <Nav>
                            {!isLogin ? (
                                <>
                                    <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                                    <Nav.Link as={Link} to="/join">회원가입</Nav.Link>
                                </>
                            ) : (
                                <NavDropdown title={<img id="thumbnail" className="rounded-circle rounded-circle-custom" alt="Thumbnail Image" />} id="profileDropdown">
                                    {roles.isAdmin && (
                                        <NavDropdown.Item as={Link} to="/admin">관리자</NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item as={Link} to="/mypage/profile">마이페이지</NavDropdown.Item>
                                    <NavDropdown.Item as="form" onSubmit={handleLogout}>
                                        <Button type="submit" variant="link" style={{ textDecoration: 'none', color: 'black' }}>로그아웃</Button>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} id="offcanvasNavbar" placement="end">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="box p-4 d-grid gap-1 text-center">
                        <h5 className="text-center">메뉴</h5>
                        <Nav.Link as={Link} to="/IntroPage">소개</Nav.Link>
                        <Nav.Link as={Link} to="/page/starCard/starList">홍보</Nav.Link>
                        <Nav.Link as={Link} to="/page/board/eventBoard/eventList">이벤트</Nav.Link>
                        <Nav.Link as={Link} to="/page/board/reviewBoard/reviewList">후기</Nav.Link>
                        <Nav.Link as={Link} to="/page/board/qnaBoard/qnaList">Q&A</Nav.Link>
                        <Nav.Link as={Link} to="/page/board/anBoard/anList">공지사항</Nav.Link>
                    </Nav>
                    <div className="box p-4 d-grid gap-1 text-center">
                        {!isLogin ? (
                            <>
                                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                                <Nav.Link as={Link} to="/join">회원가입</Nav.Link>
                            </>
                        ) : (
                            <>                                
                                <form onSubmit={handleLogout}>
                                    <Link to="/mypage/profile" style={{ textDecoration: 'none', color: 'black' }}>
                                        <Button variant="outline-secondary" className="btn-block">마이페이지</Button>
                                    </Link>
                                    <Button type="submit" variant="outline-secondary" className="btn-block">로그아웃</Button>
                                </form>
                            </>
                        )}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </header>
    );
};

export default Header;
