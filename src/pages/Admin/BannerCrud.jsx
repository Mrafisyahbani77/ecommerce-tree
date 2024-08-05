import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import SidebarAdmin from "../../component/SidebarAdmin";
import { useFetchBanner } from "../../useFetchComponent/useFetchBanner";
import Loader from "../../component/Loader";

const drawerWidth = 240;

const BannerCrud = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { data: banners, isLoading, isFetching } = useFetchBanner();

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

  const handleDeleteProduct = (id) => {
    alert(`Product with id ${id} deleted`);
    // Implement the delete functionality here
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="lg:hidden bg-slate-100" >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="font-semibold text-black"
            variant="h7"
            noWrap
            component="div"
          >
            Ecommerce Tree
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SidebarAdmin />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SidebarAdmin />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className="flex my-5 md:flex flex-col md:flex-row justify-between items-center">
          <h1 className="mt-5 mb-5 lg:px-4 text-xl lg:text-2xl font-bold">
            Banner Management
          </h1>

          <Button className="mt-5" variant="contained">
            Tambah Banner
          </Button>
        </div>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align="center">Judul Banner</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Harga</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {banners.map((banner, index) => (
                <TableBody>
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <img
                        src={`http://127.0.0.1:8000/storage/${banner.image_path}`}
                        alt="ada lah"
                        className="object-cover rounded-t-md w-full h-24"
                      />
                    </TableCell>
                    <TableCell align="center" className="font-semibold">
                      {banner.title}
                    </TableCell>
                    <TableCell align="center" className="font-semibold">
                      {(banner.description = "hallo")}
                    </TableCell>
                    <TableCell align="center" className="font-semibold">
                      {banner.start_date}
                    </TableCell>
                    <TableCell align="center" className="font-semibold">
                      <button className="mr-5" onClick={() => alert("sasasa")}>
                        Edit
                      </button>
                      <button>Hapus</button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default BannerCrud;
