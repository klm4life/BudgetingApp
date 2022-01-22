import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

function Navbar() {
  const navigate = useNavigate();

  const signOut = async () => {
    const auth = getAuth();
    try {
      auth.signOut();
      toast.success("You have successfully signed out!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out!");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LocalAtmIcon fontSize="2em" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            INTL Budgeting App
          </Typography>
          <Button
            sx={{ color: "#fff", fontSize: "1rem" }}
            variant="text"
            onClick={signOut}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
