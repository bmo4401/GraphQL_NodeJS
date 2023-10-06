import useUserInfo from '@/hooks/useUserInfo';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebase/config';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const UserMenu = () => {
   const { user } = useUserInfo();

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleLogout = () => {
      signOut(firebaseAuth);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const handleClick = (e: any) => {
      setAnchorEl(e.currentTarget);
   };
   return (
      <>
         <Box
            sx={{ display: 'flex' }}
            onClick={handleClick}
         >
            <Typography>{user?.displayName}</Typography>
            <Avatar
               alt="avatar"
               src={user?.photoURL!}
               sx={{ width: 24, height: 24, ml: '5px', cursor: 'pointer' }}
            />
            <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
            >
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
         </Box>
      </>
   );
};
export default UserMenu;
