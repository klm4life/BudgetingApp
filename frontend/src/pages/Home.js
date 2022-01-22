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
import BudgetList from "../components/BudgetList";
import AddExpense from "../components/AddExpense";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const INITIAL_FORM_VALUE = { name: "", amount: "" };

function Home() {
  const [budgetForm, setBudgetForm] = useState(INITIAL_FORM_VALUE);
  const [expenseForm, setExpenseForm] = useState(INITIAL_FORM_VALUE);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [currentBudgetInfo, setCurrentBudgetInfo] = useState({
    budgetName: "",
    budgetId: "",
  });

  const { checkingStatus } = useAuthStatus();
  const auth = getAuth();

  useEffect(() => {
    // get the budgets and expenses created on this month
    const getBudgetsAndExpenses = async () => {
      const user = auth.currentUser;

      if (user) {
        // get budgets created by the current signed-in user
        const budgetQuery = query(
          collection(db, "budgets"),
          where("userRef", "==", user.uid)
        );

        const expenseQuery = query(
          collection(db, "expenses"),
          where("userRef", "==", user.uid)
        );

        const budgetSnapshot = await getDocs(budgetQuery);
        const expenseSnapshot = await getDocs(expenseQuery);

        // get current month & year
        const currentMonth = new Date().getUTCMonth();
        const currentYear = new Date().getUTCFullYear();

        // BUDGETS
        const budgets = [];
        budgetSnapshot.forEach((doc) => {
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

        // EXPENSES
        const expenses = [];
        expenseSnapshot.forEach((doc) => {
          // get creation date for each budget
          const docDate = new Date(doc.data().timestamp.seconds * 1000);

          // get only the expenses created in current month
          if (
            currentMonth === docDate.getUTCMonth() &&
            currentYear === docDate.getUTCFullYear()
          ) {
            return expenses.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });

        setBudgets(budgets);
        setExpenses(expenses);
        setLoading(false);
      }
    };

    getBudgetsAndExpenses();
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
      toast.error("Failed to add new budget information!");
    }
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    setLoading(true);
    try {
      const formDataCopy = {
        ...expenseForm,
        amount: parseInt(expenseForm.amount),
        type: currentBudgetInfo.budgetName,
        timestamp: serverTimestamp(),
        budgetRef: currentBudgetInfo.budgetId,
        userRef: user.uid,
      };

      // add new expenses data to firestore database
      const expenseRef = await addDoc(collection(db, "expenses"), formDataCopy);

      const newExpense = {
        id: expenseRef.id,
        data: formDataCopy,
      };

      // add new expenses
      setExpenses((currentState) => {
        return [...currentState, newExpense];
      });

      // clear input fields
      setExpenseForm(INITIAL_FORM_VALUE);
      // close expense dialog
      setExpenseDialogOpen(false);
      setLoading(false);

      toast.success("New expense has successfully been added!");
    } catch (error) {
      toast.error("Failed to add new expense");
    }
  };

  // handle input changes
  const handleBudgetOnChange = (e) => {
    setBudgetForm((currentState) => {
      return { ...currentState, [e.target.id]: e.target.value };
    });
  };

  // handle input changes
  const handleExpenseOnChange = (e) => {
    setExpenseForm((currentState) => {
      return { ...currentState, [e.target.id]: e.target.value };
    });
  };

  // open/close budget dialog
  const toggleBudgetDialog = () => {
    setBudgetDialogOpen((currentState) => !currentState);
    setBudgetForm(INITIAL_FORM_VALUE);
  };

  // open/close expense dialog
  const toggleExpenseDialog = () => {
    setExpenseDialogOpen((currentState) => !currentState);
    setExpenseForm(INITIAL_FORM_VALUE);
  };

  const openAddExpenseDialog = (budgetName, budgetId) => {
    setExpenseDialogOpen(true);
    setCurrentBudgetInfo({ budgetName, budgetId });
  };

  // display loading if true
  if (checkingStatus || loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Button size="large" variant="contained" onClick={toggleBudgetDialog}>
        ADD BUDGET
      </Button>
      <AddBudget
        {...budgetForm}
        budgetDialogOpen={budgetDialogOpen}
        toggleBudgetDialog={toggleBudgetDialog}
        submitBudget={submitBudget}
        handleBudgetOnChange={handleBudgetOnChange}
      />
      <BudgetList
        budgets={budgets}
        expenses={expenses}
        openAddExpenseDialog={openAddExpenseDialog}
      />

      <AddExpense
        {...expenseForm}
        {...currentBudgetInfo}
        expenseDialogOpen={expenseDialogOpen}
        toggleExpenseDialog={toggleExpenseDialog}
        handleExpenseOnChange={handleExpenseOnChange}
        submitExpense={submitExpense}
      />
    </Container>
  );
}

export default Home;
