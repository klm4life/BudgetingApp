import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function GoogleOAuth() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      // get Google OAuth
      const googleProvider = new GoogleAuthProvider();
      // Sign in with pop-up window using Google OAuth
      const result = await signInWithPopup(auth, googleProvider);
      // get details of signed-in user
      const user = result.user;

      // create a user reference to the Firestore database
      const docRef = doc(db, "users", user.uid);
      // get user data based on reference
      const docSnap = await getDoc(docRef);

      // if user data doesn't exist within the Firebase database, add it into the database
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Button
        variant="contained"
        size="large"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
      >
        Google Account
      </Button>
    </Box>
  );
}

export default GoogleOAuth;
