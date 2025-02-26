import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Form, Button, Container, Col, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../features/auth/authSlice';

import logInImage from '../assets/avatar-DIE1AEpS.jpg';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = 'Обязательное поле';
      } else if (values.username.length < 3) {
        errors.username = 'Ник должен содержать минимум 3 символа';
      }

      if (!values.password) {
        errors.password = 'Обязательное поле';
      } else if (values.password.length < 5) {
        errors.password = 'Пароль должен содержать минимум 5 символов';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        dispatch(login({ user: values.username, token: response.data.token }));
        navigate('/');
        setSubmitted(false);
      } catch (error) {
        console.error('Ошибка авторизации', error);
        setAuthError('Неверное имя пользователя или пароль');
        setSubmitted(true);
      }
    },
  });
  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="justify-content-center align-content-center flex-grow-1">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              {/* <Row className="align-items-center"> */}
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src={logInImage}
                  alt="Log in"
                  className="img-fluid rounded-circle"
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Ваш ник"
                    {...formik.getFieldProps('username')}
                    isInvalid={submitted && !!formik.errors.username}
                  />
                  <Form.Label>Ваш ник</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    {...formik.getFieldProps('password')}
                    isInvalid={submitted && !!formik.errors.password}
                  />
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>

                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
                {authError && (
                  <div className="text-danger mt-3 text-center">
                    {authError}
                  </div>
                )}
              </Form>
              {/* </Row> */}
            </Card.Body>
            <Card.Footer className="card_footer text-center p-4">
              Нет аккаунта? <a href="#">Регистрация</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
