import { useFormik /*, ErrorMessage*/ } from 'formik';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.nickname) {
        errors.nickname = 'Обязательное поле';
      } else if (values.nickname.length < 3) {
        errors.nickname = 'Ник должен содержать минимум 3 символа';
      }

      if (!values.password) {
        errors.password = 'Обязательное поле';
      } else if (values.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="nickname">
        <Form.Label>Ваш ник</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите ваш ник"
          {...formik.getFieldProps('nickname')}
          isInvalid={formik.touched.nickname && !!formik.errors.nickname}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.nickname}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          {...formik.getFieldProps('password')}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
    // <form onSubmit={formik.handleSubmit}>
    //   <label htmlFor="Nickname">Ваш ник</label>
    //   <input
    //     id="nickname"
    //     name="nickname"
    //     type="text"
    //     onChange={formik.handleChange}
    //     value={formik.values.nickname}
    //   />
    //   <label htmlFor="password">Пароль</label>
    //   <input
    //     type="password"
    //     name="password"
    //     onChange={formik.handleChange}
    //     value={formik.values.password}
    //   />
    //   {/* <ErrorMessage
    //     component="div"
    //     name="nickname"
    //     className="invalid-feedback"
    //   />
    //   <ErrorMessage
    //     component="div"
    //     name="password"
    //     className="invalid-feedback"
    //   /> */}

    //   <button type="submit">Submit</button>
    // </form>
  );
};

export default Login;
