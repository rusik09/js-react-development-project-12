import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import notFoundImage from '/src/assets/404-D_FLHmTM.svg';

const PageNotFound = () => {
  return (
    <Container className="text-center mt-5">
      <img
        className="img-fluid"
        alt="Страница не найдена"
        src={notFoundImage}
        style={{ maxWidth: '300px' }}
      ></img>
      <h1 className="h4">Страница не найдена</h1>
      <p className="mt-3">
        Но вы можете перейти на <Link to="/">главную страницу</Link>
      </p>
    </Container>
  );
};

export default PageNotFound;
