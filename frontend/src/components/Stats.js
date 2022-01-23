import { useState, useEffect } from "react";

import TimelineIcon from "@mui/icons-material/Timeline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Box from "@mui/system/box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Stats({ budgets, expenses }) {
  const [stats, setStats] = useState({
    totalBudgets: 0,
    totalExpenses: 0,
    budgetLeft: 0,
  });
  const { totalBudgets, totalExpenses, budgetLeft } = stats;

  const styles = {
    boxContainer: {
      borderRadius: "16px",
      padding: "25px 0",
      color: "#fff",
      backgroundColor: "#1976d2",
      textAlign: "center",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      margin: "auto",
      marginBottom: "24px",
      color: "#fff",
      backgroundImage:
        "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
    },
  };

  useEffect(() => {
    const calculateStats = () => {
      // get total budget
      const totalBudgets = budgets.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.data.amount,
        0
      );

      // get total expenses
      const totalExpenses = expenses.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.data.amount,
        0
      );

      // get budget left
      const budgetLeft = totalBudgets - totalExpenses;

      setStats({ totalBudgets, totalExpenses, budgetLeft });
    };

    calculateStats();
  }, [budgets, expenses]);

  return (
    <Grid container gap={2} sx={{ mt: "2em", mb: "5em" }}>
      <Grid item xs={12} sm={4} sx={{ ...styles.boxContainer }}>
        <Box sx={{ ...styles.iconContainer }}>
          <TimelineIcon fontSize="large" />
        </Box>
        <Typography variant="h3">${totalBudgets}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Total Budget
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ ...styles.boxContainer }}>
        <Box sx={{ ...styles.iconContainer }}>
          <MoneyOffIcon fontSize="large" />
        </Box>
        <Typography variant="h3">${totalExpenses}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Total Expenses
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ ...styles.boxContainer }}>
        <Box sx={{ ...styles.iconContainer }}>
          <AttachMoneyIcon fontSize="large" />
        </Box>
        <Typography variant="h3">${budgetLeft}</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Budget Left
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Stats;
