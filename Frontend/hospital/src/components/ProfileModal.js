// ProfileModal.jsx
import React, { useContext } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
};

const avatarStyle = {
  width: 80,
  height: 80,
  margin: '0 auto',
  mb: 2,
};

const ProfileModal = ({ open, handleClose }) => {
  const { user } = useContext(AuthContext);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="profile-modal-title">
      <Box sx={style}>
        <Avatar sx={avatarStyle} src={user?.avatar || '/default-avatar.png'} alt={user?.name} />
        <Typography id="profile-modal-title" variant="h5" component="h2" gutterBottom>
          {user?.name || 'User'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography sx={{ mt: 2 }}>
          <strong>Name:</strong> {user?.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email || 'N/A'}
        </Typography>
        {/* Add more user details as needed */}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
