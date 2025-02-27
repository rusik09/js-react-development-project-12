import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setChannels, setMessages } from '../features/chat/chatSlice';

function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, messages } = useSelector((state) => state.chat);

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
    <div>
      <h1>Стили будут завтра ;)</h1>
      <h2>Каналы:</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>

      <h2>Сообщения:</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.username}: {message.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatPage;
