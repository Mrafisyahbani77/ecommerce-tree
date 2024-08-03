import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { InboxIcon, MailIcon, MenuIcon } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useFetch } from '../../useFetchProduct/useFetch';
import { AxiosInstance } from '../../AxiosInstance';
import Loader from '../../component/Loader';

const drawerWidth = 240;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLoading, error } = useFetch();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDeleteProduct = (ProductId) => {
    alert('Delete Product With ID' + ProductId);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Create Product', 'Banner', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const FetchingData = async () => {
    const response = await AxiosInstance.get('products');
    setData(response.data.data);
  };

  useEffect(() => {
    FetchingData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="lg:hidden">
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <h1 className="mt-12 mb-5 lg:px-4 text-xl lg:text-2xl font-bold">List Produk Yang Tersedia</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="center">Nama Produk</StyledTableCell>
                  <StyledTableCell align="right">Kategori</StyledTableCell>
                  <StyledTableCell align="right">Harga</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell component="th" scope="row">
                      <img src={product.image_url} alt={product.name} className="object-cover rounded-t-md w-full h-24" />
                    </StyledTableCell>
                    <StyledTableCell align="center" className="font-semibold">
                      {product.name}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="font-semibold">
                      {product.merchant}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="font-semibold">
                      {product.price}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="font-semibold">
                      {product.status}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="font-semibold">
                      <button className="mr-5">Edit</button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div>
          <Button className="mt-5" variant="contained" onClick={() => alert('Product Added')}>
            Tambah Product
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
