import {
  createBrowserRouter,
  Navigate,
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
  AuthAdminPage,
} from '@/pages';
import { BoardProvider } from './board.provider';
import { TaskInfoProvider } from '.';

const AuthAdminGuard = observer(() => {
  return sessionStore.isUser ? (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  ) : (
    <AuthAdminPage />
  );
});

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
    path: 'admin',
    element: <AuthAdminGuard />,
    children: [
      {
        path: 'boards',
        element: <BoardsManagementPage />,
      },
      {
        path: '*',
        element: <Navigate to='/admin/boards' />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        path: '/board/:boardUuid/',
        element: <BoardPage />,
      },
      {
        path: '/board/:boardUuid/task/:id',
        element: (
          <TaskInfoProvider>
            <TaskInfoPage />
          </TaskInfoProvider>
        ),
      },
      {
        path: '/board/:boardUuid/task/create',
        element: <TaskCreatePage />,
      },
      {
        path: '/board/:boardUuid/task/:id/edit',
        element: (
          <TaskInfoProvider>
            <TaskEditPage />
          </TaskInfoProvider>
        ),
      },
      {
        path: '*',
        element: <Navigate to='/board/empty' />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};
