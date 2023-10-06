import { Box, Card, CardContent, Typography } from '@mui/material';
import List from '@mui/material/List';
import { Link, useParams } from 'react-router-dom';
import { Folder } from '../../type';
export type Params = {
   folderId: string;
   noteId: string;
};

interface FolderListProps {
   folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {
   const { folderId } = useParams<Params>();

   return (
      <>
         <List
            sx={{
               width: '100%',
               bgcolor: '#7D9D9C',
               height: '100%',
               padding: '10px',
               textAlign: 'left',
               overflowY: 'auto',
            }}
            subheader={
               <Box>
                  <Typography
                     sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        padding: '10px',
                        textAlign: 'center',
                     }}
                  >
                     Folders
                  </Typography>
               </Box>
            }
         >
            {folders.map(({ id, name }) => (
               <Link
                  key={id}
                  to={`folder/${id}`}
                  style={{ textDecoration: 'none' }}
               >
                  <Card
                     sx={{
                        mb: '5px',
                        backgroundColor:
                           id === folderId ? 'rgb(255 211 140)' : null,
                     }}
                  >
                     <CardContent
                        sx={{ padding: '10px', '&:last-child': { pb: '10px' } }}
                     >
                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                           {name}
                        </Typography>
                     </CardContent>
                  </Card>
               </Link>
            ))}
         </List>
      </>
   );
};
export default FolderList;
