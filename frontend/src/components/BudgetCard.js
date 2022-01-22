import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/system/Box";

function BudgetCard({
  amount,
  name,
  id,
  expenses,
  openAddExpenseDialog,
  removeBudget,
  viewDetails,
}) {
  const [expensesAmount, setExpensesAmount] = useState(0);

  const styles = {
    cardContainer: {
      borderRadius: "16px",
      transform: "rotate(-2deg)",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      transition: "all 150ms ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
    },
    cardTitle: {
      marginBottom: "1.5em",
      fontSize: "1rem",
      fontWeight: "500",
    },
    cardTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    linearProgress: {
      height: "17px",
      borderRadius: "20px",
      backgroundColor: expensesAmount >= amount ? "#d32f2f" : "",
    },
  };

  useEffect(() => {
    const calculateExpensesAmount = () => {
      // get total amount of each budget based on its expenses
      const totalAmount = expenses
        .filter((expense) => expense.data.budgetRef === id)
        .reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.data.amount,
          0
        );

      setExpensesAmount(totalAmount);
    };

    calculateExpensesAmount();
  }, [expenses, id]);

  // to format the linear progress
  const normalise = (value, MAX) => ((value - 0) * 100) / (MAX - 0);

  return (
    <Card sx={{ ...styles.cardContainer }}>
      <CardContent>
        <Box sx={{ ...styles.cardTop }}>
          <Typography sx={{ ...styles.cardTitle }} variant="h5">
            {name.toUpperCase()}
          </Typography>
          <Typography>
            ${expensesAmount} / ${amount}
          </Typography>
        </Box>
        <LinearProgress
          sx={{
            ...styles.linearProgress,
          }}
          variant="determinate"
          color={`${expensesAmount >= amount ? "error" : "primary"}`}
          value={normalise(expensesAmount, amount)}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => openAddExpenseDialog(name, id)}>
          Add Expense
        </Button>
        <Button size="small" onClick={() => removeBudget(id)}>
          Remove
        </Button>
        <Button size="small" onClick={() => viewDetails(name, id)}>
          {/* need to implement viewDetails method */}
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default BudgetCard;
