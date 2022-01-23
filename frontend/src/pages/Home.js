import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import AddBudget from "../components/AddBudget";
import Spinner from "../components/Spinner";
import BudgetList from "../components/BudgetList";
import AddExpense from "../components/AddExpense";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Details from "../components/Details";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const INITIAL_FORM_VALUE = { name: "", amount: "" };

function Home() {
  const [budgetForm, setBudgetForm] = useState(INITIAL_FORM_VALUE);
  const [expenseForm, setExpenseForm] = useState(INITIAL_FORM_VALUE);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(false);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
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
        amount: parseInt(budgetForm.amount),
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

      toast.success("New expense has successfully been added!");
    } catch (error) {
      toast.error("Failed to add new expense");
    }
  };

  const removeBudget = async (budgetId) => {
    const batch = writeBatch(db);

    setLoading(true);
    try {
      // query to get all expenses associated with the clicked budget
      const q = query(
        collection(db, "expenses"),
        where("budgetRef", "==", budgetId)
      );

      const querySnapshot = await getDocs(q);
      // delete all expenses related to clicked budget
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      batch.commit();

      // delete budget from firestore
      await deleteDoc(doc(db, "budgets", budgetId));

      setBudgets((currentState) => {
        const updatedBudgets = currentState.filter(
          (budget) => budget.id !== budgetId
        );

        return updatedBudgets;
      });

      setExpenses(currentState => {
        const updatedExpenses = currentState.filter(expense => expense.data.budgetRef !== budgetId)

        return updatedExpenses
      })

      setLoading(false);

      toast.success("Budget has successfully been deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete budget!");
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

  const toggleDetails = () => {
    setDetails((currentState) => !currentState);
  };

  const viewDetails = (budgetName, budgetId) => {
    // show in new modal
    // show all expenses
    // all expenses have name and amount
    // iterate through each item in expenses array and then display each item's name and amount
    setDetails(true);
    //filter based on budgetID and then map to display the remaining items in expenses array

    // 1. filter
    // 2. store it inside filteredExpenses (useState)
    const filtered = expenses.filter(item => item.data.budgetRef === budgetId);

    setFilteredExpenses(filtered);
    setCurrentBudgetInfo({budgetName, budgetId})
  };

  const removeExpense = async (expenseId) => {
    // remove from expense array
    // remove from firestore
    try {
      await deleteDoc(doc(db, "expenses", expenseId)); //delete specific expense
      const remainingItems = expenses.filter(item => item.id !== expenseId);
      setExpenses(remainingItems);

      setFilteredExpenses(currentState => {
        const filteredItems = currentState.filter(expense => expense.id !== expenseId)

        return filteredItems
      })

      toast.success('Expense has successfully been deleted!');
    } catch(e) {
      toast.error('Could not delete the specified expense!')
    }
  }

  // display loading if true
  if (checkingStatus || loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Stats budgets={budgets} expenses={expenses} />
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
          removeBudget={removeBudget}
          viewDetails={viewDetails}
        />

        <AddExpense
          {...expenseForm}
          {...currentBudgetInfo}
          expenseDialogOpen={expenseDialogOpen}
          toggleExpenseDialog={toggleExpenseDialog}
          handleExpenseOnChange={handleExpenseOnChange}
          submitExpense={submitExpense}
        />
        <Details filteredExpenses={filteredExpenses} details={details} toggleDetails={toggleDetails} 
        currentBudgetInfo={currentBudgetInfo} removeExpense={removeExpense}/>
      </Container>      
    </>
  );
}

export default Home;
