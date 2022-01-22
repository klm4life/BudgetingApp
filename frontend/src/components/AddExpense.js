import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

function AddExpense({
  name,
  amount,
  budgetName,
  expenseDialogOpen,
  toggleExpenseDialog,
  handleExpenseOnChange,
  submitExpense,
}) {
  return (
    <Dialog open={expenseDialogOpen} onClose={toggleExpenseDialog}>
      <form onSubmit={submitExpense}>
        <header className="expense-dialog__header">
          <DialogTitle sx={{ fontSize: "1.7rem" }}>
            {budgetName.toUpperCase()}
          </DialogTitle>
        </header>
        <DialogContent>
          <DialogContentText>
            Please add your expense for the budget below. The expenses comprise
            of specific items under the associated budget.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            required
            value={name}
            onChange={handleExpenseOnChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            margin="dense"
            id="amount"
            label="Amount ($)"
            type="number"
            fullWidth
            variant="standard"
            required
            value={amount}
            onChange={handleExpenseOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleExpenseDialog}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddExpense;
