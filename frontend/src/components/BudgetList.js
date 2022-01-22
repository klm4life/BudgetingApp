import KEKW from "../assets/KEKW.png";
import BudgetCard from "./BudgetCard";

import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

function BudgetList({ budgets, expenses, openAddExpenseDialog }) {
  return (
    <Box className="budget__list">
      <Typography sx={{ mb: "1em" }} className="budget__title" variant="h4">
        This Month's Budget List
      </Typography>
      {budgets.length > 1 ? (
        <Box className="budget__list-content">
          {budgets.map((budget) => {
            return (
              <BudgetCard
                key={budget.id}
                {...budget.data}
                id={budget.id}
                expenses={expenses}
                openAddExpenseDialog={openAddExpenseDialog}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "5em",
          }}
        >
          <Typography sx={{ textAlign: "center", mb: "1em" }} variant="h4">
            Empty budget list!
          </Typography>
          <img src={KEKW} alt="kekw" width={200} height={200} />
        </Box>
      )}
    </Box>
  );
}

export default BudgetList;
