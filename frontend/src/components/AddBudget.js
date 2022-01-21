import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

function AddBudget({
  name,
  amount,
  budgetDialogOpen,
  toggleBudgetDialog,
  submitBudget,
  handleOnChange,
}) {
  return (
    <Dialog open={budgetDialogOpen} onClose={toggleBudgetDialog}>
      <form onSubmit={submitBudget}>
        <DialogTitle>Add New Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add your budget information, please enter the name and amount
            below. (e.g. rent, groceries, savings, etc.)
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleBudgetDialog}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddBudget;
