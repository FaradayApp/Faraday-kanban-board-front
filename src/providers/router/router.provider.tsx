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
  EditProfilePage,
} from '@/pages';
import { BoardProvider, ProfileProvider, TaskInfoProvider } from '@/providers/data';

const AuthAdminGuard = observer(() => {
  return sessionStore.isUser ? (
    <ProfileProvider>
      <Outlet />
      <ScrollRestoration />
    </ProfileProvider>
  ) : (
    <AuthAdminPage />
  );
});

const AuthGuard = observer(() => {
  return sessionStore.isUser ? (
    <ProfileProvider>
      <BoardProvider>
        <Outlet />
        <ScrollRestoration />
      </BoardProvider>
    </ProfileProvider>
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
        path: '/board/:boardUuid/profile',
        element: <EditProfilePage />,
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
