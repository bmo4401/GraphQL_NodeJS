import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AuthProvider from '../providers/AuthProvider';
import Login from '@/pages/Login';
import ProtectedRoot from './ProtectedRoot';
import ErrorPage from './ErrorPage';
import NoteList from '@/components/NoteList';
import Note from '@/components/Note';
import noteLoader from '@/utils/noteLoader';
import notesLoader from '@/utils/notesLoader';
import foldersLoader from '@/utils/foldersLoader';
const AuthLayout = () => (
   <AuthProvider>
      <Outlet />
   </AuthProvider>
);

const router = createBrowserRouter([
   {
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
         {
            element: <Login />,
            path: '/login',
         },
         {
            element: <ProtectedRoot />,
            children: [
               {
                  element: <Home />,
                  path: '/',
                  loader: foldersLoader,
                  children: [
                     {
                        element: <NoteList />,
                        path: 'folder/:folderId',
                        loader: ({ params }) => notesLoader(params),

                        children: [
                           {
                              element: <Note />,
                              path: 'note/:noteId',
                              loader: ({ params }) => noteLoader(params),
                           },
                        ],
                     },
                  ],
               },
            ],
         },
      ],
   },
]);

export default router;
