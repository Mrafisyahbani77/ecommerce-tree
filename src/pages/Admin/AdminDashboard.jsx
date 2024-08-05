import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MenuIcon } from 'lucide-react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useFetch } from '../../useFetchProduct/useFetch';
import Loader from '../../component/Loader';
import { useDeletedProduct } from '../../useMutation/useMutationProduct';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../component/SidebarAdmin';

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

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const { isLoading, refetch, data } = useFetch();
  const { mutate } = useDeletedProduct();

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
    const confirmDeleted = confirm('Are you sure you want to delete this product');

    if (confirmDeleted) {
      mutate(ProductId, {
        onSuccess: () => {
          refetch();
          toast.success('Product deleted successfully', {
            position: 'top-right',
            duration: 3000,
          });
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="sm:hidden">
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, overflow: 'hidden' },
          }}
        >
          <SidebarAdmin />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, overflow: 'hidden' },
          }}
          open
        >
          <SidebarAdmin />
        </Drawer>
      </Box>

      <Box component="main" sx={{ overflow: 'hidden', flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <h1 className="mt-12 lg:mt-5 mb-5 lg:px-4 text-xl lg:text-2xl font-bold">List Produk Yang Tersedia</h1>
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
                      <button className="mr-5" onClick={() => alert(`edited Product wiht id ${product.id}`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div>
          <Link to="/adminDashboard/CreateProduct">
            <Button className="mt-5" variant="contained">
              Tambah Product
            </Button>
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
