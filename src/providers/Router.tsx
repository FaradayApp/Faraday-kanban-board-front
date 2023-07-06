import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { sessionStore } from '@/stores';

const AuthGuard = observer(() => {
  return sessionStore.isUser ? (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  ) : (
    <div />
  );
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <div />,
      },
      {
        path: '/board',
        element: <div />,
      },
      {
        path: '/task/:id',
        element: <div />,
      },
      {
        path: '/task/create',
        element: <div />,
      },
      {
        path: '/task/:id/edit',
        element: <div />,
      },
      {
        path: '/widgets',
        element: <div />,
      },
      {
        path: '*',
        element: <div />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
