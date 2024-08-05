import React from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Home, FileText, Trash2, Send, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Pastikan Anda telah mengimpor toast
import {AxiosInstance} from '../AxiosInstance'

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('Yakin nih Logout?');
    if (confirmLogout) {
      try {
        const response = await AxiosInstance.post('logout');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('permission');
        localStorage.removeItem('role');
        navigate('/');
        toast.success('Logout sukses');
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const menuItems1 = [
    { text: 'Create Product', link: '/adminDashboard', icon: <Home /> },
    { text: 'Banner', link: '/Banner', icon: <FileText /> },
    { text: 'Masih Dummy', link: '/MasihDummy', icon: <Send /> },
    { text: 'Drafts', link: '/Drafts', icon: <FileText /> },
  ];

  const menuItems2 = [
    { text: 'All mail', link: '/AllMail', icon: <Send /> },
    { text: 'Trash', link: '/Trash', icon: <Trash2 /> },
    { text: 'Spam', link: '/Spam', icon: <Trash2 /> },
    { text: 'Logout', link: '#', icon: <LogOut />, action: handleLogout },
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems1.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems2.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.link === '#' ? 'button' : Link}
              to={item.link !== '#' ? item.link : undefined}
              onClick={item.action ? item.action : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SidebarAdmin;
