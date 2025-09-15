// import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <div className="loadingComponent">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      loading...
    </div>
  );
}

export default Loading;
