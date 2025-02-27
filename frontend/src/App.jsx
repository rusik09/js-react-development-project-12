/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Header from './Components/Header.jsx';
import Login from './Components/Login.jsx';
import ChatPage from './Components/ChatPage.jsx';
import PageNotFound from './Components/PageNotFound.jsx';

import './index.css';

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Router>
    <div className="vh-100 d-flex flex-column">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
