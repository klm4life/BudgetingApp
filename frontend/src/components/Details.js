import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

function Details({ expenses, details, toggleDetails }) {
  return (
    <Dialog open={details} onClose={toggleDetails}>
      {/* display expenses here */}
    </Dialog>
  );
}

export default Details;
