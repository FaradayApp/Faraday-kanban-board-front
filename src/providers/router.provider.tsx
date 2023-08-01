import {
  createBrowserRouter,
  Outlet,
  RouterProvider as ReactRouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { sessionStore } from '@/stores';
import {
  AuthPage,
  BoardPage,
  TaskCreatePage,
  TaskEditPage,
  TaskInfoPage,
  BoardsManagementPage,
} from '@/pages';
import { BoardProvider } from './board.provider';

const AuthGuard = observer(() => {
  return sessionStore.isUser ? (
    <BoardProvider>
      <Outlet />
      <ScrollRestoration />
    </BoardProvider>
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
        path: '/board/:boardId/',
        element: <BoardPage />,
      },
      {
        path: '/board/:boardId/task/:id',
        element: <TaskInfoPage />,
      },
      {
        path: '/board/:boardId/task/create',
        element: <TaskCreatePage />,
      },
      {
        path: '/board/:boardId/task/:id/edit',
        element: <TaskEditPage />,
      },
      {
        path: '/admin/boards',
        element: <BoardsManagementPage />,
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
