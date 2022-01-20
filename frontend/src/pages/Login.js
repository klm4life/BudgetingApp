import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import GoogleOAuth from "../components/GoogleOAuth";

// start with empty fields
const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

function Login() {
  // 'form' is the value, 'setForm' is a function to update the value
  const [form, setForm] = useState(INITIAL_FORM_DATA);
  // get email & password
  const { email, password } = form;
  // allows you to navigate to other routes
  const navigate = useNavigate();

  // used to update the form
  const handleInputChange = (e) => {
    // currentState refers to the current values inside the 'form'
    setForm((currentState) => {
      // update the form based on the element id
      return { ...currentState, [e.target.id]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    // prevent reloading when you submit the form
    e.preventDefault();

    try {
      const auth = getAuth();
      // Sign in by passing email & password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // NOTE: won't reach here if login failed
      // if user exists, navigate to '/home'
      if (userCredential.user) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        placeItems: "center",
        height: "100vh",
      }}
      component="main"
      maxWidth="sm"
    >
      <Box sx={{ mx: "auto" }} component="form" onSubmit={handleLogin}>
        <Typography sx={{ textAlign: "center", mb: 5 }} variant="h4">
          Sign In
        </Typography>

        <TextField
          sx={{ mb: 3 }}
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          required
          fullWidth
          autoFocus
          value={email}
          onChange={handleInputChange}
        />
        <TextField
          sx={{ mb: 3 }}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={handleInputChange}
        />
        <Button
          sx={{ display: "block", mx: "auto", mb: 2, py: 1.5 }}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
        <Link to="/sign-up" variant="body2" component={RouterLink}>
          {"Don't have an account? Sign Up"}
        </Link>
        <Divider sx={{ mt: 4 }}>Or sign in with</Divider>
        <GoogleOAuth />
      </Box>
    </Container>
  );
}

export default Login;
