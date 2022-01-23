import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

function Details({ details, toggleDetails, filteredExpenses }) {

  return (
    <Dialog open={details} onClose={toggleDetails} >
      {/* display expenses here */}

      {filteredExpenses.map(expense => {
        return (
          <div key={expense.id} className="info" style={{display: 'flex'}} >
          <h1>{expense.data.name}</h1>
          <h1>{expense.data.amount}</h1>
          </div>
        )
      })}
    </Dialog>
  );
}

export default Details;
