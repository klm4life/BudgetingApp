import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";

function BudgetCard({ amount, name, id, expenses, openAddExpenseDialog }) {
  const [expensesAmount, setExpensesAmount] = useState(0);

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
    <>
      <Card>
        <CardContent>
          <div className="budget-card__top">
            <Typography
              sx={{ marginBottom: "0.7em" }}
              variant="h5"
              component="div"
            >
              {name.toUpperCase()}
            </Typography>
            <Typography>
              ${expensesAmount} / ${amount}
            </Typography>
          </div>
          <LinearProgress
            sx={{ height: "15px", borderRadius: "20px" }}
            variant="determinate"
            color={`${expensesAmount >= amount ? "error" : "primary"}`}
            value={normalise(expensesAmount, amount)}
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => openAddExpenseDialog(name, id)}>
            Add Expense
          </Button>
          <Button size="small">Remove</Button>
          <Button size="small">View Details</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default BudgetCard;
