import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  // if true, the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // if true, display spinner
  const [checkingStatus, setCheckingStatus] = useState(true);
  // to check whether the component is mounted or unmounted
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      // onAuthStateChanged will keep track of user signing in and out
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    // executed when component is unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isLoggedIn, checkingStatus };
};
