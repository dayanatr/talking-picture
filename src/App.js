import React from 'react'
import { useRoutes } from 'react-router-dom';
import { PictureContextProvider } from './service';
import NotFound from './components/NotFound';

import Header from './components/Header';
import ViewShow from './components/ViewShow';
function AppRoutes() {
  let routes = useRoutes([
    { path: '/', element: <Header /> },
    { path: '/favorites', element: <Header /> },
    { path: '/watch_later', element: <Header /> },
    { path: '/:id', element: <ViewShow /> },
    { path: '*', element: <NotFound /> }
    // ...
  ]);
  return routes;
}
function App() {
  return (
    <>
      <PictureContextProvider>
        <AppRoutes />
      </PictureContextProvider>
    </>
  );
}

export default App;
