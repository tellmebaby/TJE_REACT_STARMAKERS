import React, { useContext, useState } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Offcanvas, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    const { isLogin, logout, userRole, csrfToken } = useContext(LoginContext);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showCollapse, setShowCollapse] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

<<<<<<< HEAD
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
        setShowCollapse(false);
    };
=======
  return (
    <header>
        <div className="logo">
            <Link to="/">
                <img src="https://i.imgur.com/fzADqJo.png" alt="logo" className='logo' />
            </Link>
        </div>
        <div className="util">
            <ul>
                {/* 로그인 여부 (isLogin) 에 따라서 조건부 렌더링 */}
                {
                    isLogin ?
                    <>
                     
                        <li><Link to="src/pages/board/Insert.jsx">글쓰기</Link></li>
                        <li><Link to="src/pages/User.jsx">마이페이지</Link></li>
                        <li><button className='link' onClick={() => logout() }>로그아웃</button></li>
                    </>
                    :
                    <>
                        <li><Link to="/board/Insert">글쓰기</Link></li>
                        <li><Link to="/Login">로그인</Link></li>
                        <li><Link to="/Join">회원가입</Link></li>       
                        <li><Link to="/About">소개</Link></li>
                    </>
                }
            </ul>
        </div>
    </header>
  )
}
>>>>>>> 7903d3f252679d157c290af50c6882f92d8ebb0c

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
                            <Nav.Link as={Link} to="/page/introduce">소개</Nav.Link>
                            <Nav.Link as={Link} to="/page/starCard/starList">홍보</Nav.Link>
                            <Nav.Link as={Link} to="/page/board/eventBoard/eventList">이벤트</Nav.Link>
                            <Nav.Link as={Link} to="/page/board/reviewBoard/reviewList">후기</Nav.Link>
                            <Nav.Link as={Link} to="/page/board/qnaBoard/qnaList">Q&A</Nav.Link>
                            <Nav.Link as={Link} to="/page/board/anBoard/anList">공지사항</Nav.Link>
                        </Nav>
                        <Nav>
                            {!isLogin ? (
                                <>
                                    <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                                    <Nav.Link as={Link} to="/join">회원가입</Nav.Link>
                                </>
                            ) : (
                                <NavDropdown title={<img id="thumbnail" className="rounded-circle rounded-circle-custom" alt="Thumbnail Image" />} id="profileDropdown">
                                    {userRole === 'ROLE_ADMIN' && (
                                        <NavDropdown.Item as={Link} to="/admin">관리자</NavDropdown.Item>
                                    )}
                                    <NavDropdown.Item as={Link} to="/page/mypage/profile">마이페이지</NavDropdown.Item>
                                    <NavDropdown.Item as="form" onSubmit={handleLogout}>
                                        <input type="hidden" name="_csrf" value={csrfToken} />
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
                    <Offcanvas.Title>
                        {/* <Navbar.Brand as={Link} to="/">
                            <img id="thumbnail" className="rounded-circle rounded-circle-custom" alt="Thumbnail Image" />
                        </Navbar.Brand> */}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="box p-4 d-grid gap-1 text-center">
                        <h5 className="text-center">메뉴</h5>
                        <Nav.Link as={Link} to="/page/introduce">소개</Nav.Link>
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
                                    <Link to="/page/mypage/profile" style={{ textDecoration: 'none', color: 'black' }}>
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
