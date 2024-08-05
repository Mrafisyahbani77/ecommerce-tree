import React from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { InboxIcon, MailIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  const menuItems1 = [
    { text: 'Create Product', link: '/adminDashboard' },
    { text: 'Banner', link: '/Banner' },
    { text: 'Masih Dummy', link: '/MasihDummy' },
    { text: 'Drafts', link: '/Drafts' },
  ];

  const menuItems2 = [
    { text: 'All mail', link: '/AllMail' },
    { text: 'Trash', link: '/Trash' },
    { text: 'Spam', link: '/Spam' },
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems1.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems2.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SidebarAdmin;
