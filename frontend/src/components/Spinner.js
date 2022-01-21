import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
}

export default Spinner;
