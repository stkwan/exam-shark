import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/pages/components/navbar.module.css';
import examImage from '@/public/examImage.svg';

function NavBar() {
  return (
      <Navbar className={styles.nav} data-bs-theme="dark">
        <Container>
          <Navbar.Brand className={styles.brand}>
            <Nav.Link href="/">
              <Image src={examImage} alt="exam icon" width={27} height={27} className={styles.examImage}/>
              ExamSpace
            </Nav.Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/search">Search</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavBar;