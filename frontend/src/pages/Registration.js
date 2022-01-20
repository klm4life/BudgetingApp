import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import formatAlert from "../utils/formatAlert";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import Link from "@mui/material/Link";

// start with empty form
const INITIAL_FORM_DATA = {
  email: "",
  password: "",
};

const Registration = () => {
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

  // invoked when user submits the form
  const handleRegistration = async (e) => {
    // prevent reloading when you submit the form
    e.preventDefault();

    try {
      const auth = getAuth();
      // create user by passing email & password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // get user details
      const user = userCredential.user;

      // copy data inside 'form'
      const formDataCopy = { ...form };
      // delete password so that it's not included inside the Firestore database
      delete formDataCopy.password;
      // get current time
      formDataCopy.timestamp = serverTimestamp();

      // add newly created user to Firestore database
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      // redirect user to '/home'
      navigate("/home");
      toast.success("Account has successfully been created!");
    } catch (e) {
      const message = formatAlert(e.code);
      toast.error(`${message}!`);
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
      <Box sx={{ mx: "auto" }} component="form" onSubmit={handleRegistration}>
        <Typography sx={{ textAlign: "center", mb: 5 }} variant="h4">
          Sign Up
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
          Sign Up
        </Button>
        <Link to="/" variant="body2" component={RouterLink}>
          Back to login page
        </Link>
      </Box>
    </Container>
  );
};

export default Registration;
