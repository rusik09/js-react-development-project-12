import { useState, useEffect } from 'react';

import cn from 'classnames';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Button,
  Container,
  Col,
  ListGroup,
  Row,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setChannels, setMessages } from '../features/chat/chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, messages } = useSelector((state) => state.chat);
  const [selected, setSelected] = useState('general');

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (/* values */) => {
      // some logic
    },
  });

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      navigate('/login');
      return;
    }

    const getData = async () => {
      try {
        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get('/api/v1/channels', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
          axios.get('/api/v1/messages', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }),
        ]);

        dispatch(setChannels(channelsResponse.data));
        dispatch(setMessages(messagesResponse.data));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    getData();
  }, [dispatch, navigate]);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 overflow-hidden my-4 rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col
            sm={4}
            md={2}
            className="border-end px-0 bg-light flex-column h-100 d-flex"
          >
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <Button
                type="button"
                variant="text-primary"
                className="p-0 btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <ListGroup
              id="channels-box"
              className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
            >
              {channels.map((channel) => (
                <ListGroup.Item key={channel.id} className="nav-item v-100">
                  <Button
                    onClick={() =>
                      setSelected((prev) =>
                        prev !== `${channel.name}` ? `${channel.name}` : prev
                      )
                    }
                    className={cn(
                      'w-100',
                      'rounded-0',
                      'text-start',
                      'btn-secondary',
                      { active: selected === channel.name }
                    )}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {selected}</b>
                </p>
                <span className="text-muted">{messages.length} сообщений</span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5"
              ></div>
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2">
                  <InputGroup className="has-validation">
                    <Form.Control
                      name="body"
                      placeholder="Введите сообщение..."
                      aria-label="Новое сообщение"
                      className="border-0 p-0 ps-2 "
                      {...formik.getFieldProps('text')}
                    ></Form.Control>
                    <Button
                      type="submit"
                      variant="outline"
                      className="btn btn-group-vertical"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                        ></path>
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;
