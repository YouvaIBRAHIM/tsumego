import { createBrowserRouter } from 'react-router-dom';
import Layout from '@src/components/Layout';
import Home from '@src/pages/Home.page';
import Problems from '@src/domains/go/pages/Problems.page';
import Admin from '@src/pages/Admin.page';
import LoginPage from '@src/pages/Login.page';
import RegisterPage from '@src/pages/Register.page';
import PrivateRoute from '@routers/PrivateRoute';
import Profile from '@src/pages/Profile.page';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <PrivateRoute roles={['player', 'editor', 'admin']}>
                        <Home />
                    </PrivateRoute>
                ),
            },
            {
                path: '/problems',
                element: (
                    <PrivateRoute roles={['player', 'editor']}>
                        <Problems />
                    </PrivateRoute>
                ),
            },
            {
                path: '/admin',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <Admin />
                    </PrivateRoute>
                ),
            },
            {
              path: '/profile',
              element: (
                  <PrivateRoute roles={['admin', 'editor', 'player']}>
                      <Profile />
                  </PrivateRoute>
              ),
          },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
]);

export default router