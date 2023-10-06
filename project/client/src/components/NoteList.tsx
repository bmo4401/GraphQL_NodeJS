import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import {
   Link,
   Outlet,
   useLoaderData,
   useParams,
   useRouteLoaderData,
} from 'react-router-dom';
import { Params } from './FolderList';
import { Note } from '@/type/graphql';

const NoteList = () => {
   const { noteId } = useParams<Params>();
   const notes = useLoaderData() as Note[];
   console.log('❄️ ~ file: NoteList.tsx:20 ~ notes:', notes);

   return (
      <Grid container>
         <Grid
            item
            xs={4}
            sx={{
               width: '100%',
               maxWidth: 360,
               bgcolor: '#F0EBE3',
               height: '100%',
               overflowY: 'auto',
               padding: '10px',
               textAlign: 'left',
            }}
         >
            <List
               subheader={
                  <Box>
                     <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                     >
                        Notes
                     </Typography>
                  </Box>
               }
            >
               {notes.map(({ _id, content }) => (
                  <Link
                     key={_id}
                     to={`note/${_id}`}
                     style={{ textDecoration: 'none' }}
                  >
                     <Card
                        sx={{
                           mb: '5px',
                           backgroundColor:
                              _id === noteId ? 'rgb(255 211 140)' : null,
                        }}
                     >
                        <CardContent
                           sx={{
                              '&:last-child': { pb: '10px' },
                              padding: '10',
                           }}
                        >
                           <div
                              style={{ fontSize: 14, fontWeight: 'bold' }}
                              dangerouslySetInnerHTML={{
                                 __html: `${content.substring(0, 30)}`,
                              }}
                           />
                        </CardContent>
                     </Card>
                  </Link>
               ))}
            </List>
         </Grid>
         <Grid
            item
            xs={8}
         >
            <Outlet />
         </Grid>
      </Grid>
   );
};
export default NoteList;
