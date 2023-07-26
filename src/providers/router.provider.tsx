import { createBrowserRouter, Outlet, RouterProvider as ReactRouterProvider, ScrollRestoration } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { sessionStore } from '@/stores';
import {
  AuthPage,
  BoardPage,
  TaskCreatePage,
  TaskEditPage,
  TaskInfoPage,
  WidgetsPage,
} from '@/pages';

const AuthGuard = observer(() => {
  return sessionStore.isUser ? (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  ) : (
    <AuthPage />
  );
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <BoardPage />,
      },
      {
        path: '/board',
        element: <BoardPage />,
      },
      {
        path: '/task/:id',
        element: <TaskInfoPage />,
      },
      {
        path: '/task/create',
        element: <TaskCreatePage />,
      },
      {
        path: '/task/:id/edit',
        element: <TaskEditPage />,
      },
      {
        path: '/widgets',
        element: <WidgetsPage />,
      },
      {
        path: '*',
        element: <BoardPage />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};
