import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Link from "next/link";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

export default function ButtonAppBar() {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setDrawer(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MATCHCHEMICAL OTA DRIVE
            </Typography>
            {/* <Button color="inherit">hello</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 200,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <Link passHref={true} href="/">
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Index" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link passHref={true} href="/boards">
                  <ListItemButton>
                    <ListItemIcon>
                      <DeviceHubIcon />
                    </ListItemIcon>
                    <ListItemText primary="Boards" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link passHref={true} href="/ota">
                  <ListItemButton>
                    <ListItemIcon>
                      <UploadFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="OTA" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
}
