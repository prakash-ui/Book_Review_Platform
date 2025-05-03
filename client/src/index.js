import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';
import { loadUserFromToken } from './redux/actions/authActions';

const AppWithAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken());
  }, [dispatch]);

  return <App />;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <AppWithAuth />
  </Provider>
);
