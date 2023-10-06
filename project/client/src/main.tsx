import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactRouterProvider from './providers/RouterProvider.tsx';
import Container from '@mui/material/Container';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './firebase/config.ts';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Container
      maxWidth="lg"
      sx={{ textAlign: 'center', marginTop: '50px' }}
   >
      {' '}
      <ReactRouterProvider />
   </Container>,
);
