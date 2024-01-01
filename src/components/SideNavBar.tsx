import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logout  from '@mui/icons-material/Logout';
// import MailIcon from '@mui/icons-material/Mail';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  userName: string | null,
  currentLocation: string
}

export default function SideNavBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return router.replace('/notes')
  }

  const drawer = (
    <div className='h-screen bg-black'>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding className='text-white'>
          <Link href='/notes'>
            <ListItemButton>
              <ListItemIcon>
                {props.currentLocation == 'Notes' ? <RadioButtonCheckedIcon className='text-white' /> : <RadioButtonUncheckedIcon className='text-white' />}
              </ListItemIcon>
              <ListItemText primary={'Notes'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className='bg-black text-white'>
          <Link href='/remainders'>
            <ListItemButton>
              <ListItemIcon>
                {props.currentLocation == 'Remainders' ? <RadioButtonCheckedIcon className='text-white' /> : <RadioButtonUncheckedIcon className='text-white' />}
              </ListItemIcon>
              <ListItemText primary={'Remainders'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding className='bg-black text-white'>
          <button onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <Logout className='text-white'/>
              </ListItemIcon>
              <ListItemText className='text-white' primary={'Logout'} />
            </ListItemButton>
          </button>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className='bg-black'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome {props.userName}
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box> */}
    </Box>
  );
}
