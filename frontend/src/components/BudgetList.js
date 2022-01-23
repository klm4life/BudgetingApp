import BudgetCard from "./BudgetCard";
import KEKW from "../assets/KEKW.png";
import crycat from "../assets/crycat.jpeg";
import pan from "../assets/pan.png";
import vtuber from "../assets/vtuber.jpeg";

import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

function BudgetList({
  budgets,
  expenses,
  openAddExpenseDialog,
  removeBudget,
  viewDetails,
}) {
  const styles = {
    budgetList: {
      display: "grid",
      gap: "2em",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
    emptyBudgetList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: "5em",
    },
    emptyBudgetListText: {
      textAlign: "center",
      mb: "1em",
    },
  };

  return (
    <Box sx={{ my: "4em" }}>
      <Typography sx={{ mb: "1.5em" }} variant="h4">
        This Month's Budget List
      </Typography>
      {budgets.length > 0 ? (
        <Box sx={{ ...styles.budgetList }}>
          {budgets.map((budget) => {
            return (
              <BudgetCard
                key={budget.id}
                {...budget.data}
                id={budget.id}
                expenses={expenses}
                openAddExpenseDialog={openAddExpenseDialog}
                removeBudget={removeBudget}
                viewDetails={viewDetails}
              />
            );
          })}
        </Box>
      ) : (
        <Box sx={{ ...styles.emptyBudgetList }}>
          <Typography sx={{ ...styles.emptyBudgetListText }} variant="h4">
            Empty budget list!
          </Typography>
          <div className="images">
            <img src={KEKW} alt="kekw" width={200} height={200} />
            <img src={crycat} alt="crycat" width={200} height={200} />
            <img src={pan} alt="pan" width={200} height={200} />
            <img src={vtuber} alt="vtuber" width={200} height={200} />
          </div>
        </Box>
      )}
    </Box>
  );
}

export default BudgetList;
