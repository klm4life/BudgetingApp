import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import AddBudget from "../components/AddBudget";
import Spinner from "../components/Spinner";

import Button from "@mui/material/Button";

const INITIAL_FORM_VALUE = { name: "", amount: "" };

function Home() {
  const [budgetForm, setBudgetForm] = useState(INITIAL_FORM_VALUE);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  const { checkingStatus } = useAuthStatus();
  const auth = getAuth();

  useEffect(() => {
    // get the budgets created on this month
    const getBudgets = async () => {
      const user = auth.currentUser;

      if (user) {
        // get budgets created by the current signed-in user
        const q = query(
          collection(db, "budgets"),
          where("userRef", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const budgets = [];
        querySnapshot.forEach((doc) => {
          // get current month & year
          const currentMonth = new Date().getUTCMonth();
          const currentYear = new Date().getUTCFullYear();

          // get creation date for each budget
          const docDate = new Date(doc.data().timestamp.seconds * 1000);

          // get only the budgets created in current month
          if (
            currentMonth === docDate.getUTCMonth() &&
            currentYear === docDate.getUTCFullYear()
          ) {
            return budgets.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });

        setBudgets(budgets);
        setLoading(false);
      }
    };

    getBudgets();
  }, [auth.currentUser]);

  // add new budgets
  const submitBudget = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    try {
      // add some data in addition to the budgetForm
      const formDataCopy = {
        ...budgetForm,
        timestamp: serverTimestamp(),
        userRef: user.uid,
      };

      // add budget data to firestore database
      const budgetRef = await addDoc(collection(db, "budgets"), formDataCopy);

      const newBudget = {
        id: budgetRef.id,
        data: formDataCopy,
      };

      // add new budgets
      setBudgets((currentState) => {
        return [...currentState, newBudget];
      });

      // empty input fields
      setBudgetForm(INITIAL_FORM_VALUE);
      // close dialog
      setBudgetDialogOpen(false);

      toast.success("New budget has successfully been added!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add budget information!");
    }
  };

  // handle input changes
  const handleOnChange = (e) => {
    setBudgetForm((currentState) => {
      return { ...currentState, [e.target.id]: e.target.value };
    });
  };

  // open/close dialog
  const toggleBudgetDialog = () => {
    setBudgetDialogOpen((currentState) => !currentState);
  };

  // display loading if true
  if (checkingStatus || loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        {budgets.map((budget) => {
          return (
            <div key={budget.id}>
              <h2>{budget.data.name}</h2>
              <p>{budget.data.amount}</p>
            </div>
          );
        })}
      </div>
      <Button size="large" variant="contained" onClick={toggleBudgetDialog}>
        ADD BUDGET
      </Button>
      <AddBudget
        {...budgetForm}
        budgetDialogOpen={budgetDialogOpen}
        toggleBudgetDialog={toggleBudgetDialog}
        submitBudget={submitBudget}
        handleOnChange={handleOnChange}
      />
    </>
  );
}

export default Home;
