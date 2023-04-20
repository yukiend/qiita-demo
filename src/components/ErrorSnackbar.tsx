//MUIのSnackbarを使ってエラーを表示するコンポーネント

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export const ErrorSnackbar: React.FC<FallbackProps> = ({ error }) => {
  return (
    <Snackbar
      open
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {String(error)}
      </Alert>
    </Snackbar>
  );
};
