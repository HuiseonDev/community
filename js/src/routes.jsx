import Layout from '@components/layout';
import Error from '@pages/Error';
import Community from '@pages/community';
import Detail from '@pages/community/Detail';
import List from '@pages/community/List';
import New from '@pages/community/New';
import CommentList from '@pages/community/CommentList';
import Login from '@pages/user/Login';
import Signup from '@pages/user/Signup';
import { createBrowserRouter } from 'react-router-dom';
import Edit from '@pages/community/Edit';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Community />,
      },
      {
        path: ':type',
        element: <List />,
      },
      {
        path: ':type/:_id',
        element: <Detail />,
        children: [
          {
            index: true,
            element: <CommentList />,
          },
        ],
      },
      {
        path: ':type/new',
        element: <New />,
      },
      {
        path: ':type/:_id/edit',
        element: <Edit />,
      },
      {
        path: 'user/login',
        element: <Login />,
      },
      {
        path: 'user/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
