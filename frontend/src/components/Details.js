import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

function Details({ details, toggleDetails, filteredExpenses, currentBudgetInfo, removeExpense }) {
  const {budgetName} = currentBudgetInfo

  return (
    <Dialog sx={{  mx: 'auto'}} open={details} onClose={toggleDetails} fullWidth={true} >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow >
            <TableCell sx={{ color: "#fff" }} align='center' colSpan={3}>Current Spending for {budgetName}
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Expense Name</TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                Amount
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow
                key={expense.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {expense.data.name.toUpperCase()}
                </TableCell>
                <TableCell align="right">${expense.data.amount}</TableCell>
                <TableCell align="right">
                  <Fab size="small" color="primary" aria-label="add" onClick={() => 
                    removeExpense(expense.id)}>
                    <CloseIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default Details;
